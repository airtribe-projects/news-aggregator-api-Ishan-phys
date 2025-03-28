const UserNews = require('../model/newsModel');
const { fetchNews } = require('../service/newsService');
const NodeCache = require('node-cache');
const newsCache = new NodeCache({ stdTTL: 3600 }); // 1 hour TTL

const getNews = async function (req, res) {
    try {
        // Fetch the user
        const user = req.user;

        // use preferences + date + user email as as part of cache key
        const preferences = user.preferences.sort().join(','); 
        const today = new Date().toISOString().split('T')[0];
        const cacheKey = `news:${user._id}:${preferences}:${today}`;

        // Check cache
        const cachedNews = newsCache.get(cacheKey);
        if (cachedNews) {
            return res.status(200).send({ news: cachedNews });
        }

        // If the cache is not there then fetch from db
        const formatDate = (date) => date.toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(new Date().getDate() - 1);

        const newsByPreference = preferences.split(',').map((preference) => {
            return fetchNews(process.env.NEWS_URI, {
                q: preference,
                from: formatDate(yesterday),
                to: today,
                sortBy: 'popularity',
                apiKey: process.env.NEWS_API_KEY
            });
        });

        let news = await Promise.all(newsByPreference);
        news = news.map(item => item.articles).flat();

        // Cache it
        newsCache.set(cacheKey, news);

        return res.status(200).send({ news });
    } catch (err) {
        console.log(`Error occured in fetching the news. Error e: ${err}`);
        return res.status(400).send({message: "Error occured in fetching the news"});
    }
}

const saveRead = async function (req, res) {
    // Save the read article to db
    try {
        const user = req.user;
        const articleId = req.params.id;
        const article = req.body.article;

        if (!article || !article.url) {
            return res.status(400).send({ message: 'Article data with valid URL is required.' });
        }
        
        // Save or update the article as read
        const saved = await UserNews.findOneAndUpdate(
            { userId: user._id, articleId: articleId },
            { $set: { article, read: true } },
            { upsert: true, new: true }
        );
        console.log(`User marked the article as read`);

        // Delete the cache for read news
        const cacheKey = `news:read:${user._id}`;
        newsCache.del(cacheKey);
    
        return res.status(200).send({ message: 'Marked as read', data: saved });
    } catch (err) {
        console.log(`Error occured in fetching the news. Error e: ${err}`);
        return res.status(400).send({message: "Error occured in saving the read"});
    }
}

const saveFavourite = async function (req, res) {
    try {
        const user = req.user;
        const articleId = req.params.id;
        const article = req.body.article;

        if (!article || !article.url) {
            return res.status(400).send({ message: 'Article data with valid URL is required.' });
        }
        
        // Save or update the article as read
        const saved = await UserNews.findOneAndUpdate(
            { userId: user._id, articleId: articleId },
            { $set: { article, read: true, favourite: true } },
            { upsert: true, new: true }
        );
        console.log(`User marked the article as favourite`);

        // Delete the cache for favourite news
        const cacheKey = `news:favourite:${user._id}`;
        newsCache.del(cacheKey);

        return res.status(200).send({ message: 'Marked as favourite', data: saved });
    } catch (err) {
        console.log(`Error occured in fetching the news. Error e: ${err}`);
        return res.status(400).send({message: "Error occured in saving the favourite"});
    }
}

const getReadNews = async function (req, res) {
    try {
        const user = req.user;

        // Cache key for the read news
        const cacheKey = `news:read:${user._id}`;

        // Check cache
        const cachedNews = newsCache.get(cacheKey);
        if (cachedNews) {
            console.log(`Fetching read news from cache.`);
            return res.status(200).send({ news: cachedNews });
        }

        const news = await UserNews.find({
            userId: user._id,
            read: true
        });

        // Cache the read news for the user
        const plainNews = news.map(doc => doc.toObject());
        newsCache.set(cacheKey, plainNews);

        return res.status(200).send({ news });
    } catch (err) {
        console.log(`Error occured in fetching the read news. Error e: ${err}`);
        return res.status(400).send({message: "Error occured in fetching the read news"});
    }
}

const getFavouriteNews = async function (req, res) {
    try {
        const user = req.user;

        // Cache key for the read news
        const cacheKey = `news:favourite:${user._id}`;

        // Check cache
        const cachedNews = newsCache.get(cacheKey);
        if (cachedNews) {
            console.log(`Fetching favourite news from cache.`);
            return res.status(200).send({ news: cachedNews });
        }

        const news = await UserNews.find({
            userId: user._id,
            favourite: true
        });

        // Cache the read news for the user
        const plainNews = news.map(doc => doc.toObject());
        newsCache.set(cacheKey, plainNews);

        return res.status(200).send({ news });
    } catch (err) {
        console.log(`Error occured in fetching the news. Error e: ${err}`);
        return res.status(400).send({message: "Error occured in fetching the favourite news"});
    }
}

module.exports = { getNews, saveRead, saveFavourite, getReadNews, getFavouriteNews }
const axios = require('axios');


const fetchNews = async function (uri, params) {
    try {
        const response = await axios.get(uri, {
            params: params
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching preferences:', error.response?.data || error.message);
    }
};

module.exports = { fetchNews }
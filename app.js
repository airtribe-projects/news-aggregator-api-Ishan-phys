const express = require('express');
<<<<<<< HEAD
const app = express();
const port = 3000;
=======
const userRouter = require('./routes/userRoutes');
const newsRouter = require('./routes/newsRoutes');

const app = express();
>>>>>>> master

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;
=======
app.use('/users', userRouter);
app.use('/news', newsRouter);

module.exports = app;
>>>>>>> master

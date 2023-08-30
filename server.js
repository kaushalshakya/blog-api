const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const { 
    registerRoute, 
    loginRoute, 
    postRoutes,
    logoutRoute,
    profileRoutes,
    homeRoute
} = require('./routes');
const app = express();

const cookieParser = require('cookie-parser');
const verifyJwt = require('./middlewares/verifyJwt');

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json(
        {
            status: 200,
            message: 'Blog app'
        }
    )
})

app.use('/api/v1/register', registerRoute);
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/home', homeRoute);

app.use(verifyJwt);

app.use('/api/v1/logout', logoutRoute);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/profile', profileRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:` + PORT);
})
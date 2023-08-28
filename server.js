const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const { 
    registerRoute, 
    loginRoute 
} = require('./routes');
const app = express();

const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

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
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:` + PORT);
})
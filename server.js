const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const { registerRouter } = require('./routes');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json(
        {
            status: 200,
            message: 'Blog app'
        }
    )
})

app.use('/api/v1/register', registerRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:` + PORT);
})
const QueryBuilder = require('node-querybuilder');

const settings = {
    host: 'localhost',
    database: 'blogs_grafi',
    user: 'root',
    password: ''
}

const pool = new QueryBuilder(settings, 'mysql', 'pool');

module.exports = pool;

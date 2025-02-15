module.exports = {
    mysql: {
        host: process.env.MYSQL_HOST || 'mysql',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'test_db'
    },
    memcached: {
        host: process.env.MEMCACHED_HOST || 'memcached',
        port: process.env.MEMCACHED_PORT || 11211
    }
};
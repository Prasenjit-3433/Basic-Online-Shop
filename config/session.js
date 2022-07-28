const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
    const MongoDbStore = mongoDbStore(session);

    const store = new MongoDbStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return store;
}

function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        session: {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        }
    };
}

module.exports = createSessionConfig;
const redis = require('redis');
const config = require('./configure')();

const client = redis.createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.connect();

module.exports = {
  client,
  flushdb: async () => await client.flushDb(),
  quit: async () => await client.quit(),
  ping: async () => await client.ping(),
  hSet: async (key, data) => {
    const flatData = Object.entries(data).flat();
    return await client.hSet(key, flatData);
}
};

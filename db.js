const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://n:zQEbl37LxcP9AdM8LZYUa9kQr33M0W1Z@dpg-d0nfeb1r0fns738vq2c0-a/nn_kkxr',
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;

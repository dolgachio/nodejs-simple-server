const { PORT } = require('./common/config');
const app = require('./app');
const initDB = require('./utils/db/init.db');

initDB().then(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

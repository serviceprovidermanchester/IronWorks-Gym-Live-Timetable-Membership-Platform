import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'dev-secret-payload-key',
    express: app,
    onInit: async () => {
      payload.logger.info(`IronWorks CMS Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.listen(PORT, async () => {
    payload.logger.info(`Payload CMS server listening on port ${PORT}`);
  });
};

start();

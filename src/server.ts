import { app } from "./app";
import mongoose from 'mongoose';
import { config } from "./config";

const startApp = () => {
  app.listen(config.port, () => console.log(`listening at http://localhost:${config.port}`));
}

mongoose.connect(config.mongoDBConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('mongoDB connection success!');
    startApp();
  })
  .catch(err => {
    console.log(`something went wrong, error: ${err}`);
  });
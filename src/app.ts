import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../build/swagger.json';
import { RegisterRoutes } from '../build/routes.js';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// #we call the generated swagger documentation
// #We start swaggerUi express server and setup the documentation   
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
RegisterRoutes(app);
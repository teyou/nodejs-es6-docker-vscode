import express from 'express';
import bodyParser from 'body-parser';
import logger from '~/utils/logger';

import routes from './routes';

const port = process.env.PORT || 3000;
let app = express();

//MIDDLEWARE
app.use(bodyParser.json()); // for parsing application/json

//ROUTING
app.use('/', routes);

app.listen(port, function() {
  logger.info(`TeYoU Tempalte starts listening on port ${port}!`);
});

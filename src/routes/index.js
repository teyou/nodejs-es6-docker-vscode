/**
 * Main Entry routes
 */
import express from 'express';
import logger from '~/utils/logger';

let router = express.Router();

router.get('/', (req, res) => {
  logger.info(`log from path: ${req.path}`);
  res.send('Hello from TeYoU Template!');
});

export default router;

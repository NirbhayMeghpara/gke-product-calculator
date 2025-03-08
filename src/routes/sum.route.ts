import express from 'express';
import { calculateSum } from '../controllers/sum.controller';

const sumRouter = express.Router();

sumRouter.post('/calculate-sum', calculateSum);

export default sumRouter;

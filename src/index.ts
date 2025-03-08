import express from 'express'
import bodyParser from 'body-parser';
import sumRoute from './routes/sum.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(sumRoute);


app.listen(PORT, () => console.log(`Container 2 listening on port ${PORT}!`))
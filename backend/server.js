import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/main.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.set('port', PORT);
app.use(express.json()); // use json form

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.listen(app.get('port'), ()=>{
    console.log("Backend running on port ", PORT);
});

app.use('/', routes);


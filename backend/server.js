const express = require('express');
const app = express();
const routes = require('./routes/main');

const PORT = process.env.PORT || 5000;

app.set('port', PORT);
app.use(express.json()); // use json form


app.listen(app.get('port'), ()=>{
    console.log("Backend running on port ", PORT);
});

app.use('/', routes);


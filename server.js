const express =  require('express');
const config = require('config');
const cors = require('cors')

const bookRoutes = require('./routes/bookroute');

const app = express();
app.use(cors('*'));
app.use(express.json());

app.use('/book',bookRoutes)

const portNo = config.get("PORT");
app.listen(portNo,()=>{console.log("Server Started at " + portNo)})
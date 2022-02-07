const express =require ('express');
const app =express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =require('dotenv');

//middlewares
app.use(cors());
app.use(bodyParser.json());

//import routes
const fundRoute = require('./routes/fund');
const incomeRoute = require('./routes/income');
const outcomeRoute = require('./routes/outcome');
const buddyRoute =require('./routes/buddy');
const postRoute = require('./routes/posts');
const authRoute = require ('./routes/auth');

dotenv.config();

//connect
mongoose.connect(process.env.DataBaseUrl,
    {useNewUrlParser:true},
    () => console.log('connected to database')
    );

//middleware
app.use(express.json());

app.get('/',(req,res) =>
{
    res.send('welcome to db');
});

//middleware - routes
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/user/buddy',buddyRoute);
app.use('/api/user/fund',fundRoute);
app.use('/api/user/income',incomeRoute);
app.use('/api/user/outcome',outcomeRoute);

 

app.listen(3000, () => console.log ('server up and running'));

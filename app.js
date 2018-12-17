const express=require('express');
const bodyparser=require('body-parser');




const app=express();


app.use(bodyparser.json());

const route=require('./route');


app.use('/',route)


app.listen(1993);

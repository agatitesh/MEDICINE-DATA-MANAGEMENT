const mysql=require('mysql2');

const pool=mysql.createPool({
    'host':'localhost',
    'database':'projectdb',
    'user':'root',
    'password':'1234'
});


module.exports=pool.promise();


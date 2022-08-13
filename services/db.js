var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'remotemysql.com',
  user: 'dXjq4VkJVU',
  password:'QxXq74efsM',
  database:'dXjq4VkJVU',
  port: 3306
});

let db = {};

pool.getConnection(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  

module.exports = db;
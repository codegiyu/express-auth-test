var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'dXjq4VkJVU',
  password:'QxXq74efsM',
  database:'dXjq4VkJVU'
});
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
module.exports = connection;
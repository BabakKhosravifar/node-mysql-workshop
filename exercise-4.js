var mysql = require('mysql');
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});


var table = new Table({
    head: ['id', 'email', 'password', 'createdAt', 'modifiedAt']
});

function returnString(input){
    if (typeof(input)=== "string") return input;
    else if (typeof(input)==="number") return input;
    else return ("Null");
}


connection.query("SELECT Account.id, Account.email, AddressBook.name FROM Account join AddressBook on AddressBook.accountId = Account.id", function(err, rows, fields) {


  var flag = [];
  for (var i=0; i<rows.length;i++){
      for (var j=i+1; j<rows.length; j++){
          if(rows[i].id===rows[j].id){
              flag[j] = 1;
              rows[i].name +=  "\n    "+rows[j].name;
          }
          
      }
      if(flag[i]!==1){
          console.log("#".bold.yellow+colors.bold.yellow(rows[i].id)+": "+ rows[i].email+"\n    "+rows[i].name);
              
          }
  }
});
connection.end();



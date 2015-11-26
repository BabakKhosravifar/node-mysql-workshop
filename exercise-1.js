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
    head: ['id', 'email', 'password', 'createdOn', 'modifiedOn']
});

connection.query("SELECT * FROM Account", function(err, rows, fields) {
  // In this callback, rows will be all the rows of the query, in a regular array of regular objects
  // fields is not used very often, but it will contain a listing of the columns with some metadata
  // Here is an example usage:
  // instantiate 

  
  rows.forEach(function(row) {
 
// table is an Array, so you can `push`, `unshift`, `splice` and friends 
table.push(
    [colors.bold.yellow(row.id), colors.strikethrough(row.email), colors.green(row.password), row.createdOn, row.modifiedOn]
);
 

  });
  // This code will output lines like:
  // #1: john@smith.com
  // #2: abc@def.com
  // #5: xx@yy.com
  console.log(table.toString());
  // Note that IDs do not have to be contiguous. If we DELETE rows, there will be holes in the ID list. This is normal.
});
connection.end();



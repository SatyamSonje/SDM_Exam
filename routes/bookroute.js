const express =  require('express');
const config = require('config');

const appForbook = express.Router();
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host     : config.get("host"),
    user     :  config.get("user"),
    password :  config.get("password"),
    database :  config.get("database")
   });

appForbook.get("/", (request, response)=>{
    connection.query("select * from Book_Tb", (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})

appForbook.post("/", (request, response)=>{
    var query = 
    `insert into Book_Tb values(${request.body.id}, '${request.body.b_name}','${request.body.author}','${request.body.book_type}','${request.body.price}','${request.body.publishedDate}','${request.body.language}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

appForbook.put("/:id", (request, response)=>{
    var query = 
    `update Book_Tb set b_name = '${request.body.b_name}',
                    author = '${request.body.author}',
                    book_type = '${request.body.book_type}',
                    price = '${request.body.price}',
                    publishedDate = '${request.body.publishedDate}',
                    language = '${request.body.language}' where id = ${request.params.id}`;

    connection.query(query, (error, result)=>{
        if(error==null)
            {
                var data = JSON.stringify(result) 
                response.setHeader("Content-Type","application/json");
                response.write(data);
            } 
            else
            {
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.write(error)
            }
            response.end();
    })
})

module.exports = appForbook;
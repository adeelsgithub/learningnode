//creating server

let fs = require("fs");
let http = require("http");
let port = 8080;
let url = require("url");

let server = http.createServer(handle);

server.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

//api data

let data = fs.readFileSync(`${__dirname}/data/data.json`,"utf-8");
let dataObject = JSON.parse(data);
let overview = fs.readFileSync(`${__dirname}/overview-template.html`,"utf-8");
let cards = fs.readFileSync(`${__dirname}/cards-template.html`,"utf-8");
let productTemplate = fs.readFileSync(`${__dirname}/product.html`,"utf-8");


function handle(req,res){
    let {query , pathname} = url.parse(req.url,true);

    //Overview page
    if(pathname === "/" || pathname === "/overview"){
        res.writeHead(200,{
            "Content-Type" : "text/html"
           });
        let cardsHTML = dataObject.map((element)=> replaceHTML(cards,element)).join("");
        overview = overview.replace(/{%CARDS%}/g,cardsHTML);  
        res.end(overview);
    }

    //Product page
    else if(pathname === "/products"){
        res.writeHead(200,{
            "Content-Type" : "text/html"
        });

        let product = dataObject[query.id];
        let output = replaceHTML(productTemplate,product);

        res.end(output);
    }

    //API
    else if(pathname === "/api"){
       res.writeHead(200,{
        "Content-Type" : "application/json"
       });
       res.end(data);
    }

    //404 page
    else{
        res.writeHead(404,{
            "Content-type" : "text/html"
        });
        res.end("<h1>PAGE NOT FOUND</h1>");
    }

}


function replaceHTML(temp , el){
    let output = temp.replace(/{%IMAGE%}/g,el.image);
    output = output.replace(/{%NAME%}/g,el.productName);
    output = output.replace(/{%QUANTITY%}/g,el.quantity);
    output = output.replace(/{%PRICE%}/g,el.price);
    output = output.replace(/{%ID%}/g,el.id);
    output = output.replace(/{%DESCRIPTION%}/g,el.description);
    return output;
}













/*
fs.readFile("./data/data.json",(error,content)=>{
    if(error){
        console.log("ERROR!!!")
    }else{
        res.writeHead(200,{
            "Content-Type" : "application/json"
        })
        res.end(content);
    }
});
*/
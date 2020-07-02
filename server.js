//creating server

let fs = require("fs");
let http = require("http");
let port = 8080;

let server = http.createServer(handle);

server.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

//api data

let data = fs.readFileSync(`${__dirname}/data/data.json`,"utf-8");


function handle(req,res){
    let pathName = req.url;

    if(pathName === "/" || pathName === "/overview"){
        res.end("OVERVIEW PAGES");
    }
    else if(pathName === "/products"){
        res.end("PRODUCTS PAGES");
    }
    else if(pathName === "/api"){
       res.writeHead(200,{
        "Content-Type" : "application/json"
       });
       res.end(data);
    }
    else{
        res.writeHead(404,{
            "Content-type" : "text/html"
        });
        res.end("<h1>PAGE NOT FOUND</h1>");
    }

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
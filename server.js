//creating server

let fs = require("fs");
let http = require("http");
let port = 8080;

let server = http.createServer(handle);

server.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

function handle(req,res){
    res.end("HELLO WORLD");
}
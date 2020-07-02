/*
let fs = require("fs");
let path = require("path");
let args = require("minimist")(process.argv.slice(2));
console.log(args);
let readText = fs.readFileSync(path.resolve(args.file));

//process.stdout.write(readText);

*/

//async File read
/*
let path = require("path");
let fs = require("fs");
let args = require("minimist")(process.argv.slice(2));

let filePath = path.resolve(args.file);
asyncFileRead(filePath);

function asyncFileRead(filepath){
    fs.readFile(filePath,(error,content)=>{
        if(error){
            console.log(error);
        }
        else{
            content = content.toString().toUpperCase();
            process.stdout.write(content);
        }
    });
}
*/

// read and write with streams 

let fs = require("fs");
let path = require("path");
let args = require("minimist")(process.argv.slice(2));
let Transform = require("stream").Transform;


let filePath = path.resolve(args.file);
let outputFile = path.resolve("./textFiles/output.txt");
let readableStream = fs.createReadStream(filePath);
writeInFile(readableStream);

function writeInFile(readable){
    let readableStream = readable;

    let transformStream = new Transform({
        transform(chunk,enc,nextChunk){
            this.push(chunk.toString().toUpperCase());
            nextChunk();
        }
    });

    readableStream = readableStream.pipe(transformStream);

    let writableStream = fs.createWriteStream(outputFile);

    readableStream.pipe(writableStream);
}
































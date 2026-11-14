import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";
import routeHandler from "./routes/route";
import config from "./config";

const server:Server = createServer((req: IncomingMessage,res: ServerResponse)=>{
    // console.log("request: ",req)
    // console.log("response: ",res)
    //! nicer kj gula sob akhon optimize way te korbo. 
    // const url = req.url;
    // const method = req.method;
    // // console.log(url,method)
    // if(url === "/" && method ==="GET"){
    //     // console.log("this is root route!")
    //     //todo: text/plain text
    //     // res.writeHead(200,{"content-type":"text/plain"});
    //     // res.end("This is root route")
    //     //todo: json formate
    //     res.writeHead(200,{"content-type":"application/json"})
    //     res.end(JSON.stringify({message:"This is root route"}))
    // }else if(url?.startsWith("/products")){
    //     res.writeHead(200,{'content-type':'application/json'})
    //     res.end(JSON.stringify({message:"This is products route"}))
    // }
    // else{
    //     // console.log("this route is not defined")
    //     //todo: text/plain text
    //     // res.writeHead(404,{"content-type":"text/plain"})
    //     // res.end("This route is not defined")
    //     //todo: json formate
    //     res.writeHead(404,{"content-type":"application/json"})
    //     res.end(JSON.stringify({message:"This route is not defined"}))
    // }

    routeHandler(req,res)
})

server.listen(config.port,()=>{
    console.log(`Server running is port ${config.port}`)
})
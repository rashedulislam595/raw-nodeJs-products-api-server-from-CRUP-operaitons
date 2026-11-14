import type { IncomingMessage, ServerResponse } from "http";
import productsController from "../controllers/products.controller";

const routeHandler =(req:IncomingMessage,res:ServerResponse)=>{
    const url = req.url;
    const method = req.method;

    if(url === "/" && method === "GET"){
        res.writeHead(200,{"content-type":"application/json"});
        res.end(JSON.stringify({Message: "This is root route!!"}))
    }else if(url?.startsWith("/products")){
        productsController(req,res)
    }
    else{
        res.writeHead(404,{"content-type":"application/json"});
        res.end(JSON.stringify({Message:"This route is not defined!"}))
    }
}

export default routeHandler;
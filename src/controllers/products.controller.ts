import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from '../services/products.service';
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const productsController = async (req: IncomingMessage, res: ServerResponse) => {
    // res.writeHead(200,{"content-type":"application/json"});
    // res.end(JSON.stringify({Message:"This is products route is coming soon!!"}))
    //todo: aro optimize and secure --
    const url = req.url;
    const method = req.method;
    // single products get korar jonno.
    const urlParams = url?.split('/');
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

    //todo: get all products
    if (url === '/products' && method === "GET") {
        const products = productService()

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            Message: "Products Retrieve Successfully!!",
            data: products
        }))
    } else if (method === "GET" && id !== null) { //todo: get single product
        const products = productService();
        const product = products.find((p: IProduct) => {
            return p.id === id
        }
        )
        if (!product) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ Message: "Products is not found!!" }))
        }
        // console.log(product)

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ Message: "Products Retrieve Successfully!!", data: product }))
    } else if (method === "POST" && url === "/products") {
        //todo: create product
        const body = await bodyParser(req)
        // console.log(body)
        const newProduct = {
            id: Date.now(),
            ...body
        }
        //* ager product gulo jani delete hoye nah jay .. 
        const products = productService();
        products.push(newProduct)

        createProduct(products)

        res.writeHead(201, { "content-type": "application/json" })
        res.end(JSON.stringify({ Message: "Product Created successful!!" }))
    } else if (method === "PUT" && id !== null) {
        //todo: product update
        const body = await bodyParser(req);
        const products = productService();

        //? products array theke j product update korbo tar index ta khuje ber korbo
        const index = products.findIndex((p: IProduct) => {
            return p.id === id
        })
        // console.log(index)
        if (index < 0) {
            try {
            sendResponse(res,true,404,"Product Not Found!!")
        } catch (error) {
            sendResponse(res,false,500,"Internal server error!")
        }
        }
        // console.log(products[index])
        products[index] = {
            id: products[index].id,
            ...body
        }
        createProduct(products)

        // res.writeHead(200, { "content-type": "application/json" });
        // res.end(JSON.stringify({
        //     Message: "Product Updated Successful!!",
        //     data: products[index]
        // }))
        try {
            sendResponse(res,true,200,"Product Updated Successful!!",products[index])
        } catch (error) {
            sendResponse(res,false,500,"Internal server error!")
        }
    } else if (method === "DELETE" && id !== null) {
        //todo: product delete
        const products = productService();
        const index = products.findIndex((p: IProduct) => {
            return p.id == id;
        })
        if (index < 0) {
            // res.writeHead(404,{"content-type":"application/json"});
            // res.end(JSON.stringify({Message:"Product Not Found!!"}))
            try {
                sendResponse(res, true, 200, "Product deleted successful!!")
            } catch (error) {
                sendResponse(res, false, 500, "Internal server error!")
            }

        }
        //? delete product handle by js splice--> aikhaen first koto index theke start hobe and koyta index delte hobe seita dite hoy.
        products.splice(index, 1);
        //* products reassigned by database
        createProduct(products)

        //! res.writeHead(200,{"content-type":"application/json"});
        // res.end(JSON.stringify({Message:"Product deleted successful!!"}))
        try {
            sendResponse(res, true, 200, "Product deleted successful!!")
        } catch (error) {
            sendResponse(res, false, 500, "Internal server error!")
        }
    }
}

export default productsController;
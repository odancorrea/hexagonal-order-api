import { Express } from "express-serve-static-core";
import iDrivenAdapter from "../iDrivenAdapter";
import express from "express"
import application from "../controller/applicationController";
import clientController from "../controller/clientController";
import productController from "../controller/productController";
import orderController from "../controller/orderController";

class Server implements iDrivenAdapter{
    app: Express
    
    constructor(private port: string) {
        this.app = express()
    }

    async init(): Promise<void> {
        this.setMiddlewares()
        this.setRoutes()
        await this.start()
    }

    setMiddlewares() {
        this.app.use(express.json())

    }

    setRoutes() {
        this.app.get('/ping', application.ping)
        this.app.post('/client', clientController.create)
        this.app.post('/client/identify', clientController.identify)
        this.app.post('/product/', productController.create)
        this.app.put('/product/:id', productController.update)
        this.app.delete('/product/:id', productController.delete)
        this.app.get('/product/findByCategory/:category', productController.findByCategory)
        this.app.get('/orders/', orderController.find)
        this.app.post('/orders/checkout/:id', orderController.checkout)
    }

    async start(): Promise<void> {
        this.app.listen(this.port, () => { console.log('Server running') })
    }
}

export default new Server(process.env.PORT || '8000')
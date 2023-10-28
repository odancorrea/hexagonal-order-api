import {Request, Response} from 'express'

class ApplicationController {
    ping(req: Request, res: Response) {
        res.send('pong');
    }
}

export default new ApplicationController()
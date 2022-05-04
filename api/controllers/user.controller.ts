import { Request, Response } from "express";
import * as userService from '../services/user.service';

class UserController {
    async create(req: Request, res: Response) {
        const user = await userService.createUser(req.body)
        return res.json(user)
    }
    async read(req: Request, res: Response) {
        const { id } = req.params
        const user = await userService.getUserById(id)
        return res.json(user)
    }
    async update(req: Request, res: Response) {
        const { id } = req.params
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params
    }
}

export { UserController }
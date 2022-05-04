import { Request, Response } from "express";
import * as userService from '../services/user.service';

class UserController {
    async create(req: Request, res: Response) {
        const user = await userService.createUser(req.body);
        return res.json(user);
    }
    async read(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        return res.json(user);
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userService.updateUser(id, req.body);
        return res.json(user);
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userService.deleteUser(id);
        return res.json(user);
    }
};

export { UserController }
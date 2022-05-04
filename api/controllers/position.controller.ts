import { Request, Response } from "express";
import * as positionService from '../services/position.service';

class PositionController {
    async create(req: Request, res: Response) {
        const position = await positionService.createPosition(req.body);
        return res.json(position);
    }
    async read(req: Request, res: Response) {
        const { id } = req.params;
        const position = await positionService.getUserPositionsById(id);
        return res.json(position);
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const position = await positionService.updatePosition(id, req.body);
        return res.json(position);
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const position = await positionService.deletePosition(id);
        return res.json(position);
    }
}

export { PositionController }

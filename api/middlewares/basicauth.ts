import { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../../.env")
})

export default (req: Request, res: Response, next: any) => {
    const username = process.env.BASICAUTH_USERNAME;
	const password = process.env.BASICAUTH_PASSWORD;
	const auth = req.headers.authorization;

    // @ts-ignore
	const credentials = Buffer.from(auth.split(' ').pop(), 'base64').toString('ascii').split(':');
	console.log('credentials', credentials);
    
    if (
		credentials[0] === username &&
		credentials[1] === password
	) {
		next();
	} else {
		return res.status(403).json({ "ut": true })
	}
}
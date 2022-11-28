import { Express, Request, Response } from 'express';
import { createUserHandler, getUserByIdHandler, deleteUserByIdHandler, createEventsHandler } from './controller/userController';

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    });
    app.post("/api/users", createUserHandler);
    app.get("/api/users/:id", getUserByIdHandler);
    app.delete("/api/users/:id", deleteUserByIdHandler);
    app.post("/api/events", createEventsHandler);
}

export default routes;
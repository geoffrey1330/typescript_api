import { Request, Response } from "express";
import { createUser, getUserById, deleteUserById, createEvents } from "../service/user.service";
import log from "../utils/logger";

export async function createUserHandler(
  req: Request,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(200).json(user);
  } catch (err: any) {
    log.error(err);
    return res.status(422).send(err.message);
  }
}

export async function getUserByIdHandler(
  req: Request,
  res: Response
): Promise<any> {
{
  try {
    const user = await getUserById(parseInt(req.params.id));
    return res.status(200).json(user);
  } catch (err: any) {
    log.error(err);
    return res.status(422).send(err.message);
  }
}
}

export async function deleteUserByIdHandler(
  req: Request,
  res: Response
): Promise<any> {
 {
  try {
    await deleteUserById(parseInt(req.params.id));
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err: any) {
    log.error(err);
    return res.status(422).send(err.message);
  }
}
}

export async function createEventsHandler(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const event = await createEvents(req.body);
    return res.status(200).json({
      message: "Event created successfully",
    });
  } catch (err: any) {
    log.error(err);
    return res.status(422).send(err.message);
  }
}

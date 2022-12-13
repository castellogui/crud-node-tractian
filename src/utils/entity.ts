import { Response } from "express";

export function handleEntityNotFoundOrNotModified(model: any, res: Response) {
  if (model.matchedCount === 0) {
    res.status(200).send({ message: "Entity not found." });
    return true;
  }

  if (model.modifiedCount === 0) {
    res.status(200).send({ message: "Nothing changed in user record." });
    return true;
  }
}

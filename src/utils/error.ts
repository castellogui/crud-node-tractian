import { Response } from "express";

export function handleError(error: Error | unknown, res: Response) {
  if (error instanceof Error) {
    res.status(500).send({
      message: "Some error has occurred while trying to create a new user.",
      errorDetail: error.message,
    });
    return;
  } else {
    res.status(500).send({
      message: "Some unknown error has occurred while trying to create a new user.",
      errorDetail: error,
    });
    return;
  }
}

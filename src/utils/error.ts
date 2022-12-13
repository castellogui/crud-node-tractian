import { Response } from "express";

export default function handleRequestError(
  error: Error | unknown,
  res: Response,
  method: String,
  model: String
) {
  if (error instanceof Error) {
    res.status(500).send({
      message: `Some error has occurred while trying to ${method} a ${model}.`,
      errorDetail: error.message,
    });
    return;
  } else {
    res.status(500).send({
      message: `Some unknown error has occurred while trying to ${method} a ${model}.`,
      errorDetail: error,
    });
    return;
  }
}

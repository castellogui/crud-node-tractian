import { Response } from "express";

export function checkEntityNotFoundOrNotModified(model: any) {
  if (model.matchedCount === 0) {
    throw Error("Entity not found.");
  }

  if (model.modifiedCount === 0) {
    throw Error("Nothing changed in record.");
  }
}

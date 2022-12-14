export function checkEntityNotFoundOrNotModified(model: any, modelId?: String) {
  if (model === null || model.matchedCount === 0) {
    throw Error(`Entity not found. Value: ${modelId}`);
  }

  if (model.modifiedCount === 0) {
    throw Error("Nothing changed in record.");
  }
}

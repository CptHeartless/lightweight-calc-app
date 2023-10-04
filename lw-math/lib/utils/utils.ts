export const keys = <TObject extends Record<string, unknown>>(
  object: TObject,
): Array<keyof TObject> => Object.keys(object);

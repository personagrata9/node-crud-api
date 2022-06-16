const checkIsObject = (dataParsed: unknown) =>
  typeof dataParsed === 'object' && !Array.isArray(dataParsed) && dataParsed !== null;

export default checkIsObject;

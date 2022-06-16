import checkAllArrElementsStrings from './checkAllArrElementsStrings';
import checkIsObject from './checkIsObject';

const validateUser = (dataParsed: unknown): boolean => {
  const isObject: boolean = checkIsObject(dataParsed);

  if (!isObject) return false;

  const dataObject = dataParsed as Record<string, unknown>;

  if (
    'username' in dataObject &&
    'age' in dataObject &&
    'hobbies' in dataObject &&
    Object.keys(dataObject).length === 3 &&
    dataObject.username &&
    typeof dataObject.username === 'string' &&
    typeof dataObject.age === 'number' &&
    Array.isArray(dataObject.hobbies) &&
    checkAllArrElementsStrings(dataObject.hobbies)
  ) {
    return true;
  }
  return false;
};

export default validateUser;

import checkAllArrElementsStrings from './checkAllArrElementsStrings';
import checkIsJSON from './checkIsJSON';

const validateNewUser = (data: string): boolean => {
  const isJSON: boolean = checkIsJSON(data);

  if (!isJSON) return false;

  const dataParsed = JSON.parse(data) as Record<string, unknown>;

  if (
    'username' in dataParsed &&
    'age' in dataParsed &&
    'hobbies' in dataParsed &&
    Object.keys(dataParsed).length === 3 &&
    dataParsed.username &&
    typeof dataParsed.username === 'string' &&
    typeof dataParsed.age === 'number' &&
    Array.isArray(dataParsed.hobbies) &&
    checkAllArrElementsStrings(dataParsed.hobbies)
  ) {
    return true;
  }
  return false;
};

export default validateNewUser;

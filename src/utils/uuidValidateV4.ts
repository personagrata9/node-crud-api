import { version as uuidVersion, validate as uuidValidate } from 'uuid';

const uuidValidateV4 = (uuid: string): boolean => uuidValidate(uuid) && uuidVersion(uuid) === 4;

export default uuidValidateV4;

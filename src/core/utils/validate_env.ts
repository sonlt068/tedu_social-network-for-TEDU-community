import { Logger } from '@core/utils';
import { cleanEnv, str } from 'envalid';
const validateEnv = () => {
 cleanEnv( process.env, {
    PORT: str(),
    MONGODB_URI: str(),
  });
}; 
export default validateEnv;
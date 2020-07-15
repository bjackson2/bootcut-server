import db from './db';
import {Context} from './types';

export default (): Context => ({
  db,
});

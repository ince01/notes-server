import dbConnection from './dbConnection';
import Users from './users/user.model';

export default dbConnection;

export const db = { Users };

export { Users };

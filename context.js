import { AuthenticationError } from 'apollo-server-errors';
import { users } from './mock.js';

const context = ({ req }) => {
  const token = req.headers.authorization || '';

  const user = users.find(user => user.id === token);

  return { user };
}

export default context;

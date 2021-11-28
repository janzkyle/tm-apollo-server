import { ForbiddenError } from 'apollo-server-errors';
import { users } from './mock.js';

const context = ({ req }) => {
  const token = req.headers.authorization || '';

  if (token === 'imjackdoetrustme') {
    return { user: users.find(user => user.name === 'Jack Doe') };
  } else if (token !== '') {
    throw new ForbiddenError('Your authorization header is invalid');
  }

  return { user: null };
}

export default context;

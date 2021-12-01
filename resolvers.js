import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import { checkins, tags, users } from './mock.js';
import { validateCheckinInput } from './utils/validation.js';

const resolvers = {
  Query: {
    checkins: () => checkins,
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id),
  },
  Mutation: {
    addCheckin: (_, { checkin }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to add a checkin');
      }

      const newCheckin = validateCheckinInput(checkin)

      if (newCheckin.err) {
        throw new UserInputError(newCheckin.err);
      }

      if (newCheckin.tag) {
        const tag = tags.find(tag => tag.channelName === `#${newCheckin.tag}`);

        if (!tag) {
          throw new UserInputError(`Tag ${newCheckin.tag} does not exist`);
        }

        newCheckin.tagId = tag.id;
      }

      newCheckin.id = Math.floor(Math.random() * 100).toString();
      newCheckin.userId = user.id;

      return newCheckin;
    }
  },
  User: {
    checkins: (parent) => checkins.filter(checkin => checkin.userId === parent.id)
  },
  Checkin: {
    user: (parent) => users.find(user => user.id === parent.userId),
    tag: (parent) => tags.find(tag => tag.id === parent.tagId)
  }
}

export default resolvers;

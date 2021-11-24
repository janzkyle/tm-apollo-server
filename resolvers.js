import { checkins, tags, users } from './mock.js';

const resolvers = {
  Query: {
    users: () => users
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

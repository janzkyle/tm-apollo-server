import { gql } from 'apollo-server';

const typeDefs = gql`
  type Checkin {
    id: ID!
    hours: Float!
    tag: Tag!
    activity: String
    user: User!
  }

  enum AccessType {
    PUBLIC
    PRIVATE
  }

  type Tag {
    id: ID!
    channelName: String!
    accessType: AccessType!
  }

  type User {
    id: ID!
    name: String!
    checkins: [Checkin]
  }

  type Query {
    checkins: [Checkin!]
    users: [User!]
    user(id: ID!): User!
  }

  type Mutation {
    addCheckin(checkin: String!): Checkin
  }
`;

export default typeDefs;

# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type User {
  id: String!
  email: String!
  type: Float!
  firstName: String!
  lastName: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime!
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

type SinginType {
  token: String!
  user: User!
}

type Query {
  signin(input: SinginInput!): SinginType!
}

input SinginInput {
  email: String!
  password: String!
}

type Mutation {
  singup(input: SingupCreateInput!): User!
}

input SingupCreateInput {
  email: String!
  password: String!
  firstName: String!
  lastName: String!
}

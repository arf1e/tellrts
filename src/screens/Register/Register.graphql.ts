import {gql} from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $name: String!
    $birthday: String!
    $password: String!
    $sex: Boolean!
    $countryCode: String
    $photo: Upload
    $cityId: String
  ) {
    createAccount(
      name: $name
      birthday: $birthday
      sex: $sex
      photo: $photo
      countryCode: $countryCode
      cityId: $cityId
      password: $password
      email: $email
    ) {
      ok
      error
      token
    }
  }
`;

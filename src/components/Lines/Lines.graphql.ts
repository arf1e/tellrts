import {gql} from '@apollo/client';

export default gql`
  query myLines {
    me {
      id
      lines {
        id
        question {
          id
          text
          category {
            id
            title
            image
          }
        }
        answer {
          id
          text
        }
      }
    }
  }
`;

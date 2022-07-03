import {gql} from '@apollo/client';

export type GetCategoriesQueryData = {
  getCategories: Category[];
};

export type Category = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export const GET_CATEGORIES_QUERY = gql`
  query GetCategoriesQuery {
    getCategories {
      id
      title
      description
      image
    }
  }
`;

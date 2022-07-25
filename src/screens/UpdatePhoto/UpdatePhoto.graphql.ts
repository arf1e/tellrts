import {gql} from '@apollo/client';

export type UpdatePhotoMutationResult = {
  updatePhoto: {
    ok: boolean;
    error?: string;
  };
};

export const UPDATE_PHOTO_MUTATION = gql`
  mutation UpdatePhotoMutation($photo: Upload!) {
    updatePhoto(photo: $photo) {
      ok
      error
    }
  }
`;

import { RouteComponentProps } from 'react-router-dom';

export type AlbumsProps = RouteComponentProps & {
  match: {
    params: {
      username: string;
      albumId: string;
    }
  };
  location: {
    state: {
      username: string;
      userId: number;
    }
  }
};

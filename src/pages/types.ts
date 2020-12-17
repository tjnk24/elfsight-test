import { RouteComponentProps } from 'react-router-dom';

export type AlbumWithPhotos = {
  id: number;
  albumId: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export type AlbumsProps = RouteComponentProps & {
  match: {
    params: {
      userId: string;
      albumId: string;
    }
  };
  location: {
    state: {
      username: string;
      userId: number;
      title: string;
      photos: AlbumWithPhotos[];
    }
  }
};

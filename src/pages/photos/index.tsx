import { AlbumsProps } from '@pages/types';
import React, { FC } from 'react';

const AlbumPhotos: FC<AlbumsProps> = ({ match }) => {
  const { username, albumId } = match.params;
  return (
    <div>
      photos page
      <br />
      {username}
      {albumId}
    </div>
  );
};

export default AlbumPhotos;

import Preloader from '@components/preloader';
import Axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { AlbumsProps } from '../types';
import { AlbumsType } from './types';

import './style.scss';

const Albums: FC<AlbumsProps> = ({ location, match }) => {
  const [albums, setAlbums] = useState<AlbumsType[]>(null);

  const mapAlbums = (albumsArray: AlbumsType[]) => albumsArray.map(
    (album: AlbumsType) => (
      <div className="album-block" key={album.id}>
        <div className="album-block__thumbnail">
          <img src={album.thumbnailUrl} alt="album thumbnail" />
          <span>{album.photosAmount}</span>
        </div>
        <div className="album-block__info">
          {album.title}
        </div>
      </div>
    ),
  );

  const parseResult = async (dataArray: []) => {
    const promiseArray: Promise<AxiosResponse>[] = [];

    const parsedDataArray: AlbumsType[] = dataArray.map((item) => {
      const { id, title } = item;

      promiseArray.push(Axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`));

      return {
        id,
        title,
      };
    });

    await Promise
      .all(promiseArray)
      .then((values) => {
        values.map((value, index) => {
          parsedDataArray[index] = {
            ...parsedDataArray[index],
            thumbnailUrl: value.data[0].thumbnailUrl,
            photosAmount: value.data.length,
          };

          return true;
        });
      });

    return parsedDataArray;
  };

  useEffect(() => {
    setAlbums(null);
    const { username } = match.params;
    const { userId } = location.state;

    if (username) {
      Axios
        .get(`https://jsonplaceholder.typicode.com/albums?&userId=${userId}`)
        .then(async (response) => {
          setAlbums(await parseResult(response.data));
        });
    }
  }, [match.params.username]);

  return (
    <>
      <h2 className="page-title">
        {location.state.username}
        &apos;s photoalbums
      </h2>
      {
      albums ? (
        <div className="albums">
          { mapAlbums(albums) }
        </div>
      ) : <Preloader />
    }
    </>
  );
};

export default Albums;

import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios, { AxiosResponse } from 'axios';
import Preloader from '@components/preloader';
import { AlbumsProps, AlbumWithPhotos } from '../types';
import { AlbumsType } from './types';

import './style.scss';

const Albums: FC<AlbumsProps> = ({ location, match }) => {
  const [albums, setAlbums] = useState<AlbumsType[]>(null);
  const [albumsWithPhotos, setAlbumsWithPhotos] = useState<AlbumWithPhotos[][]>(null);

  const { userId } = match.params;

  console.log('Albums', location.state);

  const mapAlbums = (albumsArray: AlbumsType[]) => albumsArray.map(
    (album: AlbumsType) => (
      <div className="album-block" key={album.id}>
        <Link
          to={{
            pathname: `/users/${match.params.userId}/${album.id}`,
            state: {
              userId,
              // username,
              title: album.title,
              photos: albumsWithPhotos[album.id],
            },
          }}
        >
          <div className="album-block__thumbnail">
            <img src={album.thumbnailUrl} alt="album thumbnail" />
            <span>{album.photosAmount}</span>
          </div>
          <div className="album-block__info">
            {album.title}
          </div>
        </Link>
      </div>
    ),
  );

  const parseResult = async (dataArray: []) => {
    const promiseArray: Promise<AxiosResponse>[] = [];

    const albumsWithPhotosArray: AlbumWithPhotos[][] = [];

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

          albumsWithPhotosArray.push(value.data);

          return true;
        });

        setAlbumsWithPhotos(albumsWithPhotosArray);
      });

    return parsedDataArray;
  };

  useEffect(() => {
    setAlbums(null);

    if (userId) {
      Axios
        .get(`https://jsonplaceholder.typicode.com/albums?&userId=${userId}`)
        .then(async (response) => {
          setAlbums(await parseResult(response.data));
        });
    }
  }, [match.params.userId]);

  return (
    <div className="albums-wrapper">
      <h2 className="page-title">
        {/* {username} */}
        &apos;s photoalbums
      </h2>
      {
      albums ? (
        <div className="albums">
          { mapAlbums(albums) }
        </div>
      ) : <Preloader />
    }
    </div>
  );
};

export default Albums;

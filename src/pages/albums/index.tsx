import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Preloader from '@components/preloader';
import { getAlbums, getPhotos } from '@common/utils';
import { AlbumPageProps, PhotosType } from '../types';
import { AlbumsType } from './types';

import './style.scss';

const AlbumsPage: FC<AlbumPageProps> = ({ match }) => {
  const { userId } = match.params;

  const [albums, setAlbums] = useState<AlbumsType[]>(null);
  const [albumsWithPhotos, setAlbumsWithPhotos] = useState<PhotosType[][]>(null);

  const mapAlbums = (albumsArray: AlbumsType[]) => albumsArray.map(
    (album: AlbumsType) => (
      <div className="album-block" key={album.id}>
        <Link
          to={{
            pathname: `/users/${userId}/albumId${album.id}`,
            state: {
              userId,
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

    const albumsWithPhotosArray: PhotosType[][] = [];

    const parsedDataArray: AlbumsType[] = dataArray.map((item) => {
      const { id, title } = item;

      promiseArray.push(getPhotos(id));

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

    const trimmedId = userId.replace('userId', '');

    if (trimmedId) {
      getAlbums(trimmedId)
        .then(async (response) => {
          setAlbums(await parseResult(response.data));
        });
    }
  }, [userId]);

  return (
    <div className="albums-wrapper">
      <h2 className="page-title">
        Albums
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

export default AlbumsPage;

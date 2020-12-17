import React, { FC, useEffect } from 'react';
import { AlbumsProps, AlbumWithPhotos } from '@pages/types';
import Preloader from '@components/preloader';

import './style.scss';

const AlbumPhotos: FC<AlbumsProps> = ({ history, location, match }) => {
  const {
    username,
    title,
    photos,
  } = location.state;

  const { albumId, userId } = match.params;

  useEffect(() => {
    console.log('AlbumPhotos', userId, albumId);
  }, []);

  const mapPhotos = (photosArray: AlbumWithPhotos[]) => photosArray.map(
    (item) => {
      console.log(item);

      return (
        <div className="photo-block" key={item.id}>
          <button
            type="button"
            // onClick={() => modalHandler({
            //   currentId: item.id,
            //   currentUrl: item.url,
            //   photos: photosArray,
            // })}
          >
            <img src={item.thumbnailUrl} alt="thumbnail" />
            <div className="photo-block__title">{item.title}</div>
          </button>
        </div>
      );
    },
  );

  const backHandler = () => {
    history.push(`/users/${match.params.userId}`, {});
  };

  return (
    <div className="photos-wrapper">
      <div className="page-top">
        <h2>
          {/* {title} */}
        </h2>
        <button
          type="button"
          onClick={backHandler}
        >
          Back
        </button>
      </div>
      {/* {
        photos ? (
          <div className="photos">
            { mapPhotos(photos) }
          </div>
        ) : <Preloader />
      } */}
    </div>
  );
};

export default AlbumPhotos;

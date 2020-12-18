import React, { FC, useEffect, useState } from 'react';
import { AlbumPageProps, PhotosPageProps, PhotosType } from '@pages/types';
import Preloader from '@components/preloader';
import { getPhotos } from '@common/utils';

import './style.scss';

const PhotosPage: FC<PhotosPageProps> = ({
  history,
  location,
  match,
  modalHandler,
}) => {
  const { userId, albumId } = match.params;

  const [photosArray, setPhotosArray] = useState(null);

  useEffect(() => {
    if (location.state?.photos) {
      setPhotosArray(location.state.photos);
    } else {
      const trimmedId = albumId.replace('albumId', '');

      getPhotos(trimmedId)
        .then((response) => setPhotosArray(response.data));
    }
  }, []);

  const mapPhotos = (itemsArray: PhotosType[]) => itemsArray.map(
    (item, index) => (
      <div className="photo-block" key={item.id}>
        <button
          type="button"
          onClick={() => modalHandler(index, itemsArray)}
        >
          <img src={item.thumbnailUrl} alt="thumbnail" />
          <div className="photo-block__title">{item.title}</div>
        </button>
      </div>
    ),
  );

  const backHandler = () => {
    history.push(`/users/${userId}`);
  };

  return (
    <div className="photos-wrapper">
      <div className="page-top">
        <h2>
          Photos
        </h2>
        <button
          type="button"
          onClick={backHandler}
        >
          Back
        </button>
      </div>
      {
        photosArray ? (
          <div className="photos">
            { mapPhotos(photosArray) }
          </div>
        ) : <Preloader />
      }
    </div>
  );
};

export default PhotosPage;

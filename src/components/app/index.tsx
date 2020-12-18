import React, { FC, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Sidebar from '@components/sidebar';
import Modal from '@components/modal';
import AlbumsPage from '@pages/albums';
import PhotosPage from '@pages/photos';
import HomePage from '@pages/home';
import { PhotosType } from '@pages/types';

import './style.scss';

const App: FC = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalPhotos, setModalPhotos] = useState<PhotosType[]>([]);
  const [modalPhotoId, setModalPhotoId] = useState(null);

  const modalHandler = (id: number, array: PhotosType[]) => {
    setModalPhotos(array);
    setModalPhotoId(id);
    setModalOpened(true);
  };

  return (
    <>
      { modalOpened
      && (
      <Modal
        photos={modalPhotos}
        currentId={modalPhotoId}
        closeHandler={setModalOpened}
      />
      )}
      <div className="app">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/users" />
          </Route>
          <Route exact path="/users" component={HomePage} />
          <Route
            path="/users/:userId/:albumId"
            render={(props) => (
              <PhotosPage {...props} modalHandler={modalHandler} />
            )}
          />
          <Route path="/users/:userId/" component={AlbumsPage} />
          <Route />
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};

export default App;

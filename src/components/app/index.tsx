import React, { FC, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Sidebar from '@components/sidebar';
import Albums from '@pages/albums';
import AlbumPhotos from '@pages/photos';

import './style.scss';
import { AlbumsProps } from '@pages/types';
import Modal from '@components/modal';

const App: FC = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      { modalOpened && <Modal closeHandler={setModalOpened} /> }
      <div className="app">
        <Sidebar />
        <Switch>
          <Route exact path="/users">
            <Redirect to={`/users/${1}`} />
          </Route>
          <Route exact path="/">
            <Redirect to={`/users/${1}`} />
          </Route>
          <Route
            path="/users/:userId/:albumId"
            component={AlbumPhotos}
          />
          <Route path="/users/:userId/" component={Albums} />
          <Route />
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};

export default App;

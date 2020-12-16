import React, { FC } from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Sidebar from '@components/sidebar';
import Albums from '@pages/albums';

import './style.scss';
import AlbumPhotos from '@pages/photos';

const App: FC = () => (
  <div className="app">
    <Sidebar />
    <div className="page-container">
      <Switch>
        <Route exact path="/users" />
        <Route exact path="/">
          <Redirect to="/users" />
        </Route>
        <Route path="/users/:username/:albumId" component={AlbumPhotos} />
        <Route path="/users/:username/" component={Albums} />
        <Redirect to="/" />
      </Switch>
    </div>
  </div>
);

export default App;

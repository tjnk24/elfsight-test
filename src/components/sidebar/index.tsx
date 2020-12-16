import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import Preloader from '@components/preloader';
import { User } from './types';

import './style.scss';

const Sidebar: FC = () => {
  const [users, setUsers] = useState<User[]>(null);

  const mapUsers = (usersArray: User[]) => usersArray.map(
    (user: User) => (
      <li key={user.id}>
        <NavLink
          to={{
            pathname: `/users/${user.name.replace(/\s/g, '')}`,
            state: {
              username: user.name,
              userId: user.id,
            },
          }}
          className="nav-link"
          activeClassName="nav-link--active"
        >
          { user.name }
        </NavLink>
      </li>
    ),
  );

  const parseResult = (dataArray: []) => dataArray.map(
    (item) => {
      const { id, name } = item;
      return { id, name };
    },
  );

  useEffect(() => {
    Axios
      .get('https://jsonplaceholder.typicode.com/users?&_limit=4')
      .then((response) => {
        setUsers(parseResult(response.data));
      });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2><NavLink to="/users">Photogallery</NavLink></h2>
      </div>
      <div className="sidebar__bottom">
        <span>Artists</span>
        {
          users
            ? (
              <ul>
                { mapUsers(users) }
              </ul>
            ) : <Preloader width="40px" />

        }
      </div>
    </div>
  );
};

export default Sidebar;

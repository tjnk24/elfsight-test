import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Preloader from '@components/preloader';
import { getUsers } from '@common/utils';
import { IUser } from '@common/types';

import './style.scss';

const Sidebar: FC = () => {
  const [users, setUsers] = useState<IUser[]>(null);

  const mapUsers = (usersArray: IUser[]) => usersArray.map(
    (user: IUser) => (
      <li key={user.id}>
        <NavLink
          to={{
            pathname: `/users/userId${user.id}`,
            state: {
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
    getUsers().then((response) => {
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

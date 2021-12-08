/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';

import IntlMessages from 'helpers/IntlMessages';
import ThumbnailImage from 'components/cards/ThumbnailImage';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import { adminRoot } from 'constants/defaultValues';

const NewComments = ({ users }) => {
  return (
    <Card>
      {console.log(users)}
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.members" />
        </CardTitle>
        <div className="dashboard-list-with-user">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {' '}
            {users &&
              users.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex flex-row mb-3 pb-3 border-bottom"
                  >
                    <NavLink to={`${adminRoot}/pages/product/details`}>
                      {item.photoURL ? (
                        <ThumbnailImage
                          rounded
                          small
                          src={`${item.photoURL}`}
                          alt="profile"
                        />
                      ) : (
                        <ThumbnailLetters
                          rounded
                          small
                          text={item.displayName}
                        />
                      )}
                    </NavLink>

                    <div className="pl-3 pr-2">
                      <NavLink to={`${adminRoot}/pages/product/details`}>
                        <p className="font-weight-medium mb-0">
                          {item.displayName}
                        </p>
                        <p className="text-muted mb-0 text-small">
                          {item.role}
                        </p>
                      </NavLink>
                    </div>
                    <div className="pl-3 pr-2">
                      <NavLink to={`${adminRoot}/pages/product/details`}>
                        <p className="font-weight-medium mb-0">{item.email}</p>
                      </NavLink>
                    </div>
                  </div>
                );
              })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};

export default NewComments;

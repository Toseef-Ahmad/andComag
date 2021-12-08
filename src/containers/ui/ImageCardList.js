import React from 'react';
import { Row, Card, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import ThumbnailImage from 'components/cards/ThumbnailImage';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';

import { Colxx } from 'components/common/CustomBootstrap';

const ImageCardList = ({ items }) => {
  return (
    <Row>
      {console.log({ items })}
      {items &&
        items.map((product) => {
          return (
            <Colxx xxs="12" key="33">
              <Row>
                <Colxx xxs="12">
                  <Card className="d-flex flex-row mb-3">
                    <NavLink
                      to={`/app/pages/profile/portfolio?user=${product.uid}`}
                      location={{}}
                      className="d-flex"
                    >
                      {product.photoURL ? (
                        <ThumbnailImage
                          rounded
                          src={product.photoURL}
                          alt="Card image cap"
                          className="m-4"
                        />
                      ) : (
                        <ThumbnailLetters
                          rounded
                          text="Test user"
                          className="m-4"
                        />
                      )}
                    </NavLink>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <NavLink
                          to={`/app/pages/profile/portfolio?user=${product.uid}`}
                          location={{}}
                          className="w-40 w-sm-100"
                        >
                          <p className="list-item-heading mb-1 truncate">
                            {' '}
                            {product.displayName}
                          </p>
                        </NavLink>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                          {product.email}
                        </p>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">
                          09.04.2018
                        </p>
                        <div className="w-15 w-sm-100">
                          {product.status === false ? (
                            <Badge color="danger" pill>
                              Not Active
                            </Badge>
                          ) : (
                            <Badge color="primary" pill>
                              Active
                            </Badge>
                          )}
                        </div>
                      </div>
                      {/*    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <FormGroup className="mb-0">
                          <CustomInput type="checkbox" id="check1" label="" />
                        </FormGroup>
                      </div>
                          */}
                    </div>
                  </Card>
                </Colxx>
              </Row>
            </Colxx>
          );
        })}
    </Row>
  );
};

export default ImageCardList;

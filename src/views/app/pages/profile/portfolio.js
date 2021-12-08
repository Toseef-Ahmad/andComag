import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Button,
  TabPane,
  Badge,
  CardSubtitle,
  CardText,
  CardImg,
} from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import SingleLightbox from 'components/pages/SingleLightbox';
import { database } from 'helpers/Firebase';

const ProfilePortfolio = ({ match }) => {
  const myParam = window.location.search.split('user=')[1];
  const [userCode, setUserCode] = useState(myParam);
  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState([]);
  const [userGroups, setUserGroups] = useState([])
  const [groupData, setGroupData] = useState({})
  
  useEffect(() => {
    async function fetchData() {
      setUserCode(userCode);
      let setGroup = [];
      database.ref(`/users/${userCode}`).on('value', (snapshot) => {
        console.log(snapshot.val(), ' value from snapshot')
        const dataRes = snapshot.val();
        console.log(dataRes, 'this is object');
        setUser(dataRes.info);
        setGroup = dataRes.groups;
        console.log(setGroup, 'Groups data')
        setGroupData(() => {
          return setGroup
        })
      });
    
    }
    fetchData();
  }, []);

  const setRoleInGroups = async () => {
   
    const groupsInfo = [];
    const groupsData = [];
    Object.keys(groupData).forEach(function eachKey(item) {
      // userData.push(dataRes[item].info);
      // let groupInfoData = {};  

      database.ref(`/groups/${item}`).on('value', async (groupSnapshot) => {

        const singleGroupData = await groupSnapshot.val();
        // const role = getUserInfo(groupData.users)
        // console.log(singleGroupData.users);
        //  = role !== undefined ? role : 'publisher';
        Object.keys(singleGroupData.users).forEach(function eachKey1(group) {
          if (singleGroupData.users[group].uid === userCode) {
            singleGroupData.info.role = singleGroupData.users[group].role ? singleGroupData.users[group].role : 'publisher'
            setUserGroups([...userGroups, singleGroupData.info])
          }
        })
        // console.log(singleGroupData?.info);
        groupsInfo.push(singleGroupData?.info);
        // setUserGroups([...userGroups, groupsInfo])

      })
      
      // groupsData.push(groupData[item]);

    });

    setGroups(groupsData);
    setUserGroups(() => groupsInfo);
    setMyGroups(() => [...groupsInfo]);
    // return groupsInfo;
  }

  useEffect(() => {
    setRoleInGroups();
    console.log(groupData, ' groupData')
  }, [groupData])

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>{user.displayName}</h1>

          <Breadcrumb match={match} />

          <TabPane tabId="details">
            <Row>
              <Colxx xxs="12" lg="4" className="mb-4 col-left">
                <Card className="mb-4">
                  <div className="position-absolute card-top-buttons">
                    <Button outline color="white" className="icon-button">
                      <i className="simple-icon-pencil" />
                    </Button>
                  </div>
                  <SingleLightbox
                    thumb={user.photoURL || '/assets/img/profiles/1.jpg'}
                    large={user.photoURL || '/assets/img/profiles/1.jpg'}
                    className="card-img-top"
                  />

                  <CardBody>
                    <div>
                      <span className="text-muted text-small mb-2">
                        <IntlMessages id="pages.email" />:
                      </span>
                      <span className="mb-3"> {user.email}</span>
                    </div>
                    <div>
                      <span className="text-muted text-small mb-2">
                        Created At:
                      </span>
                      <span className="mb-3"> {user.updatedAt?.split('T')[0]}</span>
                    </div>
                    <div>
                      <span className="text-muted text-small mb-2">
                        <IntlMessages id="pages.role" />:
                      </span>
                      <span className="mb-3"> {user.role}</span>
                    </div>
                    <p className="text-muted text-small mt-2">
                      Total number of groups
                    </p>
                    <p>{Object.keys(groupData).length}</p>

                    <p className="text-muted text-small mb-2">
                      <IntlMessages id="pages.status" />
                    </p>
                    {user.status === false ? (
                      <Badge color="danger" pill>
                        Not Active
                      </Badge>
                    ) : (
                      <Badge color="primary" pill>
                        Active
                      </Badge>
                    )}
                    <p className="text-muted text-small mb-2">
                      <IntlMessages id="pages.groups" />:
                    </p>
                    <p className="mb-3">
                      {groups.map((elem) => {
                        return (
                          <Link
                            key={elem?.groupCode}
                            to={`/app/pages/product/details?group=${elem?.groupCode}`}
                          >
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              {elem?.name}
                            </Badge>
                          </Link>
                        );
                      })}
                    </p>
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx xxs="12" lg="8" className="mb-4 col-right">
                <Row>
                  {isLoaded &&
                    userGroups.map((info) => {

                      return (
                        <Colxx
                          xxs="12"
                          lg="6"
                          xl="4"
                          className="mb-4"
                          key={`product_${info.groupCode}`}
                        > {console.log({ userGroups })}
                          <Card>
                            <div className="position-relative">
                              <NavLink
                                to="#"
                                location={{}}
                                className="w-40 w-sm-100"
                              >
                                <CardImg
                                  top
                                  alt={info.title}
                                  src={
                                    info?.photoURL ||
                                    '/assets/img/profiles/1.jpg'
                                  }
                                />
                              </NavLink>
                            </div>
                            <CardBody>
                              <NavLink
                                to="#"
                                location={{}}
                                className="w-40 w-sm-100"
                              >
                                <CardSubtitle>{info.name}</CardSubtitle>
                              </NavLink>
                              <CardText className="text-muted text-small mb-0 font-weight-light">
                                Status:{' '}
                                {info.subscriptionStatus
                                  ? 'Active'
                                  : 'Not Active'}{' '}
                                <br />
                                Role : {info.role}
                              </CardText>

                              <CardText className="text-muted text-small mb-0 font-weight-light">
                                {info.createdAt?.split('T')[0]}
                              </CardText>
                            </CardBody>
                          </Card>
                        </Colxx>
                      );
                    })}
                </Row>
              </Colxx>
            </Row>
          </TabPane>
        </Colxx>
      </Row>
    </>
  );
};
export default ProfilePortfolio;

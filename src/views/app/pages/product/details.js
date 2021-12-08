import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody, Button, Badge } from 'reactstrap';
import { injectIntl } from 'react-intl';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import RadialProgressCard from 'components/cards/RadialProgressCard';
import NewComments from 'containers/dashboards/NewComments';
import { ReactTableDivided } from 'containers/ui/ReactTableCards';
import { database } from 'helpers/Firebase';

const DetailsPages = ({ match }) => {
  // const [activeTab, setActiveTab] = useState('details');
  const myParam = window.location.search.split('group=')[1];
  const [groupCode, setGroupCode] = useState(myParam);
  const [isLoaded, setIsLoaded] = useState(false);
  const [group, setGroup] = useState([]);
  const [users, setUsers] = useState([]);
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setGroupCode(groupCode);
      database.ref(`/groups/${groupCode}`).on('value', (snapshot) => {
        const dataRes = snapshot.val(); 
        const user = [];
        Object.keys(dataRes.users).forEach(function eachKey(item) {
          user.push(dataRes.users[item]);
        });
        setGroup(dataRes.info);
        setUsers(user);
        database.ref('/magazines').orderByChild('groupCode').equalTo(groupCode).on('value', (snapshot1) => {
          const data = snapshot1.val();
          const magazine = [];
            Object.keys(data).forEach(function eachKey(item) {
                
              data[item].postsCount = data[item]?.posts ? Object.keys(data[item].posts).length : 0;
              magazine.push(data[item]);
            });
            setMagazines(magazine) 
         
          
        })
        console.log(  isLoaded);
      });
    
      setIsLoaded(true);
    }
    fetchData();
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>{group.name}</h1>

          <Breadcrumb match={match} />
          {console.log(group)}
          <Row>
            <Colxx xxs="12" lg="4" className="mb-4">
              <Card className="mb-4">
                <div className="position-absolute card-top-buttons">
                  <Button outline color="white" className="icon-button">
                    <i className="simple-icon-pencil" />
                  </Button>
                </div>
                <img
                  src="/assets/img/products/goose-breast-thumb.jpg"
                  alt="Detail"
                  className="card-img-top"
                />

                <CardBody>
                  <p className="text-muted text-small mb-2">
                    <IntlMessages id="pages.type" />:
                  </p>
                  <div className="mb-3">
                    <p className="d-sm-inline-block mb-1">
                      <Badge color="outline-secondary mb-1 mr-1" pill>
                        {group.type}
                      </Badge>
                    </p>
                    <p className="text-muted text-small mb-2">
                      <IntlMessages id="pages.type_of_plan" />
                    </p>
                    <p>{group.subscriptionType}</p>{' '}
                  </div>

                  <p className="text-muted text-small mb-2">
                    <IntlMessages id="pages.subscription" />
                  </p>
                  <p>{group.subscriptionStatus ? 'Active' : 'Not Active'}</p>
                </CardBody>
              </Card>
              <Row>
                <Colxx xxs="12" className="mb-4">
                  <RadialProgressCard
                    className="mb-4"
                    title="Group Id"
                    percent={group.groupCode}
                    isSortable={false}
                  />
                </Colxx>
                <Colxx xxs="12" className="mb-4">
                  <RadialProgressCard
                    className="mb-4"
                    title="Creation Date"
                    percent={group.createdAt?.split('T')[0]}
                    isSortable={false}
                  />
                </Colxx>
                <Colxx xxs="12" className="mb-4">
                  <RadialProgressCard
                    className="mb-4"
                    title="Subscription Type"
                    percent={group.subscriptionType}
                    isSortable={false}
                  />
                </Colxx>
                <Colxx xxs="12" className="mb-4">
                  <RadialProgressCard
                    className="mb-4"
                    title="Numbers of Users"
                    percent={users.length}
                    isSortable={false}
                  />
                </Colxx>
              </Row>
            </Colxx>

            <Colxx xxs="12" lg="8"> 
             {magazines?.length && <ReactTableDivided data={magazines}/>} 
              <NewComments className="mb-4" users={users} displayRate /> 
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(DetailsPages);

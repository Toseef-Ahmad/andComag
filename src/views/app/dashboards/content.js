import React, { useEffect, useState } from 'react'; // , { useEffect, useState }
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import SortableStaticsRow from 'containers/dashboards/SortableStaticticsRow';
// import QuickPost from 'containers/dashboards/QuickPost';
// import BestSellers from 'containers/dashboards/BestSellers';
import { database } from 'helpers/Firebase';
import { getAverage } from 'helpers/Utils';
import { getAveragePosts } from 'helpers/Utils';
import { getAverageGroups } from 'helpers/Utils';
import { getAveragePostsCurrentYear } from 'helpers/Utils';
import { getNursinghomeSubscriber } from 'helpers/Utils';
import { getFamilyActiveAccounts } from 'helpers/Utils';
import { getFamilyClosedAccounts } from 'helpers/Utils';
import { getAverageUserPerGroup } from 'helpers/Utils';

const DashboardContent = ({ intl, match }) => {
  const { messages } = intl;

  const [isLoaded, setIsLoaded] = useState(false);
  const [groups, setGroups] = useState([]);
  const [magazines, setMagazines] = useState([]);
  const [nursingHomeAverageAge, setNursingHomeAverageAge] = useState(0);
  const [countAveragePostsPerUser, setCoutnAveragePostsPerUser] = useState(0);
  const [countAveragePostsPerUserCurrentYear, setCoutnAveragePostsPerUserCurrentYear] = useState(0);
  const [countNursinghomeSubscriber, setCountNursinghomeSubscriber] = useState(0);

  const [countAverageGroupsPerUser, setCountAverageGroupsPerUser] = useState(0);

  useEffect(() => {
    async function fetchData() {

      console.log(isLoaded);
      database.ref('/groups').on('value', (snapshot) => {
        const dataRes = snapshot.val();
        const familyGroups = [];
        Object.keys(dataRes).forEach(function eachKey(key) {
          familyGroups.push(dataRes[key]);
        });
        console.log(dataRes, 'this is group');
        setGroups(familyGroups);
      });
      database.ref('/magazines').on('value', (snapshot) => {
        const dataRes = snapshot.val();
        // const familyGroups = [];
        const otherGroups = [];
        Object.keys(dataRes).forEach(function eachKey(key) {
          otherGroups.push(dataRes[key]);
        });
        console.log(otherGroups, 'this is magazine');
        setMagazines(otherGroups);
      });

      setIsLoaded(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      setNursingHomeAverageAge(getAverage(groups));
      console.log('rendring average')
    }

  }, [groups])

  useEffect(() => {
    if (magazines.length > 0) {
      setCoutnAveragePostsPerUser(getAveragePosts(magazines, 'month'));

    }
  }, [magazines])


  useEffect(() => {
    if (magazines.length > 0) {
      setCoutnAveragePostsPerUserCurrentYear(getAveragePosts(magazines, 'year'))
    }
  }, [magazines])

  useEffect(() => {
    if (groups.length > 0 && magazines.length > 0) {
      setCountAverageGroupsPerUser(getAverageGroups(groups, magazines));
      setCountNursinghomeSubscriber(getNursinghomeSubscriber(groups))
    }
  }, [groups, magazines])

  useEffect(() => {
    if (groups.length > 0) {
      getAverageUserPerGroup(groups)
    }
  })


  return (
    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.content" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12" xl="12">
      
          {magazines.length > 0 && (
            <SortableStaticsRow
              messages={messages}
              magazines={magazines}
              groups={groups}
              nursingHomeAverageAge={nursingHomeAverageAge}
              countAveragePostsPerUser={countAveragePostsPerUser}
              countAverageGroupsPerUser={countAverageGroupsPerUser}
              countAveragePostsPerUserCurrentYear={countAveragePostsPerUserCurrentYear}
              countNursinghomeSubscriber={countNursinghomeSubscriber}
              getFamilyActiveAccounts={getFamilyActiveAccounts}
              getFamilyClosedAccounts={getFamilyClosedAccounts}
              getAverageUserPerGroup={getAverageUserPerGroup}
            />
          )}
        </Colxx>
      </Row>

      {/* 
        <div>{familyGroup.filter((elem) => elem.sent).length} completed</div>
      <div>{familyGroup.filter((elem) => !elem.sent).length} pending</div>
         <Row>
        <Colxx sm="12" lg="4" className="mb-4">
          <Cakes />
        </Colxx>
        <Colxx md="6" lg="8" className="mb-4">
          <NewComments />
        </Colxx>
      </Row>
      <Row>
        <Colxx sm="12" md="6" className="mb-4">
          <WebsiteVisitsChartCard />
        </Colxx>
        <Colxx sm="12" md="6" className="mb-4">
          <ConversionRatesChartCard />
        </Colxx>
      </Row>
       <Row>
        <Colxx lg="4" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-clock"
            title={`5 ${messages['dashboards.posts']}`}
            detail={messages['dashboards.pending-for-publish']}
            percent={(5 * 100) / 12}
            progressText="5/12"
          />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-male"
            title={`4 ${messages['dashboards.users']}`}
            detail={messages['dashboards.on-approval-process']}
            percent={(4 * 100) / 6}
            progressText="4/6"
          />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <GradientWithRadialProgressCard
            icon="iconsminds-bell"
            title={`8 ${messages['dashboards.alerts']}`}
            detail={messages['dashboards.waiting-for-notice']}
            percent={(8 * 100) / 10}
            progressText="8/10"
          />
        </Colxx>
      </Row>
          */}
    </>
  );
};
export default injectIntl(DashboardContent);

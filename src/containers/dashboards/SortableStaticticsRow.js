import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { Colxx } from 'components/common/CustomBootstrap';
import RadialProgressCard from 'components/cards/RadialProgressCard';
import { getAveragePosts } from 'helpers/Utils';

const SortableStaticticsRow = (props) => {

  // its all about getting nursing home users average;
  const [average, setAverage] = useState(props.nursingHomeAverageAge);
  const [averagePostsPerUser, setAveragePostsPerUser] = useState(props.countAveragePostsPerUser);
  const [averagePostsPerUserCurrentYear, setAveragePostsPerUserCurrentYear] = useState(props.countAveragePostsPerUserCurrentYear);
  const [averageGroupsPerUser, setAverageGroupsPerUser] = useState(props.countAverageGroupsPerUser);


  React.useEffect(() => {
    console.log('rendring')
    setAveragePostsPerUser(props.countAveragePostsPerUser);
    console.log(averagePostsPerUser, ' average posts');
  });

  React.useEffect(() => {
    setAverage(props.nursingHomeAverageAge)
  })

  React.useEffect(() => {
    setAverageGroupsPerUser(props.countAverageGroupsPerUser);
    // setAveragePostsPerUserCurrentYear(props.countAveragePostsPerUserCurrentYear);
  })

  React.useEffect(() => {
    console.log('rendring');
    setAveragePostsPerUserCurrentYear(props.countAveragePostsPerUserCurrentYear);
    console.log(averagePostsPerUserCurrentYear, ' averagge per year')
  })

  const [state, setState] = useState([
    {
      key: 1,
      title: 'Pending',
      percent: 64,
    },
    {
      key: 2,
      title: 'Completed',
      percent: 75,
    },
    {
      key: 3,
      title: 'Last month',
      percent: 32,
    },
    {
      key: 4,
      title: 'Previous month',
      percent: 45,
    },
    {
      key: 5,
      title: 'Ratio last vs previous',
      percent: 15,
    },
    {
      key: 6,
      title: 'This year',
      percent: 2,
    },
    {
      key: 7,
      title: 'Magazine last year to date',
      percent: 90,
    },
    {
      key: 8,
      title: 'Ratio this year vs last year',
      percent: 35,
    },
    {
      key: 9,
      title: 'avg # post per magazine',
      percent: 8,
    },
    {
      key: 10,
      title: 'avg no. of poster per magazine',
      percent: 2,
    },
    {
      key: 11,
      title: 'extra magazines sold this month',
      percent: 35,
    },
    {
      key: 11,
      title: 'extra magazines sold this year',
      percent: 35,
    },
  ]);
  const [family, setFamily] = useState([
    {
      key: 1,
      title: 'family accounts active',
      percent: 4,
    },
    {
      key: 2,
      title: '# closed family accounts',
      percent: 75,
    },
    {
      key: 3,
      title: 'average # users per group',
      percent: 2,
    },
    {
      key: 4,
      title: 'New group this month (+5 for example)',
      percent: 5,
    },
    {
      key: 5,
      title: 'New group this year',
      percent: 15,
    },
    {
      key: 6,
      title: 'average age of group',
      percent: 2,
    },
  ]);

  const [nursing, setNursing] = useState([
    {
      key: 1,
      title: 'families created a group for free via a nursing home account',
      percent: 1,
    },
    {
      key: 2,
      title: '# closed groups',
      percent: 1,
    },
    {
      key: 3,
      title: 'how many nursing homes subscribed to our service',
      percent: 1,
    },
    {
      key: 4,
      title: 'average age of group',
      percent: average,
    },
    {
      key: 5,
      title: '# average family groups per nursing home',
      percent: 1,
    },
  ]);

  const [user, setUser] = useState([
    {
      key: 1,
      title: 'average age of users',
      percent: average,
    },
    {
      key: 2,
      title: 'average post per user last month',
      percent: averagePostsPerUser,
    },
    {
      key: 3,
      title: 'average # posts per user this year',
      percent: averagePostsPerUserCurrentYear,
    },
    {
      key: 4,
      title: 'average # of groups per user',
      percent: averageGroupsPerUser,
    },
  ]);

  // React.useEffect(() => {
  //   let userAges = 0;
  //   let nursingHomeGroups = 0;
  //   const average = props.nursingHome.filter(nursing => {
  //     return nursing.info.type === 'geriatric' 
  //   });
  // }, []);
  const getAveragePosts = () => {
    return averagePostsPerUser;
  }

  const getAverage = (key) => {
    switch (key) {
      case 1:
        return average;
      case 2:
        return averagePostsPerUser;
      case 3:
        return averagePostsPerUserCurrentYear;
      case 4:
        return averageGroupsPerUser;
    }
  }

  const getNursing = (key) => {
    switch(key) {
      case 3:
        return props.countNursinghomeSubscriber;
      case 4:
        return props.nursingHomeAverageAge;
    }
  }

  const getFamily = (key) => {
    switch(key) {
      case 1:
        return props.getFamilyActiveAccounts;
      case 2:
        return props.getFamilyClosedAccounts;
    }
  }

  return (
    <>
      <h1>SortableStaticRow component</h1>
      <ReactSortable
        list={state}
        setList={setState}
        options={{ handle: '.handle' }}
        className="row"
      >
        <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
            title=" SortableStaticsRow Pending"
            percent={props.magazines.filter((elem) => !elem.active).length}
            isSortable
          />
        </Colxx>

        <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
            title="Completed"
            percent={props.magazines.filter((elem) => elem.active).length}
            isSortable
          />
        </Colxx>
        <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
            title="Avg # post per magazine"
            percent={Number(
              props.magazines
                .map((elem) =>
                  elem.posts ? Object.keys(elem.posts).length : 0
                )
                .reduce((acc, post) => acc + post) / props.magazines.length
            ).toFixed(2)}
            isSortable
          />
        </Colxx>
      </ReactSortable>
      <h1>Family Groups:</h1>

      <ReactSortable
        list={family}
        setList={setFamily}
        options={{ handle: '.handle' }}
        className="row"
      >
        <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
            title="Family accounts active"
            percent={
              props.groups.filter(
                (elem) =>
                  elem.info.subscriptionStatus && elem.info.type === 'family'
              ).length
            }
            isSortable
          />
        </Colxx>
        <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
            title="Closed family accounts"
            percent={
              props.groups.filter(
                (elem) =>
                  !elem.info.subscriptionStatus && elem.info.type === 'family'
              ).length
            }
            isSortable
          />
        </Colxx>
        <Colxx xl="3" lg="6" className="mb-4">
          <RadialProgressCard
            title="average # users per group"
            percent={Number(
              props.groups
                .map((elem) =>
                  elem.users ? Object.keys(elem.users).length : 0
                )
                .reduce((acc, post) => acc + post) / props.groups.length
            ).toFixed(2)}
            isSortable
          />
        </Colxx>
        {/*  {family.map((x) => {
          return (
            <Colxx xl="3" lg="6" className="mb-4" key={x.key}>
              <RadialProgressCard
                title={x.title}
                percent={x.percent}
                isSortable
              />
            </Colxx>
          );
        })}
      */}
      </ReactSortable>

      <h1>Nursing Home Groups:</h1>


      <ReactSortable
        list={nursing}
        setList={setNursing}
        options={{ handle: '.handle' }}
        className="row"
      >
        {nursing.map((x) => {
          return (
            <Colxx xl="3" lg="6" className="mb-4" key={x.key}>
              <RadialProgressCard
                title={x.title}
                percent={getNursing(x.key)}
                isSortable
              />
            </Colxx>
          );
        })}
      </ReactSortable>

      <h1>User Stats:</h1>
      <ReactSortable
        list={user}
        setList={setUser}
        options={{ handle: '.handle' }}
        className="row"
      >
        {user.map((x) => {
          return (
            <Colxx xl="3" lg="6" className="mb-4" key={x.key}>
              <RadialProgressCard
                title={x.title}
                percent={getAverage(x.key)}
                isSortable
              />
            </Colxx>
          );
        })}
      </ReactSortable>
    </>
  );
};
export default SortableStaticticsRow;

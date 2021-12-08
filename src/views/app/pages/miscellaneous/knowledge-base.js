/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Table,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  // Badge,
} from 'reactstrap';
// import { NavLink } from 'react-router-dom';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
// import knowledgeBaseData from 'data/knowledgebase';
import { NavLink, Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { database } from 'helpers/Firebase';
import classnames from 'classnames';
import Moment from 'react-moment';
import { calAverage, sortTable, removeDuplication, getAverage } from 'helpers/Utils';
import { sortBy } from 'lodash-es';
// import ThumbnailLetters from 'components/cards/ThumbnailLetters';

const KnowledgeBase = ({ match }) => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [csvLink, setCsvLink] = useState();
  const [csvNursLink, setCsvNursLink] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedTable, setIsLoadedTable] = useState(false);
  const [familyGroup, setFamilyGroup] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [searchNursingValue, setSearchNursingValue] = useState([]);
  const [otherGroup, setOtherGroup] = useState([]);
  const [dataToDownload, setDataToDownload] = useState([]);
  const [headers, setHearders] = useState([]);
  const [filterLabel, setFilterLabel] = useState();



  //its all about sorting
  const [isSorted, setIsSorted] = useState(false);
  const [sortedBy, setSortedBy] = useState('');

  // its all about average of posts in table


  useEffect(() => {
    async function fetchData() {
      database.ref('/purchases').on('value', (snapshot) => {
        const dataRes = snapshot.val();
        const familyGroups = [];
        const otherGroups = [];
        Object.keys(dataRes).forEach(function eachKey(key) {
          // console.log(dataRes[key]);
          if (dataRes[key]?.group?.type === 'family') {
            familyGroups.push(dataRes[key]);
          } else {
            otherGroups.push(dataRes[key]);
          }
        });
        // console.log(familyGroups, isLoaded);
        // const result = dataRes.map((item)=> {return item.info})
        setFamilyGroup(familyGroups);
        setSearchValue(familyGroups);
        setOtherGroup(otherGroups);
        setSearchNursingValue(otherGroups);
      });
      setIsLoaded(true);
      setIsLoadedTable(true);
    }
    fetchData();
  }, []);


  useEffect(() => {
    if (searchNursingValue.length > 0 && isLoadedTable) {
      console.log(searchValue)
      console.log(searchNursingValue)
      calAverage(searchNursingValue);
      setIsLoadedTable(false);
      console.log(searchNursingValue, '......................')
    }
    console.log('Nursing value after sorrted', searchNursingValue)
  }, [searchNursingValue])

  // useEffect(() => {
  //   if (isLoadedTable && searchValue.length > 0) {
  //     calAverage(searchValue);
  //     setIsLoadedTable(false);
  //   }  
  // }, [isLoadedTable])


  const onSearchKey = (e, key) => {
    // console.log(e.target.value);
    if (key === 'nursing') {
      if (e.target.value !== '') {
        const filteredData = otherGroup.filter((elem) => {
          return (
            elem.group?.groupCode.includes(e.target.value.toLowerCase()) ||
            elem.group?.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            (elem.group.type &&
              elem.group.type
                .toLowerCase()
                .includes(e.target.value.toLowerCase()))
          );
        });
        setSearchNursingValue(filteredData);
      } else {
        setSearchNursingValue(otherGroup);
      }
    } else if (key === 'group') {
      if (e.target.value !== '') {
        const filteredData = familyGroup.filter((elem) => {
          return (
            elem.group.groupCode
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            elem.group.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            elem.group.type.toLowerCase().includes(e.target.value.toLowerCase())
          );
        });
        setSearchValue(filteredData);
      } else {
        setSearchValue(familyGroup);
      }
    }
  };
  const onDownload = (params) => {
    if (params === 'nursing') {
      if (otherGroup.length > 0) {
        const headerdata = [];
        Object.keys(otherGroup[0].group).map((key) =>
          headerdata.push({ label: key, key })
        );
        setHearders(headerdata);
        const data = otherGroup.map((elem) => {
          return elem.group;
        });
        setDataToDownload(data);
        // console.log(data);
        setTimeout(() => {
          csvNursLink.link.click();
        }, 3000);
      }
    } else if (params === 'group') {
      if (familyGroup.length > 0) {
        const headerdata = [];
        Object.keys(familyGroup[0].group).map((key) =>
          headerdata.push({ label: key, key })
        );
        setHearders(headerdata);
        const data = familyGroup.map((elem) => {
          return elem.group;
        });
        setDataToDownload(data);
        setTimeout(() => {
          csvLink.link.click();
        }, 3000);
      }
    }
  };
  const onFilter = (e, key) => {
    setFilterLabel(e.target.value);
    if (key === 'nursing') {
      if (e.target.value === 'Active') {
        const filteredData = otherGroup.filter(
          (elem) => elem.group?.subscriptionStatus
        );
        setSearchNursingValue(filteredData);
      } else if (e.target.value === 'InActive') {
        const filteredData = otherGroup.filter(
          (elem) => !elem.group?.subscriptionStatus
        );
        setSearchNursingValue(filteredData);
      }
    } else if (key === 'group') {
      if (e.target.value === 'Active') {
        const filteredData = familyGroup.filter(
          (elem) => elem.group?.subscriptionStatus
        );
        setSearchValue(filteredData);
      } else if (e.target.value === 'InActive') {
        const filteredData = familyGroup.filter(
          (elem) => !elem.group?.subscriptionStatus
        );
        setSearchValue(filteredData);
      }
    }
  };

  // Sorting Table this function is written in Utils.js

  const handleSortTable = (sortBy, e, table = "") => {
    console.log(table)
    let isSorted = false;
    isSorted = true;
    if (sortedBy !== e.target.outerText) {
      // console.log('new sorted by');
    } else {
      // console.log('old sorted by');
    }
    (sortedBy !== e.target.outerText) && (isSorted = false);
    if (!isSorted && e.target.outerText !== sortedBy) {
      // console.log(' here again anf again')
    }
    !isSorted && e.target.outerText !== sortedBy && table === 'nursing' ? setSearchNursingValue(sortTable(sortBy, searchNursingValue)) : setSearchValue(sortTable(sortBy, searchValue));

    isSorted && sortedBy === e.target.outerText && table !== 'nursing' ? setSearchValue(() => {
      return [...searchValue.reverse()];
    }) : setSearchNursingValue(() => {
      return [...searchNursingValue.reverse()]
    });
    setIsSorted(true);
    setSortedBy(e.target.outerText);
  }

  return (
    <>
      <h1>Knowladge-base component</h1>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.faq" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Nav tabs className="">
        <NavItem>
          <NavLink
            to="#"
            location={{}}
            className={classnames({
              active: activeFirstTab === '1',
              'nav-link': true,
            })}
            onClick={() => {
              setActiveFirstTab('1');
            }}
          >
            Families
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="#"
            location={{}}
            className={classnames({
              active: activeFirstTab === '2',
              'nav-link': true,
            })}
            onClick={() => {
              setActiveFirstTab('2');
            }}
          >
            Nursing Home
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeFirstTab}>
        <TabPane tabId="1">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>GROUP FAMILIES</CardTitle>

              <div className="d-inline-block float-md-right mr-1 mb-1 align-top">
                <div className="d-block d-md-inline-block pt-1">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      Filter: {filterLabel}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        value="Active"
                        onClick={(e) => onFilter(e, 'group')}
                      >
                        Active
                      </DropdownItem>
                      <DropdownItem
                        value="InActive"
                        onClick={(e) => onFilter(e, 'group')}
                      >
                        InActive
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      placeholder="Search"
                      onChange={(e) => onSearchKey(e, 'group')}
                    />
                  </div>
                  <div
                    style={{ display: 'inherit' }}
                    onClick={() => {
                      onDownload('group');
                    }}
                  >
                    <span
                      className="simple-icon-arrow-down-circle"
                      style={{ fontSize: '25px' }}
                    ></span>
                  </div>
                  <CSVLink
                    data={dataToDownload}
                    headers={headers}
                    filename="data.csv"
                    className="hidden"
                    ref={(r) => setCsvLink(r)}
                    target="_blank"
                  />
                </div>
              </div>
              <Table responsive>
                <thead>
                  {/* <button onClick={() => setSearchValue(sortTable('status', searchValue))}>sort </button> */}
                  <tr>
                    <th>#</th>
                    <th name="groupId" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('groupId', e)}>Group ID</th>
                    <th name="groupName" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('groupName', e)}>Group Name</th>
                    <th name="creationDate" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('creationDate', e)}>creation date</th>
                    <th name="accountType" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('accountType', e)}>Account Type</th>
                    <th name="usersCount" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('userCount', e)}>users count</th>
                    <th name="status" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('status', e)}>Status</th>
                    <th onClick={() => removeDuplication(searchValue)}>Average</th>
                  </tr>
                </thead>
                <tbody>
                  {searchValue.map((item, index) => {
                    // sortTable('groupName', searchValue);
                    {
                      isLoadedTable && calAverage(searchValue) && setIsLoadedTable(false)
                    }
                    // { console.log(item) }
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        {/* <button onClick={() => setSearchValue(sortTable('name', searchValue))}>Sort table by group name</button> */}
                        <td>
                          <Link
                            to={`/app/pages/product/details?group=${item.group.groupCode}`}
                          >
                            {item.group.groupCode}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/app/pages/product/details?group=${item.group.groupCode}`}
                          >
                            {item.group.name}
                          </Link>
                        </td>
                        <td>
                          <Moment format="YYYY/MM/DD">
                            {item.group.createdAt}
                          </Moment>
                        </td>
                        <td>{item.group.type}</td>
                        <td>{item.group.groupUsers}</td>
                        <td>
                          {item.group?.subscriptionStatus
                            ? 'Active'
                            : 'InActive'}
                        </td>
                        <td>{item.average}</td>
                      </tr>
                      // <Colxx
                      //   md="12"
                      //   xl="4"
                      //   className="mb-4 col-item"
                      //   key={`knowledgebase_${index}`}
                      // >
                      //   <Link
                      //     to={`/app/pages/product/details?group=${item.info.groupCode}`}
                      //   >
                      //     <Card>
                      //       <CardBody>
                      //         <div className="text-center">
                      //           {item.info.photoURL ? (
                      //             <img
                      //               src={`${item.info.photoURL}`}
                      //               className="w-100 h-100"
                      //               alt=""
                      //             />
                      //           ) : (
                      //             <ThumbnailLetters
                      //               rounded
                      //               large
                      //               text="Sarah Kortney"
                      //             />
                      //           )}

                      //           <h5 className="mt-3 font-weight-semibold color-theme-1 mb-0">
                      //             {item.info.name}
                      //           </h5>
                      //         </div>
                      //         <div className="pl-3 pr-3 pt-3 pb-0 d-flex flex-column flex-grow-1">
                      //           <p className="text-muted mb-4">
                      //             {item.info.magazineText}
                      //           </p>
                      //           <ul className="list-unstyled mb-0">
                      //             <li>
                      //               <b>Group Code: </b>
                      //               {item.info.groupCode}
                      //             </li>
                      //             <li>
                      //               <b>Created at: </b>
                      //               {item.info.createdAt}
                      //             </li>
                      //             <li>
                      //               <b>Subscription status: </b>
                      //               {item.info.subscriptionStatus === false ? (
                      //                 <Badge color="danger" pill>
                      //                   Not Active
                      //                 </Badge>
                      //               ) : (
                      //                 <Badge color="primary" pill>
                      //                   Active
                      //                 </Badge>
                      //               )}
                      //             </li>
                      //             <li>
                      //               <b>No. of Members: </b>
                      //               {Object.keys(item.users).length}
                      //             </li>
                      //           </ul>
                      //         </div>
                      //       </CardBody>
                      //     </Card>
                      //   </Link>
                      // </Colxx>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          <Row className="equal-height-container mt-4">
            <Colxx xxs="12">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle>GROUP NURSING</CardTitle>
                  <div className="d-inline-block float-md-right mr-1 mb-1 align-top">
                    <div className="d-block d-md-inline-block pt-1">
                      <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                        <DropdownToggle caret color="outline-dark" size="xs">
                          Filter: {filterLabel}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            value="Active"
                            onClick={(e) => onFilter(e, 'nursing')}
                          >
                            Active
                          </DropdownItem>
                          <DropdownItem
                            value="InActive"
                            onClick={(e) => onFilter(e, 'nursing')}
                          >
                            InActive
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                        <input
                          type="text"
                          name="keyword"
                          id="search"
                          placeholder="Search"
                          onChange={(e) => onSearchKey(e, 'nursing')}
                        />
                      </div>
                      <div
                        style={{ display: 'inherit' }}
                        onClick={() => {
                          onDownload('nursing');
                        }}
                      >
                        <span
                          className="simple-icon-arrow-down-circle"
                          style={{ fontSize: '25px' }}
                        ></span>
                      </div>
                      <CSVLink
                        data={dataToDownload}
                        headers={headers}
                        filename="data.csv"
                        className="hidden"
                        ref={(r) => setCsvNursLink(r)}
                        target="_blank"
                      />
                    </div>
                  </div>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th name="groupId" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('groupId', e, 'nursing')}>Group ID</th>
                        <th name="groupName" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('groupName', e, 'nursing')}>Group Name</th>
                        <th name="creationDate" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('creationDate', e, 'nursing')}>creation date</th>
                        <th name="accountType" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('accountType', e, 'nursing')}>Account Type</th>
                        <th name="usersCount" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('userCount', e, 'nursing')}>users count</th>
                        <th name="status" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('status', e, 'nursing')}>Status</th>
                        <th onClick={() => removeDuplication(searchValue)}>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchNursingValue.map((item, index) => {

                        return (
                          <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{item?.group?.groupCode}</td>
                            <td>{item?.group?.name}</td>
                            <td>
                              <Moment format="YYYY/MM/DD">
                                {item?.group?.createdAt}
                              </Moment>
                            </td>
                            <td>type</td>
                            <td>{item?.group?.groupUsers}</td>
                            <td>
                              {item?.group?.subscriptionStatus
                                ? 'Active'
                                : 'InActive'}
                            </td>
                            <td>{item.average}</td>
                          </tr>
                          // <Colxx
                          //   md="12"
                          //   xl="4"
                          //   className="mb-4 col-item"
                          //   key={`knowledgebase_${index}`}
                          // >
                          //   <Card>
                          //     <CardBody>
                          //       <div className="text-center">
                          //         {item.info.photoURL ? (
                          //           <img
                          //             src={`${item.info.photoURL}`}
                          //             className="w-100 h-100"
                          //             alt=""
                          //           />
                          //         ) : (
                          //           <ThumbnailLetters
                          //             rounded
                          //             large
                          //             text="Sarah Kortney"
                          //           />
                          //         )}

                          //         <h5 className="mt-3 font-weight-semibold color-theme-1 mb-0">
                          //           {item.info.name}
                          //         </h5>
                          //       </div>
                          //       <div className="pl-3 pr-3 pt-3 pb-0 d-flex flex-column flex-grow-1">
                          //         <p className="text-muted mb-4">
                          //           {item.info.magazineText}
                          //         </p>
                          //         <ul className="list-unstyled mb-0">
                          //           <li>
                          //             <b>Group Code: </b>
                          //             {item.info.groupCode}
                          //           </li>
                          //           <li>
                          //             <b>Created at: </b>
                          //             {item.info.createdAt}
                          //           </li>
                          //           <li>
                          //             <b>Subscription status: </b>
                          //             {item.info.subscriptionStatus === false ? (
                          //               <Badge color="danger" pill>
                          //                 Not Active
                          //               </Badge>
                          //             ) : (
                          //               <Badge color="primary" pill>
                          //                 Active
                          //               </Badge>
                          //             )}
                          //           </li>
                          //           <li>
                          //             <b>No. of Members: </b>
                          //             {Object.keys(item.users).length}
                          //           </li>
                          //         </ul>
                          //       </div>
                          //     </CardBody>
                          //   </Card>
                          // </Colxx>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
};
export default KnowledgeBase;

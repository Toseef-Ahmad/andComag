/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Table,
  CardBody,
  Button,
  // Nav,
  // NavItem,
  // TabContent,
  // TabPane,
  // DropdownMenu,
  // DropdownItem,
  // DropdownToggle,
  // UncontrolledDropdown,
  // Badge,
} from 'reactstrap';
// import { NavLink } from 'react-router-dom';
import { isNil } from 'lodash';
import Breadcrumb from 'containers/navs/Breadcrumb';
import  DatePickerIcon from 'helpers/DatePickerIcon';
import moment from 'moment';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
// import knowledgeBaseData from 'data/knowledgebase';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { database } from 'helpers/Firebase';
import Moment from 'react-moment';
import { calAverage, sortTable, removeDuplication, removeDuplicationTableRows } from 'helpers/Utils';

// import classnames from 'classnames';
// import ThumbnailLetters from 'components/cards/ThumbnailLetters';

const NursingComplete = ({ match }) => {
  // const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [csvLink, setCsvLink] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [familyGroup, setFamilyGroup] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [filteredSearchValue, setFilteredSearchValue] = useState([]);

  // const [otherGroup, setOtherGroup] = useState([]);
  const [dataToDownload, setDataToDownload] = useState([]);
  const [headers, setHearders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  

  /// all about sorting
  const [isSorted, setIsSorted] = useState(false);
  const [sortedBy, setSortedBy] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(() => {
    async function fetchData() {
      database.ref('/purchases').on('value', (snapshot) => {
        const dataRes = snapshot.val();
        const familyGroups = [];
        // const otherGroups = [];
        console.log(dataRes, 'htis i s api response any thing magazines');
        Object.keys(dataRes).forEach(function eachKey(key) {
          // console.log(dataRes[key]);
          if (dataRes[key].sent && dataRes[key].group?.type !== 'family') {
            familyGroups.push(dataRes[key]);
          }
          // else {
          //   otherGroups.push(dataRes[key]);
          // }
        });
        console.log(familyGroups, isLoaded);
        // const result = dataRes.map((item)=> {return item.info})
        setFamilyGroup(familyGroups);
        setSearchValue(familyGroups);
        // setOtherGroup(otherGroups);
      });
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (searchValue.length > 0 && !dataLoaded) {
      console.log(searchValue, ' jer')
      setFilteredSearchValue(() => {
        return searchValue;
      });
      
      setDataLoaded(true);
    }
  })


  const handleChange = (date) => {
    
    setSelectedDate(date);
    // const filteredData = familyGroup.filter((elem) => {
    //   return moment(elem.magazine.startDate).isBefore(moment(date));
    // });
    let selectedYear = new Date(date).getFullYear();
    let selectedMonth = new Date(date).getMonth();

    let dataYear = 0;
    let dataMonth = 0;

    const currentYear = new Date().getFullYear();
    
    const filteredData = filteredSearchValue.filter(data => {
      dataYear = data.createdAt.split('-')[0];
      dataMonth = data.createdAt.split('-')[1];
      if (selectedYear === currentYear) {
        console.log(selectedYear, currentYear)
        return dataMonth < selectedMonth;
      } else {
        return dataYear <= selectedYear && dataMonth < selectedMonth
      }
    });

    setSearchValue(filteredData);
  };

  const onSearchKey = (e) => {
    console.log(e.target.value);

    if (e.target.value !== '') {
      const filteredData = familyGroup.filter((elem) => {
        return (
          elem.group.groupCode
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          elem.group.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setSearchValue(filteredData);
    } else {
      setSearchValue(familyGroup);
    }
  };
  const onDownload = () => {
    if (familyGroup.length > 0) {
      setHearders([
        { label: 'groupCode', key: 'groupCode' },
        { label: 'name', key: 'name' },
        { label: 'endDate', key: 'endDate' },
        { label: 'startDate', key: 'startDate' },
        { label: 'postsCount', key: 'postsCount' },
        { label: 'edition', key: 'edition' },
        { label: 'key', key: 'key' },
      ]);
      const data = familyGroup.map((elem) => {
        return {
          groupCode: elem.group.groupCode,
          name: elem.group.name,
          endDate: elem.magazine.endDate,
          startDate: elem.magazine.startDate,
          postsCount: elem.magazine.postsCount,
          edition: elem.magazine.edition,
          key: elem.magazine.key,
        };
      });
      console.log(data, 'hi this uis bbbbbbbbbbbb');
      setDataToDownload(data);
      setTimeout(() => {
        csvLink.link.click();
      }, 3000);
      // csvLink.link.click();
    }
  };

  /// all about sorting table
  const handleSortTable = (sortBy, e) => {
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
    !isSorted && e.target.outerText !== sortedBy && setSearchValue(sortTable(sortBy, searchValue));

    isSorted && sortedBy === e.target.outerText && setSearchValue(() => {
      return [...searchValue.reverse()];
    });
    setIsSorted(true);
    setSortedBy(e.target.outerText);
  }


  return (
    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.faq" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Card className="mb-4">
        <CardBody>
          <CardTitle>Nursing</CardTitle>

          <div className="d-inline-block float-md-right mr-1 mb-1 align-top">
            <div className="d-block d-md-inline-block pt-1">
            <DatePickerIcon selectedDate={selectedDate} handleSelectedDate={handleChange} />

              
              {/* <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
            <DropdownToggle caret color="outline-dark" size="xs">
              Filter: Label
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Active</DropdownItem>
              <DropdownItem>InActive</DropdownItem>
              </UncontrolledDropdown>
</DropdownMenu> */}
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder="Search"
                  onChange={(e) => onSearchKey(e)}
                />
              </div>
              <div
                style={{ display: 'inherit' }}
                onClick={() => {
                  onDownload();
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
              <tr>
                <th>#</th>
                <th name="groupId" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('groupId', e)}>Group ID</th>
                <th name="groupName" style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('groupName', e)}>Group Name</th>
                <th style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('periodStart', e)} >period start</th>
                <th style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('periodEnd', e)}>period end</th>
                <th style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('magzineId', e)}>Magzine ID</th>
                <th style={{ cursor: 'pointer' }} onClick={(e) => handleSortTable('numberOfPosts', e)}>Number of posts</th>
                <th>PDF</th>
                <th>Generate</th>
              </tr>
            </thead>
            <tbody>
              {searchValue.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
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
                      <Moment format="YYYY-MM-DD">
                        {item.magazine.startDate}
                      </Moment>
                    </td>
                    <td>
                      <Moment format="YYYY-MM-DD">
                        {item.magazine.endDate}
                      </Moment>
                    </td>
                    <td>{item.magazine.edition}</td>
                    <td>{item.magazine.postsCount}</td>
                    <td>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        className="simple-icon-arrow-down-circle"
                        style={{ fontSize: '25px' }}
                        target="_blank"
                        href={item.magazine.pdfURL}
                        disabled={isNil(item.magazine.pdfURL)}
                      ></Button>
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        className="simple-icon-check"
                        style={{ fontSize: '25px' }}
                        // target="_blank"
                        // href={item.magazine.pdfURL}
                        // disabled={isNil(item.magazine.pdfURL)}
                      ></Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};
export default NursingComplete;

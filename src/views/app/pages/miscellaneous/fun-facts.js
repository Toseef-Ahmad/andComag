/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Table,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Modal,
  ModalBody,
  ModalHeader,
  Input,

  // Badge,
} from 'reactstrap';
import Select from 'react-select';
// import { NavLink } from 'react-router-dom';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
// import knowledgeBaseData from 'data/knowledgebase';
import { NavLink } from 'react-router-dom';
import { database } from 'helpers/Firebase';
import classnames from 'classnames';

const KnowledgeBase = ({ match }) => {
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [factsData, setFactsData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [firstMessage, setFirstMessage] = useState('');
  const [secondMessage, setSecondMessage] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchData() {
      database.ref('/facts').on('value', (snapshot) => {
        const dataRes = snapshot.val();
        const factsDatas = [];
        Object.keys(dataRes).forEach(function eachKey(key) {
          console.log(dataRes[key]);
          factsDatas.push(dataRes[key]);
        });
        // const result = dataRes.map((item)=> {return item.info})
        console.log(isLoaded);
        setFactsData(factsDatas);
      });
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (firstMessage && secondMessage && year && month) {
      setError('');
      const date = new Date();
      const data = {
        firstMessage,
        secondMessage,
        year,
        month,
        createdAt: date.toISOString(),
      };
      database.ref(`/facts`).push(data);
      setOpen(false);
    } else {
      setError('Please Enter All values');
      console.log('enter all values');
    }
  };

  const options = [
    { value: '1', label: 'Jan' },
    { value: '2', label: 'Fab' },
    { value: '3', label: 'March' },
  ];

  const yearOptions = [
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
  ];

  return (
    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Fun Facts" match={match} />
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
            Facts
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeFirstTab}>
        <TabPane tabId="1">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Fun Facts </CardTitle>
              <CardHeader className="mt-3 text-right">
                {' '}
                <div className="btn btn-primary" onClick={() => setOpen(true)}>
                  Create New Fact
                </div>{' '}
              </CardHeader>

              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Half Message</th>
                    <th>Second Half Message</th>
                    <th>Month</th>
                    <th>year</th>
                    <th>creation date</th>
                  </tr>
                </thead>
                <tbody>
                  {factsData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.firstMessage}</td>
                        <td>{item.secondMessage}</td>

                        <td>{item.month}</td>
                        <td>{item.year}</td>
                        <td>{item.createdAt}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>
      <Modal isOpen={open} toggle={() => setOpen(false)}>
        <ModalHeader>Create Fun Fact</ModalHeader>
        <ModalBody>
          <div className="text-danger">{error && error}</div>
          <Input
            id="algolia-doc-search"
            placeholder="First half message"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className="mb-2"
            onChange={(e) => setFirstMessage(e.target.value)}
          />
          <Input
            id="algolia-doc-search"
            placeholder="Second half message"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            className="mb-2"
            onChange={(e) => setSecondMessage(e.target.value)}
          />
          <Select
            onChange={(e) => setMonth(e.value)}
            className="mb-2"
            options={options}
          />
          <Select
            onChange={(e) => setYear(e.value)}
            className="mb-2"
            options={yearOptions}
          />
          <div className="btn btn-primary mt-3" onClick={handleSubmit}>
            Create Fun
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default KnowledgeBase;

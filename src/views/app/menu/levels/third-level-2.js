
import React,{useEffect, useState} from 'react';
import { Row , Card,
  CardBody,
  CardSubtitle,
  CardText,
  } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { database } from 'helpers/Firebase';
import ThumbnailImage from 'components/cards/ThumbnailImage';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';

const ThirdLevel2 = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log('ddd')
      database.ref('/magazines').orderByChild('active').equalTo(false).on('value', (snapshot) => {
        const dataRes = snapshot.val(); 
        const response = [];
        Object.keys(dataRes).forEach(function eachKey(key) { 
          if(dataRes[key]){
            response.push(dataRes[key])
          }
        }); 
        console.log(items,isLoaded);
        // const result = dataRes.map((item)=> {return item.info})
        setItems(response);
      });
      setIsLoaded(true)
    }
    fetchData();
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.third-level-1" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row> 
        <Colxx md="6" sm="6" lg="4" xxs="12">
            <Card className="d-flex flex-row mb-4">
                <ThumbnailImage
                  rounded
                  small
                  src="/assets/img/profiles/l-1.jpg"
                  alt="profile"
                  className="m-4"
                />
              <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="min-width-zero">
                      <CardSubtitle className="truncate mb-1">
                        Sarah Kortney
                      </CardSubtitle>
                    <CardText className="text-muted text-small mb-2">
                      Executive Director
                    </CardText>
                  </div>
                </CardBody>
              </div>
            </Card>

            <Card className="d-flex flex-row mb-4">
                <ThumbnailLetters
                  rounded
                  small
                  text="Sarah Kortney"
                  className="m-4"
                />
              <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="min-width-zero">
                      <CardSubtitle className="truncate mb-1">
                        Sarah Kortney
                      </CardSubtitle>
                    <CardText className="text-muted text-small mb-2">
                      Executive Director
                    </CardText>
                  </div>
                </CardBody>
              </div>
            </Card> 
        </Colxx>
      </Row>
    </>
  );
};
export default ThirdLevel2;
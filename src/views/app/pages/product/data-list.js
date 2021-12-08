import React, { useState, useEffect } from 'react';

import { database } from 'helpers/Firebase';

import ListPageHeading from 'containers/pages/ListPageHeading';
import AddNewModal from 'containers/pages/AddNewModal';
import { CSVLink } from 'react-csv';
import useMousetrap from 'hooks/use-mousetrap';
import ImageCardList from 'containers/ui/ImageCardList';
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  // Badge,
} from 'reactstrap';
// const getIndex = (value, arr, prop) => {
//   for (let i = 0; i < arr.length; i += 1) {
//     if (arr[i][prop] === value) {
//       return i;
//     }
//   }
//   return -1;
// };
const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const DataListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [dataToDownload, setDataToDownload] = useState([]);
  const [headers, setHearders] = useState([]);
  const [csvLink, setCsvLink] = useState();
  const [filterLabel, setFilterLabel] = useState();
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  // const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  // const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    async function fetchData() {
      database.ref('/users').on('value', (snapshot) => {
        
        const dataRes = snapshot.val();
        const response = [];
        Object.keys(dataRes).forEach(function eachKey(key) {
          const info = { ...dataRes[key].info, ...{ role: 'user' } };
          if (dataRes[key].info.isAndcoAdmin !== true) {
            response.push(info);
          }
        });
        console.log(totalPage);
        // const result = dataRes.map((item)=> {return item.info})
        setItems(response);
        setSearchItems(response);
      });
      setIsLoaded(true);
      setTotalItemCount([]);
      setIsLoaded(true);
      setTotalPage(1);
      setSelectedItems([]);

      // axios
      //   .get(
      //     `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`
      //   )
      //   .then((res) => {
      //     return res.data;
      //   })
      //   .then((data) => {
      //     setTotalPage(data.totalPage);
      //     setItems(
      //       data.data.map((x) => {
      //         return { ...x, img: x.img.replace('img/', 'img/products/') };
      //       })
      //     );
      //     setSelectedItems([]);
      //     setTotalItemCount(data.totalItem);
      //     setIsLoaded(true);
      //   });
    }
    fetchData();
  }, [selectedPageSize, currentPage, selectedOrderOption]);

  // const onCheckItem = (event, id) => {
  //   if (
  //     event.target.tagName === 'A' ||
  //     (event.target.parentElement && event.target.parentElement.tagName === 'A')
  //   ) {
  //     return true;
  //   }
  //   if (lastChecked === null) {
  //     setLastChecked(id);
  //   }

  //   let selectedList = [...selectedItems];
  //   if (selectedList.includes(id)) {
  //     selectedList = selectedList.filter((x) => x !== id);
  //   } else {
  //     selectedList.push(id);
  //   }
  //   setSelectedItems(selectedList);

  //   if (event.shiftKey) {
  //     let newItems = [...items];
  //     const start = getIndex(id, newItems, 'id');
  //     const end = getIndex(lastChecked, newItems, 'id');
  //     newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
  //     selectedItems.push(
  //       ...newItems.map((item) => {
  //         return item.id;
  //       })
  //     );
  //     selectedList = Array.from(new Set(selectedItems));
  //     setSelectedItems(selectedList);
  //   }
  //   document.activeElement.blur();
  //   return false;
  // };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  // const onContextMenuClick = (e, data) => {
  //   console.log('onContextMenuClick - selected items', selectedItems);
  //   console.log('onContextMenuClick - action : ', data.action);
  // };

  // const onContextMenu = (e, data) => {
  //   const clickedProductId = data.data;
  //   if (!selectedItems.includes(clickedProductId)) {
  //     setSelectedItems([clickedProductId]);
  //   }

  //   return true;
  // };
  const onSearchKey = (e) => {
    if (e.target.value !== '') {
      const filteredData = items.filter((elem) => {
        return (
          elem.displayName
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          elem.email.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setSearchItems(filteredData);
    } else {
      setSearchItems(items);
    }
  };
  const onDownload = () => {
    if (items.length > 0) {
      setHearders([
        { label: 'displayName', key: 'displayName' },
        { label: 'email', key: 'email' },
        { label: 'role', key: 'role' },
      ]);
      const data = items.map((elem) => {
        return {
          displayName: elem.displayName,
          email: elem.email,
          role: elem.role,
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
  const onFilter = (e) => {
    setFilterLabel(e.target.value);
    if (e.target.value === 'Active') {
      const filteredData = items.filter((elem) => elem.status);
      setSearchItems(filteredData);
    } else if (e.target.value === 'InActive') {
      const filteredData = items.filter((elem) => !elem?.status);
      setSearchItems(filteredData);
    }
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <h1>data-list component data is fetching from database</h1>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="menu.data-list"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={(column) => {
            setSelectedOrderOption(
              orderOptions.find((x) => x.column === column)
            );
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          selectedOrderOption={selectedOrderOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            onSearchKey(e);
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
          <DropdownToggle caret color="outline-dark" size="xs">
            Filter: {filterLabel}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem value="Active" onClick={(e) => onFilter(e, 'group')}>
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
        <AddNewModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
        />
        {/* <ListPageListing
          items={items}
          displayMode={displayMode}
          selectedItems={selectedItems}
          onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
        /> */}
        {items.length && <ImageCardList items={searchItems} />}
      </div>
    </>
  );
};

export default DataListPages;

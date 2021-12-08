import React, { useState, useEffect } from 'react';

// import axios from 'axios';

// import { servicePath } from 'constants/defaultValues';

import ListPageHeading from 'containers/pages/ListPageHeading';
import AddNewModal from 'containers/pages/AddNewModal';
import ListPageListing from 'containers/pages/ListPageListing';
import useMousetrap from 'hooks/use-mousetrap';
import { database } from 'helpers/Firebase';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

// const apiUrl = `${servicePath}/cakes/paging`;

const orderOptions = [
  { column: 'title', label: 'Name' },
  { column: 'category', label: 'Email' },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'demo@demo.com', value: 'demo@demo.com', key: 0 },
  { label: 'demo@demo.com', value: 'demo@demo.com', key: 1 },
  { label: 'demo@demo.com', value: 'demo', key: 2 },
];

const DataListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Name',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    async function fetchData() {
      database.ref('/users').on('value', (snapshot) => {
        const dataRes = snapshot.val();
        const response = [];
        console.log(Object.keys(dataRes).length);
        Object.keys(dataRes).forEach(function eachKey(key) {
          const info = { ...dataRes[key].info, ...{ role: 'Admin' } };
          if (dataRes[key].info?.isAndcoAdmin === true) {
            response.push(info);
          }   
        });
        console.log({ response });
        // const result = dataRes.map((item)=> {return item.info})
        setItems(response);
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
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

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

  const onContextMenuClick = (e, data) => {
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
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
  const deleteUser = async(id) => { 
    await database.ref(`/users/${id}`).remove();
  }
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
    <h1>blank-page component data is fetching from database</h1>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="menu.blank-page"
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
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AddNewModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
        />
        {items.length && (
          <ListPageListing
            items={items && items}
            displayMode={displayMode}
            selectedItems={selectedItems}
            onCheckItem={onCheckItem}
            currentPage={currentPage}
            totalPage={totalPage}
            onContextMenuClick={onContextMenuClick}
            onContextMenu={onContextMenu}
            onChangePage={setCurrentPage}
            deleteUser = {deleteUser}
          />
        )}
      </div>
    </>
  );
};

export default DataListPages;

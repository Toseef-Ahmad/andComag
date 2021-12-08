/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';

import IntlMessages from 'helpers/IntlMessages';
import DatatablePagination from 'components/DatatablePagination'; 
import products from 'data/products';

function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
  console.log('dddddd',data)
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

export const ReactTableWithPaginationCard = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'no',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Group ID',
        accessor: 'groupId',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Group Name',
        accessor: 'groupName',
        cellClass: 'text-muted  w-15',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'period start',
        accessor: 'periodStart',
        cellClass: 'text-muted  w-17',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'period end',
        accessor: 'periodEnd',
        cellClass: 'text-muted  w-17',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Magazine Number',
        accessor: 'magazines',
        cellClass: 'text-muted  w-15',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'NUmber of posts',
        accessor: 'posts',
        cellClass: 'text-muted  w-15',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  return (
    <Card className="mb-4">
      <CardBody>{console.log({cols})}
        <CardTitle>
          <IntlMessages id="table.react-pagination" />
        </CardTitle>
        <Table columns={cols} data={products} />
      </CardBody>
    </Card>
  );
};

export const ReactTableDivided = ({data}) => {
   
  const cols = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'edition1',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Group Code',
        accessor: 'groupCode',
        cellClass: 'list-item-heading w-30',
        Cell: (props) => <>{props.value}</>,
      },
      
      {
        Header: 'period start',
        accessor: 'startDate',
        cellClass: 'text-muted  w-15',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'period end',
        accessor: 'endDate',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props?.value}</>,
      },
      {
        Header: 'Magazine Number',
        accessor: 'edition',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Number of posts',
        accessor: 'postsCount',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <CardTitle>
        <IntlMessages id="table.magazines" />
      </CardTitle>
      {data?.length && <Table columns={cols} data={data} divided />}
    </div>
  );
};

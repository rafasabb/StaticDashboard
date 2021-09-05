/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';

export default (props) => {
  const {
    tableColumns, tableData, pgSize, pagination,
  } = props;
  const [thisPageIndex, setThisPageIndex] = useState(0);
  const [thisPageSize, setThisPageSize] = useState(pgSize);
  const makeTable = (tableInstance, localPageSize) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      gotoPage,
      previousPage,
      nextPage,
      canPreviousPage,
      canNextPage,
      pageCount,
      setPageSize,
      pageOptions,
      state: { pageIndex, pageSize },
    } = tableInstance;
    if (localPageSize !== pageSize) {
      setPageSize(localPageSize);
      setThisPageSize(localPageSize);
    }
    return (
      <div className="flex flex-col justify-between h-full">
        <table className="w-full p-5 text-gray-700" {...getTableProps()}>
          <thead>
            {
              headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                  headerGroup.headers.map((column) => (
                    <th className="text-center text-blue-900" {...column.getHeaderProps()}>
                      { column.render('Header') }
                    </th>
                  ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className="text-center"
                    {...row.getRowProps()}
                  >
                    {
                    row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        { cell.render('Cell') }
                      </td>
                    ))
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {pagination
          ? (
            <Pagination
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              pageCount={pageCount}
              nextPage={nextPage}
              previousPage={previousPage}
              gotoPage={gotoPage}
            />
          ) : <></>}
      </div>
    );
  };

  const Pagination = (props2) => {
    const {
      canPreviousPage,
      canNextPage,
      pageIndex,
      pageOptions,
      pageCount,
      nextPage,
      previousPage,
      gotoPage,
    } = props2;
    return (
      <div className="flex flex-nowrap items-center justify-center">
        <span>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1 rounded-l" type="button" onClick={() => { gotoPage(0); setThisPageIndex(0); }} disabled={!canPreviousPage}>
            {'<<'}
          </button>
        </span>
        {' '}
        <span>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1" type="button" onClick={() => { previousPage(); setThisPageIndex(thisPageIndex - 1); }} disabled={!canPreviousPage}>
            {'<'}
          </button>
        </span>
        {' '}
        {' '}
        <span className="bg-gray-300 text-gray-800 font-bold py-1 px-1">
          Page
          {' '}
          <strong>
            {`${pageIndex + 1} of ${pageOptions.length}`}
          </strong>
          {' '}
        </span>
        <span>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1" type="button" onClick={() => { nextPage(); setThisPageIndex(thisPageIndex + 1); }} disabled={!canNextPage}>
            {'>'}
          </button>
        </span>
        {' '}
        <span>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1 rounded-r" type="button" onClick={() => { gotoPage(pageCount - 1); setThisPageIndex(pageCount - 1); }} disabled={!canNextPage}>
            {'>>'}
          </button>
        </span>
      </div>
    );
  };

  const tableInstance = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: {
        pageIndex: thisPageIndex,
        pageSize: thisPageSize,
      },
    },
    usePagination,
  );
  const table = useMemo(
    () => makeTable(tableInstance, thisPageSize),
    [tableColumns, tableData, thisPageIndex, thisPageSize],
  );

  return (
    <>
      { table }
    </>
  );
};

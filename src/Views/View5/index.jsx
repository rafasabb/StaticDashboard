/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { Row } from 'antd';
import './view5.css';

export default (props) => {
  const {
    tableColumns, tableData, setCurrentReport, currentReport,
  } = props;
  const [thisPageIndex, setThisPageIndex] = useState(0);
  const [thisPageSize, setThisPageSize] = useState(12);
  const makeTable = (tableInstance) => {
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
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {
              headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                  headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
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
                    {...row.getRowProps()}
                    className={row.original.code === currentReport ? 'selected' : ''}
                    onMouseEnter={() => setCurrentReport(row.original.code)}
                    onMouseLeave={() => (null)}
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
        <div className="pagination">
          <button type="button" onClick={() => { gotoPage(0); setThisPageIndex(0); }} disabled={!canPreviousPage}>
            {'<<'}
          </button>
          {' '}
          <button type="button" onClick={() => { previousPage(); setThisPageIndex(thisPageIndex - 1); }} disabled={!canPreviousPage}>
            {'<'}
          </button>
          {' '}
          <button type="button" onClick={() => { nextPage(); setThisPageIndex(thisPageIndex + 1); }} disabled={!canNextPage}>
            {'>'}
          </button>
          {' '}
          <button type="button" onClick={() => { gotoPage(pageCount - 1); setThisPageIndex(pageCount - 1); }} disabled={!canNextPage}>
            {'>>'}
          </button>
          {' '}
          <span>
            Page
            {' '}
            <strong>
              {`${pageIndex + 1} of ${pageOptions.length}`}
            </strong>
            {' '}
          </span>
        </div>
      </>
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
    () => makeTable(tableInstance),
    [tableColumns, tableData, thisPageIndex, thisPageSize, currentReport],
  );

  return (
    <Row id="view5">
      {table}
    </Row>
  );
};

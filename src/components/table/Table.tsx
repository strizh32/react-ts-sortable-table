import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionTypes, selectors } from '../../features/table';
import jsonData from './data.json';
import {
  ContentItemFromJsonFile,
  perPageValues,
  TableState,
  TableRow,
  OneOfKeys,
  TableColumn,
} from '../../features/table/types';
import {
  makeTableRows,
  getSortedByKeyArray,
  swapTwoElementsOfArray,
} from '../../utils';
import './style.css';
import 'bulma/css/bulma.css';

const { content } = jsonData as { content: ContentItemFromJsonFile[] };

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const perPage = useSelector(selectors.getPerPage);
  const currentPage = useSelector(selectors.getCurrentPage);
  const allTableRows = useSelector(selectors.getAllTableRows);
  const pagesArray = useSelector(selectors.getPagesArray);
  const sortOrder = useSelector(selectors.getSortOrder);
  const tableColumns = useSelector(selectors.getTableColumns);
  const sortedColumnTitle = useSelector(selectors.getSortedColumnTitle);
  const [currentColumnIndex, setCurrentColumnIndex] = useState<null | number>(
    null
  );
  const [dragOverColumnIndex, setDragOverColumnIndex] = useState<null | number>(
    null
  );

  function updatePerPage(newPerPage: TableState['perPage']) {
    dispatch({
      type: actionTypes.UPDATE_CURRENT_PAGE,
      payload: { currentPage: 1 },
    });
    dispatch({
      type: actionTypes.UPDATE_PER_PAGE,
      payload: { perPage: newPerPage },
    });
  }

  function updateCurrentPage(newCurrentPage: number): void {
    dispatch({
      type: actionTypes.UPDATE_CURRENT_PAGE,
      payload: { currentPage: newCurrentPage },
    });
  }

  function sortTable(sortKey: OneOfKeys): void {
    dispatch({ type: actionTypes.TOGGLE_SORT_ORDER });

    dispatch({
      type: actionTypes.UPDATE_TABLE_ROWS,
      payload: {
        tableRows: getSortedByKeyArray(allTableRows, sortKey, sortOrder),
      },
    });

    dispatch({
      type: actionTypes.UPDATE_SORTED_COLUMN_TITLE,
      payload: {
        sortedColumnTitle: sortKey,
      },
    });
  }

  function swapColumns(index1: number, index2: number): void {
    const swapped = allTableRows.map((row: TableRow) => {
      return swapTwoElementsOfArray(row, index1, index2);
    });
    dispatch({
      type: actionTypes.UPDATE_TABLE_ROWS,
      payload: {
        tableRows: swapped,
      },
    });
  }

  function PerPageButtons() {
    const buttons = perPageValues.map((val: TableState['perPage']) => {
      const className = [
        'button',
        'per-page-button',
        'is-small',
        val === perPage ? 'is-primary' : 'is-light',
      ]
        .join(' ')
        .trim();
      return (
        <button
          type="button"
          className={className}
          key={val}
          onClick={() => updatePerPage(val)}
        >
          {val}
        </button>
      );
    });
    return (
      <div className="per-page-buttons">
        <p>Show {perPage} items each</p>
        {buttons}
      </div>
    );
  }

  function PaginationButtons() {
    const buttons = pagesArray.map((item, idx) => {
      const page = idx + 1;
      const className = [
        'button',
        'pagination-button',
        'is-info',
        'is-small',
        page === currentPage ? 'is-primary' : 'is-light',
      ]
        .join(' ')
        .trim();
      return (
        <button
          type="button"
          className={className}
          key={item.id}
          onClick={() => updateCurrentPage(page)}
        >
          {page}
        </button>
      );
    });
    return <div className="pagination-buttons">{buttons}</div>;
  }

  function handleDragStart(
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    idx: number
  ) {
    setCurrentColumnIndex(idx);
  }

  function handleDragOver(
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    idx: number
  ) {
    e.preventDefault();
    if (idx !== dragOverColumnIndex) {
      setDragOverColumnIndex(idx);
    }
  }

  function handleDrop(
    e: React.DragEvent<HTMLTableHeaderCellElement>,
    idx: number
  ) {
    setDragOverColumnIndex(null);
    setCurrentColumnIndex(null);
    e.preventDefault();
    if (currentColumnIndex !== null) {
      if (idx !== currentColumnIndex) {
        swapColumns(idx, currentColumnIndex);
      }
    }
  }

  function FlexTable() {
    if (tableColumns.length < 1) return null;

    const getColumnCells = (tcItems: TableColumn['items']) =>
      tcItems.map((item: string | number) => {
        return (
          <div className="flex-column-item" key={Math.random()}>
            {item}
          </div>
        );
      });

    const columns = tableColumns.map(
      ({ title, items }: TableColumn, idx: number) => {
        const className = [
          'flex-column',
          idx === dragOverColumnIndex ? 'flex-column--drag-over' : '',
          title === sortedColumnTitle ? 'flex-column--sorted' : '',
        ]
          .join(' ')
          .trim();
        return (
          <div
            className={className}
            draggable
            onDragStart={(e: React.DragEvent<HTMLTableHeaderCellElement>) =>
              handleDragStart(e, idx)
            }
            onDragOver={(e: React.DragEvent<HTMLTableHeaderCellElement>) =>
              handleDragOver(e, idx)
            }
            onDrop={(e: React.DragEvent<HTMLTableHeaderCellElement>) =>
              handleDrop(e, idx)
            }
            key={title}
          >
            <div
              role="button"
              className="flex-column-item flex-column-item--title"
              onClick={() => sortTable(title)}
              onKeyDown={() => sortTable(title)}
              tabIndex={0}
            >
              {title}
            </div>
            {getColumnCells(items)}
          </div>
        );
      }
    );

    return <div className="flex-columns">{columns}</div>;
  }

  if (allTableRows.length < 1) {
    dispatch({
      type: actionTypes.UPDATE_TABLE_ROWS,
      payload: {
        tableRows: makeTableRows(content),
      },
    });
  }

  return (
    <Fragment>
      <h1 className="title">Sortable Table</h1>
      <div className="table">
        <PaginationButtons />
        <FlexTable />
        <PaginationButtons />
        <PerPageButtons />
      </div>
    </Fragment>
  );
};

export default Table;

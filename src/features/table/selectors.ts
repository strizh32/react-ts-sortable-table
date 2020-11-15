import { TableColumn } from './types';
import { SystemState } from '../../types';
import { getTableColumnsFromTableRows } from '../../utils';

export const getPerPage = (state: SystemState) => state.table.perPage;

export const getCurrentPage = (state: SystemState) => state.table.currentPage;

export const getAllTableRows = (state: SystemState) => state.table.tableRows;

export const getSortedColumnTitle = (state: SystemState) =>
  state.table.sortedColumnTitle;

export const getPagesArray = (
  state: SystemState
): { id: number; value: 0 }[] => {
  const {
    tableRows: { length },
    perPage,
  } = state.table;
  if (length < 1) return [];

  const pagesCount = Math.ceil(length / perPage);
  return new Array(pagesCount)
    .fill(0)
    .map((item: 0, idx: number) => ({ id: idx, value: item }));
};

export const getSortOrder = (state: SystemState) => state.table.sortOrder;

export const getTableColumns = (state: SystemState): TableColumn[] => {
  const { perPage, currentPage, tableRows } = state.table;
  const startIndex = perPage * (currentPage - 1);
  const endIndex = startIndex + perPage;

  const allTableColumns = getTableColumnsFromTableRows(tableRows);

  return allTableColumns.map((tc: TableColumn) => {
    return {
      ...tc,
      items: tc.items.slice(startIndex, endIndex),
    };
  });
};

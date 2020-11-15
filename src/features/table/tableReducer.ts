import {
  UPDATE_TABLE_ROWS,
  UPDATE_PER_PAGE,
  UPDATE_CURRENT_PAGE,
  TOGGLE_SORT_ORDER,
  UPDATE_SORTED_COLUMN_TITLE,
} from './actionTypes';
import { TableActionTypes, TableState } from './types';

export const initialState: TableState = {
  perPage: 10,
  currentPage: 1,
  tableRows: [],
  sortOrder: 'ASC',
  sortedColumnTitle: null,
};

export default (
  state: TableState = initialState,
  { type, payload }: TableActionTypes
) => {
  switch (type) {
    case UPDATE_PER_PAGE:
      return { ...state, perPage: payload!.perPage };

    case UPDATE_CURRENT_PAGE:
      return { ...state, currentPage: payload!.currentPage };

    case UPDATE_TABLE_ROWS:
      return { ...state, tableRows: payload!.tableRows };

    case UPDATE_SORTED_COLUMN_TITLE:
      return { ...state, sortedColumnTitle: payload!.sortedColumnTitle };

    case TOGGLE_SORT_ORDER:
      return {
        ...state,
        sortOrder: state.sortOrder === 'ASC' ? 'DESC' : 'ASC',
      };

    default:
      return state;
  }
};

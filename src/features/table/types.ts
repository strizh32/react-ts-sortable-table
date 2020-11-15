import {
  UPDATE_CURRENT_PAGE,
  UPDATE_PER_PAGE,
  TOGGLE_SORT_ORDER,
  UPDATE_TABLE_ROWS,
  UPDATE_SORTED_COLUMN_TITLE,
} from './actionTypes';

interface Action<T> {
  type: T;
  payload?: Record<string, any>;
}

export type TableActionTypes =
  | Action<typeof UPDATE_CURRENT_PAGE>
  | Action<typeof UPDATE_PER_PAGE>
  | Action<typeof UPDATE_TABLE_ROWS>
  | Action<typeof UPDATE_SORTED_COLUMN_TITLE>
  | Action<typeof TOGGLE_SORT_ORDER>;

export const perPageValues = [5, 10, 25, 50] as const;

export interface TableState {
  perPage: typeof perPageValues[number];
  currentPage: number;
  tableRows: TableRow[];
  sortOrder: 'ASC' | 'DESC';
  sortedColumnTitle: null | OneOfKeys;
}

export interface ContentItemFromJsonFile {
  revision: number;
  revstmp: string;
  user_id: number;
  user_email: string;
  user_name: string;
  well_id: string;
  well_name: string;
  well_type: string;
  changes_summary: string;
}

export type TableColumn = {
  title: OneOfKeys;
  items: ContentItemFromJsonFile[OneOfKeys][];
};

export type OneOfKeys = keyof ContentItemFromJsonFile;

/**
 * ячейка таблицы – кортеж из 2 элементов: [ключ, значение]
 * например ['revision', 646118]
 */
export type TableRowCell = [OneOfKeys, ContentItemFromJsonFile[OneOfKeys]];
// строка таблицы
export type TableRow = TableRowCell[];

import {
  ContentItemFromJsonFile,
  TableRow,
  OneOfKeys,
  TableRowCell,
  TableColumn,
} from '../features/table/types';

/**
 * Делает из входных данных строки таблицы
 * @param items
 */
export function makeTableRows(items: ContentItemFromJsonFile[]): TableRow[] {
  const tableRows: TableRow[] = [];

  if (items.length < 1) {
    return tableRows;
  }

  return items.map(
    (item: ContentItemFromJsonFile): TableRow => {
      return Object.entries(item) as TableRow;
    }
  );
}

/**
 * Меняем местами два элемента массива
 * @param arr
 * @param indexLeft
 * @param indexRight
 */
export function swapTwoElementsOfArray<T>(
  arr: T[],
  indexLeft: number,
  indexRight: number
): T[] {
  if (arr[indexLeft] === undefined || arr[indexRight] === undefined) {
    return arr;
  }
  const arrCopy = [...arr];

  [arrCopy[indexLeft], arrCopy[indexRight]] = [
    arrCopy[indexRight],
    arrCopy[indexLeft],
  ];

  return arrCopy;
}

/**
 * Сортирует строки таблицы по ключу
 * @param actualTableRows
 * @param sortKey
 * @param sortOrder
 */
export function getSortedByKeyArray(
  actualTableRows: TableRow[],
  sortKey: OneOfKeys,
  sortOrder: 'ASC' | 'DESC'
): TableRow[] {
  const tableRowsCopy: TableRow[] = [...actualTableRows];

  tableRowsCopy.sort((a: TableRow, b: TableRow) => {
    const foundA = a.find((tc: TableRowCell) => tc[0] === sortKey);
    const foundB = b.find((tc: TableRowCell) => tc[0] === sortKey);
    if (!foundA || !foundB) {
      return 0;
    }

    const eq =
      sortOrder === 'ASC' ? foundA[1] < foundB[1] : foundA[1] > foundB[1];
    return eq ? -1 : 1;
  });

  return tableRowsCopy;
}

/**
 * Преобразует строки таблицы в колонки таблицы
 * @param tableRows
 */
export function getTableColumnsFromTableRows(
  tableRows: TableRow[]
): TableColumn[] {
  if (tableRows.length < 1) return [];
  // заголовки колонок
  const titles = tableRows[0].map((tc: TableRowCell) => tc[0]);

  // делаем колонки
  return titles.map((title: OneOfKeys) => {
    const allItems = tableRows.map((tr: TableRow) => {
      const found = tr.find((tc: TableRowCell) => tc[0] === title)!;
      return found[1];
    });
    return {
      title,
      items: allItems,
    };
  });
}

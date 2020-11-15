import {
  getSortedByKeyArray,
  makeTableRows,
  swapTwoElementsOfArray,
  getTableColumnsFromTableRows,
} from './index';
import {
  ContentItemFromJsonFile,
  TableColumn,
  TableRow,
} from '../features/table/types';

describe('swapTwoElementsOfArray', () => {
  it('makeColumns меняет местами элементы', () => {
    const testArr = [1, 2, 3, 4, 5];
    const result = swapTwoElementsOfArray(testArr, 0, 2);
    const expectedResult = [3, 2, 1, 4, 5];

    expect(result).toEqual(expectedResult);
  });

  it('makeColumns не выбрасывает исключение, если переданы некорректные индексы массива', () => {
    const testArr = [1, 2, 3, 4, 5];

    expect(() => {
      swapTwoElementsOfArray(testArr, 10, 20);
    }).not.toThrowError();
  });

  it('makeColumns вернет такой же массив, если переданы некорректные индексы массива', () => {
    const testArr = [1, 2, 3, 4, 5];
    const result = swapTwoElementsOfArray(testArr, 10, 20);
    const expectedResult = [1, 2, 3, 4, 5];

    expect(result).toEqual(expectedResult);
  });
});

describe('makeTableRows', () => {
  it('makeTableRows работает корректно', () => {
    const input: ContentItemFromJsonFile[] = [
      {
        revision: 646119,
        revstmp: '2020-08-25T09:34:32.670+0000',
        user_id: 136,
        user_email: 'am+pi@rogii.com',
        user_name: 'A M',
        well_id: 'cbaa25da-b044-4afc-b074-d56422330740',
        well_name: 'well_220-test',
        well_type: 'laterals',
        changes_summary: 'DELETE dynamic_logs "Dynamic RHOB"',
      },
      {
        revision: 646118,
        revstmp: '2020-08-25T09:34:24.067+0000',
        user_id: 136,
        user_email: 'am+pi@rogii.com',
        user_name: 'A M',
        well_id: 'cbaa25da-b044-4afc-b074-d56422330740',
        well_name: 'well_220-test',
        well_type: 'laterals',
        changes_summary: 'DELETE dynamic_logs "Dynamic Copy of GR"',
      },
    ];

    const expectedOutput: TableRow[] = [
      [
        ['revision', 646119],
        ['revstmp', '2020-08-25T09:34:32.670+0000'],
        ['user_id', 136],
        ['user_email', 'am+pi@rogii.com'],
        ['user_name', 'A M'],
        ['well_id', 'cbaa25da-b044-4afc-b074-d56422330740'],
        ['well_name', 'well_220-test'],
        ['well_type', 'laterals'],
        ['changes_summary', 'DELETE dynamic_logs "Dynamic RHOB"'],
      ],
      [
        ['revision', 646118],
        ['revstmp', '2020-08-25T09:34:24.067+0000'],
        ['user_id', 136],
        ['user_email', 'am+pi@rogii.com'],
        ['user_name', 'A M'],
        ['well_id', 'cbaa25da-b044-4afc-b074-d56422330740'],
        ['well_name', 'well_220-test'],
        ['well_type', 'laterals'],
        ['changes_summary', 'DELETE dynamic_logs "Dynamic Copy of GR"'],
      ],
    ];

    expect(makeTableRows(input)).toEqual(expectedOutput);

    expect(makeTableRows([])).toEqual([]);
  });
});

describe('getSortedByKeyArray', () => {
  const input: TableRow[] = [
    [
      ['revision', 10],
      ['revstmp', 'value'],
      ['user_id', 1],
      ['user_email', 'value'],
      ['user_name', 'Benny'],
      ['well_id', 'value'],
      ['well_name', 'value'],
      ['well_type', 'value'],
      ['changes_summary', 'value'],
    ],
    [
      ['revision', 20],
      ['revstmp', 'value'],
      ['user_id', 1],
      ['user_email', 'value'],
      ['user_name', 'Andy'],
      ['well_id', 'value'],
      ['well_name', 'value'],
      ['well_type', 'value'],
      ['changes_summary', 'value'],
    ],
    [
      ['revision', 15],
      ['revstmp', 'value'],
      ['user_id', 1],
      ['user_email', 'value'],
      ['user_name', 'Philip'],
      ['well_id', 'value'],
      ['well_name', 'value'],
      ['well_type', 'value'],
      ['changes_summary', 'value'],
    ],
  ];

  it('getSortedByKeyArray работает корректно при сравнении number ASC', () => {
    const expectedOutput: TableRow[] = [
      [
        ['revision', 10],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Benny'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
      [
        ['revision', 15],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Philip'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
      [
        ['revision', 20],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Andy'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
    ];

    expect(getSortedByKeyArray(input, 'revision', 'ASC')).toEqual(
      expectedOutput
    );
  });

  it('getSortedByKeyArray работает корректно при сравнении number DESC', () => {
    const expectedOutput: TableRow[] = [
      [
        ['revision', 20],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Andy'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
      [
        ['revision', 15],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Philip'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
      [
        ['revision', 10],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Benny'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
    ];

    expect(getSortedByKeyArray(input, 'revision', 'DESC')).toEqual(
      expectedOutput
    );
  });

  it('getSortedByKeyArray работает корректно при сравнении string ASC', () => {
    const expectedOutput: TableRow[] = [
      [
        ['revision', 20],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Andy'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
      [
        ['revision', 10],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Benny'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
      [
        ['revision', 15],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Philip'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
    ];

    expect(getSortedByKeyArray(input, 'user_name', 'ASC')).toEqual(
      expectedOutput
    );
  });

  it('getSortedByKeyArray работает корректно при сравнении string DESC', () => {
    const expectedOutput: TableRow[] = [
      [
        ['revision', 15],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Philip'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
      [
        ['revision', 10],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Benny'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
      [
        ['revision', 20],
        ['revstmp', 'value'],
        ['user_id', 1],
        ['user_email', 'value'],
        ['user_name', 'Andy'],
        ['well_id', 'value'],
        ['well_name', 'value'],
        ['well_type', 'value'],
        ['changes_summary', 'value'],
      ],
    ];

    expect(getSortedByKeyArray(input, 'user_name', 'DESC')).toEqual(
      expectedOutput
    );
  });
});

describe('getTableColumnsFromTableRows', () => {
  it('getTableColumnsFromTableRows корректно преобразует строки в колонки таблицы', () => {
    const input: TableRow[] = [
      [
        ['revision', 15],
        ['revstmp', 'value1'],
        ['user_id', 1],
        ['user_email', 'value1'],
        ['user_name', 'Philip'],
        ['well_id', 'value1'],
        ['well_name', 'value1'],
        ['well_type', 'value1'],
        ['changes_summary', 'value1'],
      ],
      [
        ['revision', 10],
        ['revstmp', 'value2'],
        ['user_id', 2],
        ['user_email', 'value2'],
        ['user_name', 'Benny'],
        ['well_id', 'value2'],
        ['well_name', 'value2'],
        ['well_type', 'value2'],
        ['changes_summary', 'value2'],
      ],
    ];

    const expectedOutput: TableColumn[] = [
      {
        title: 'revision',
        items: [15, 10],
      },
      {
        title: 'revstmp',
        items: ['value1', 'value2'],
      },
      {
        title: 'user_id',
        items: [1, 2],
      },
      {
        title: 'user_email',
        items: ['value1', 'value2'],
      },
      {
        title: 'user_name',
        items: ['Philip', 'Benny'],
      },
      {
        title: 'well_id',
        items: ['value1', 'value2'],
      },
      {
        title: 'well_name',
        items: ['value1', 'value2'],
      },
      {
        title: 'well_type',
        items: ['value1', 'value2'],
      },
      {
        title: 'changes_summary',
        items: ['value1', 'value2'],
      },
    ];

    expect(getTableColumnsFromTableRows(input)).toEqual(expectedOutput);

    expect(getTableColumnsFromTableRows([])).toEqual([]);
  });
});

import * as actionTypes from './actionTypes';
import { initialState } from './tableReducer';
import { TableReducer } from './index';
import { TableActionTypes, TableState } from './types';

describe('features > table > tableReducer', () => {
  it(`${actionTypes.UPDATE_PER_PAGE} работает корректно`, () => {
    const expectedState: TableState = {
      ...initialState,
      perPage: 5,
    };

    const action: TableActionTypes = {
      type: actionTypes.UPDATE_PER_PAGE,
      payload: {
        perPage: 5,
      },
    };

    expect(TableReducer(initialState, action)).toEqual(expectedState);
  });

  it(`${actionTypes.UPDATE_CURRENT_PAGE} работает корректно`, () => {
    const expectedState: TableState = {
      ...initialState,
      currentPage: 3,
    };

    const action: TableActionTypes = {
      type: actionTypes.UPDATE_CURRENT_PAGE,
      payload: {
        currentPage: 3,
      },
    };

    expect(TableReducer(initialState, action)).toEqual(expectedState);
  });

  it(`${actionTypes.TOGGLE_SORT_ORDER} работает корректно`, () => {
    const newInitialState1: TableState = {
      ...initialState,
      sortOrder: 'ASC',
    };

    const newInitialState2: TableState = {
      ...initialState,
      sortOrder: 'DESC',
    };

    const expectedState1: TableState = {
      ...initialState,
      sortOrder: 'DESC',
    };

    const expectedState2: TableState = {
      ...initialState,
      sortOrder: 'ASC',
    };

    const action: TableActionTypes = {
      type: actionTypes.TOGGLE_SORT_ORDER,
    };

    expect(TableReducer(newInitialState1, action)).toEqual(expectedState1);
    expect(TableReducer(newInitialState2, action)).toEqual(expectedState2);
  });

  it(`${actionTypes.UPDATE_TABLE_ROWS} работает корректно`, () => {
    const expectedState: TableState = {
      ...initialState,
      tableRows: [
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
      ],
    };

    const action: TableActionTypes = {
      type: actionTypes.UPDATE_TABLE_ROWS,
      payload: {
        tableRows: [
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
        ],
      },
    };

    expect(TableReducer(initialState, action)).toEqual(expectedState);
  });

  it(`${actionTypes.UPDATE_SORTED_COLUMN_TITLE} работает корректно`, () => {
    const expectedState: TableState = {
      ...initialState,
      sortedColumnTitle: 'revision',
    };

    const action: TableActionTypes = {
      type: actionTypes.UPDATE_SORTED_COLUMN_TITLE,
      payload: {
        sortedColumnTitle: 'revision',
      },
    };

    expect(TableReducer(initialState, action)).toEqual(expectedState);
  });
});

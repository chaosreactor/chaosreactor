import styled from 'styled-components';

import { CssBaseline } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider } from '@mui/system';
import theme from '../theme';

// When using TypeScript 4.x and above
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridEditingApi,
} from '@mui/x-data-grid';

/* eslint-disable-next-line */

const StyledTable = styled.div`
  color: pink;
`;

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const Table: typeof DataGrid = (props) => {
  const [tableData, setTableData] = useState<Array<any>>([]);

  const defaultRows: GridRowsProp[] = [];
  const defaultColumns: GridColDef[] = [
    { field: 'prompt', headerName: 'Prompt', width: 150 },
    { field: 'result', headerName: 'Result', width: 150 },
  ];

  const rowsToShow = props.rows || defaultRows;
  const columnsToShow = props.columns || defaultColumns;

  const newProps = Object.assign({}, props, {
    rows: rowsToShow,
    columns: columnsToShow,
  });

  // Fetch runs from the filesystem.
  // console.log('window.electron.storage', window.electron.storage);
  // const data = window.electron.storage?.data?.getSync('runs');

  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid {...newProps} />
      </div>
    </ThemeProvider>
  );
};

export default Table;

import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Table } from '@chaosreactoractor/ui';
import { GridEditingApi, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Doc } from '../generated/graphql';

const DOCS_QUERY = gql`
  query FindAllDocs {
    docs {
      data {
        _id
        name
        _ts
      }
    }
  }
`;

export type TableProps = GridEditingApi;

const dateToISO = (dateString: string) => {
  if (!dateString) {
    return null;
  }
  const p = dateString.toString().split(/\D/g);
  /* It's up your date on input in this case come from DD-MM-YYYY
    for MM-DD-YYY use: return [p[1], p[2], p[0]].join('-'); */
  return [p[2], p[1], p[0]].join('-');
};

export const DocList: React.FC<TableProps> = (props: TableProps) => {
  const { data, loading, error } = useQuery(DOCS_QUERY);

  if (data) console.log('data', data);
  if (error) console.log('error', error);
  if (loading) return <div>Loading...</div>;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 800 },
  ];

  const rows: GridRowsProp[] = data.docs.data.map((doc: Doc) => {
    return {
      id: doc._id,
      name: doc.name,
    };
  });

  return <Table rows={rows} columns={columns} {...props} />;
};

export default DocList;

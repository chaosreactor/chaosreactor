import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Table } from '@voxable/ui';
import { GridEditingApi, GridColDef, GridRowsProp } from '@mui/x-data-grid';

export type Doc = {
  _id: string;
  name: string;
  text: string;
};

const DOCS_QUERY = gql`
  query FindAllDocs {
    docs {
      data {
        _id
        name
        text
      }
    }
  }
`;

export type TableProps = GridEditingApi;

export const DocList: React.FC<TableProps> = (props: TableProps) => {
  const { data, loading, error } = useQuery(DOCS_QUERY);

  if (data) console.log('data', data);
  if (error) console.log('error', error);
  if (loading) return <div>Loading...</div>;

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Prompt', width: 150 },
    { field: 'date', headerName: 'Result', width: 150 },
  ];

  const rows: GridRowsProp = data.docs.data.map((doc: Doc) => {
    return {
      id: doc._id,
      title: doc.name,
      date: doc.text,
    };
  });

  return <Table rows={rows} columns={columns} {...props} />;
};

export default DocList;

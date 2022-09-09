import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export type Doc = {
  _id: string;
  name: string;
  text: string;
};

const DOCS_QUERY = gql`
  {
    docs {
      data {
        _id
        name
      }
    }
  }
`;

export interface TableProps {}

export const DocList: React.FC<TableProps> = (props: TableProps) => {
  const { data, loading, error } = useQuery(DOCS_QUERY);

  if (error) console.log('error', error);
  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {data.docs.data.map((doc: Doc) => {
        return <li key={doc._id}>{doc.name}</li>;
      })}
    </ul>
  );
};

export default DocList;

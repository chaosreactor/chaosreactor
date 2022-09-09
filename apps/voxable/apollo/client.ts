import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log('NEXT_PUBLIC_FGU_SECRET', process.env.NEXT_PUBLIC_FGU_SECRET);

export const client = new ApolloClient({
  uri: 'https://graphql.us.fauna.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_FGU_SECRET}`,
  },
  cache: new InMemoryCache(),
});

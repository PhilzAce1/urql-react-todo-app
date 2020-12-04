import { createClient } from 'urql';
export const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: {
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_FAUNA_SECRET}`,
    },
  },
});

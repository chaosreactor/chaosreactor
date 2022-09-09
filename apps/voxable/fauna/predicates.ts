import { query as q } from 'faunadb';

export const onlyDeleteByOwner = q.Query(
  q.Lambda(
    'ref',
    q.Equals(
      q.CurrentIdentity(),
      q.Select(['data', 'user'], q.Get(q.Var('ref')))
    )
  )
);

export default onlyDeleteByOwner;

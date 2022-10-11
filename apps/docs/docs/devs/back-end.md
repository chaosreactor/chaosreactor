# Back-end

## Architecture

We'll be using [Fauna DB](https://fauna.com/) as our database. It's [a document-relational database](https://docs.fauna.com/fauna/current/learn/introduction/document_relational) that supports GraphQL queries. It's also serverless, so we don't have to worry about managing a database server.

To manage the schema, migrations, and User Defined Functions, we use [Fauna GQL Upload](https://fgu-docs.com/).

Realtime collaboration is managed with [liveblocks](https://liveblocks.io/).

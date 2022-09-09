export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Time: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};

/** 'Doc' input values */
export type DocInput = {
  name: Scalars['String'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new document in the collection of 'Doc' */
  createDoc: Doc;
  /** Update an existing document in the collection of 'Doc' */
  updateDoc?: Maybe<Doc>;
  /** Delete an existing document in the collection of 'Doc' */
  deleteDoc?: Maybe<Doc>;
  /** Partially updates an existing document in the collection of 'Doc'. It only modifies the values that are specified in the arguments. During execution, it verifies that required fields are not set to 'null'. */
  partialUpdateDoc?: Maybe<Doc>;
};


export type MutationCreateDocArgs = {
  data: DocInput;
};


export type MutationUpdateDocArgs = {
  id: Scalars['ID'];
  data: DocInput;
};


export type MutationDeleteDocArgs = {
  id: Scalars['ID'];
};


export type MutationPartialUpdateDocArgs = {
  id: Scalars['ID'];
  data: PartialUpdateDocInput;
};

/** 'Doc' input values */
export type PartialUpdateDocInput = {
  name?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type Doc = {
  __typename?: 'Doc';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  name: Scalars['String'];
  text: Scalars['String'];
};

/** The pagination object for elements of type 'Doc'. */
export type DocPage = {
  __typename?: 'DocPage';
  /** The elements of type 'Doc' in this page. */
  data: Array<Maybe<Doc>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Find a document from the collection of 'Doc' by its id. */
  findDocByID?: Maybe<Doc>;
  docs: DocPage;
};


export type QueryFindDocByIdArgs = {
  id: Scalars['ID'];
};


export type QueryDocsArgs = {
  _size?: InputMaybe<Scalars['Int']>;
  _cursor?: InputMaybe<Scalars['String']>;
};

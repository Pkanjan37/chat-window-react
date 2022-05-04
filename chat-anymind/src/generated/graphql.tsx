import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time with an offset from UTC/Greenwich in the ISO-8601 calendar system using the format 1970-01-01T00:00:00Z */
  OffsetDateTime: any;
};

export enum ChannelId {
  General = 'General',
  Lgtm = 'LGTM',
  Technology = 'Technology'
}

export type Message = {
  __typename?: 'Message';
  datetime: Scalars['OffsetDateTime'];
  messageId: Scalars['String'];
  text: Scalars['String'];
  userId: Scalars['String'];
};

export type MessageEnum = {
  __typename?: 'MessageEnum';
  datetime: Scalars['OffsetDateTime'];
  messageId: Scalars['String'];
  text: Scalars['String'];
  userId: UserId;
};

export type Mutations = {
  __typename?: 'Mutations';
  /**
   *
   *   Post `messages`. return posted datetime when it succeeded
   *
   *   Code|Error
   *   ---|---
   *   500|`Couldn't save message, please retry.`
   *
   */
  MessagePost?: Maybe<MessageEnum>;
  /**
   *
   *   Post `messages`. return posted datetime when it succeeded
   *
   *   - `channelId` should be "1" or "2" or "3"
   *   - `userId` should be "Sam", "Russell", "Joyse"
   *
   *   Code|Error
   *   ---|---
   *   400|`Channel not found`
   *   500|`Couldn't save message, please retry.`
   *
   */
  postMessage?: Maybe<Message>;
};


export type MutationsMessagePostArgs = {
  channelId: ChannelId;
  text: Scalars['String'];
  userId: UserId;
};


export type MutationsPostMessageArgs = {
  channelId: Scalars['String'];
  text: Scalars['String'];
  userId: Scalars['String'];
};

export type Queries = {
  __typename?: 'Queries';
  /**
   *
   *   get latest `messages`
   *
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *
   */
  MessagesFetchLatest?: Maybe<Array<MessageEnum>>;
  /**
   *
   *   Get more `messages`.
   *
   *   - if `old` = true, you can fetch older messages than messageId
   *   - if `old` = false, you can fetch newer messages than messageId
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *   400|`Message not found`
   *
   */
  MessagesFetchMore?: Maybe<Array<MessageEnum>>;
  /**
   *
   *   get latest `messages`
   *
   *   - `channelId` should be "1" or "2" or "3"
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *   400|`Channel not found`
   *
   */
  fetchLatestMessages?: Maybe<Array<Message>>;
  /**
   *
   *   Get more `messages`.
   *
   *   - if `old` = true, you can fetch older messages than messageId
   *   - if `old` = false, you can fetch newer messages than messageId
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *   400|`Channel not found`
   *   400|`Message not found`
   *
   */
  fetchMoreMessages?: Maybe<Array<Message>>;
};


export type QueriesMessagesFetchLatestArgs = {
  channelId: ChannelId;
};


export type QueriesMessagesFetchMoreArgs = {
  channelId: ChannelId;
  messageId: Scalars['String'];
  old: Scalars['Boolean'];
};


export type QueriesFetchLatestMessagesArgs = {
  channelId: Scalars['String'];
};


export type QueriesFetchMoreMessagesArgs = {
  channelId: Scalars['String'];
  messageId: Scalars['String'];
  old: Scalars['Boolean'];
};

export enum UserId {
  Joyse = 'Joyse',
  Russell = 'Russell',
  Sam = 'Sam'
}

export type MessagePostMutationVariables = Exact<{
  channelId: ChannelId;
  text: Scalars['String'];
  userId: UserId;
}>;


export type MessagePostMutation = { __typename?: 'Mutations', MessagePost?: { __typename?: 'MessageEnum', messageId: string, text: string, datetime: any, userId: UserId } | null };

export type MessagesFetchLatestQueryVariables = Exact<{
  channelId: ChannelId;
}>;


export type MessagesFetchLatestQuery = { __typename?: 'Queries', MessagesFetchLatest?: Array<{ __typename?: 'MessageEnum', messageId: string, text: string, datetime: any, userId: UserId }> | null };

export type MessagesFetchMoreQueryVariables = Exact<{
  channelId: ChannelId;
  messageId: Scalars['String'];
  old: Scalars['Boolean'];
}>;


export type MessagesFetchMoreQuery = { __typename?: 'Queries', MessagesFetchMore?: Array<{ __typename?: 'MessageEnum', messageId: string, text: string, datetime: any, userId: UserId }> | null };


export const MessagePostDocument = gql`
    mutation MessagePost($channelId: ChannelId!, $text: String!, $userId: UserId!) {
  MessagePost(channelId: $channelId, text: $text, userId: $userId) {
    messageId
    text
    datetime
    userId
  }
}
    `;
export type MessagePostMutationFn = Apollo.MutationFunction<MessagePostMutation, MessagePostMutationVariables>;

/**
 * __useMessagePostMutation__
 *
 * To run a mutation, you first call `useMessagePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMessagePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [messagePostMutation, { data, loading, error }] = useMessagePostMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      text: // value for 'text'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMessagePostMutation(baseOptions?: Apollo.MutationHookOptions<MessagePostMutation, MessagePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MessagePostMutation, MessagePostMutationVariables>(MessagePostDocument, options);
      }
export type MessagePostMutationHookResult = ReturnType<typeof useMessagePostMutation>;
export type MessagePostMutationResult = Apollo.MutationResult<MessagePostMutation>;
export type MessagePostMutationOptions = Apollo.BaseMutationOptions<MessagePostMutation, MessagePostMutationVariables>;
export const MessagesFetchLatestDocument = gql`
    query MessagesFetchLatest($channelId: ChannelId!) {
  MessagesFetchLatest(channelId: $channelId) {
    messageId
    text
    datetime
    userId
  }
}
    `;

/**
 * __useMessagesFetchLatestQuery__
 *
 * To run a query within a React component, call `useMessagesFetchLatestQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesFetchLatestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesFetchLatestQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMessagesFetchLatestQuery(baseOptions: Apollo.QueryHookOptions<MessagesFetchLatestQuery, MessagesFetchLatestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesFetchLatestQuery, MessagesFetchLatestQueryVariables>(MessagesFetchLatestDocument, options);
      }
export function useMessagesFetchLatestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesFetchLatestQuery, MessagesFetchLatestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesFetchLatestQuery, MessagesFetchLatestQueryVariables>(MessagesFetchLatestDocument, options);
        }
export type MessagesFetchLatestQueryHookResult = ReturnType<typeof useMessagesFetchLatestQuery>;
export type MessagesFetchLatestLazyQueryHookResult = ReturnType<typeof useMessagesFetchLatestLazyQuery>;
export type MessagesFetchLatestQueryResult = Apollo.QueryResult<MessagesFetchLatestQuery, MessagesFetchLatestQueryVariables>;
export const MessagesFetchMoreDocument = gql`
    query MessagesFetchMore($channelId: ChannelId!, $messageId: String!, $old: Boolean!) {
  MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {
    messageId
    text
    datetime
    userId
  }
}
    `;

/**
 * __useMessagesFetchMoreQuery__
 *
 * To run a query within a React component, call `useMessagesFetchMoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesFetchMoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesFetchMoreQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      messageId: // value for 'messageId'
 *      old: // value for 'old'
 *   },
 * });
 */
export function useMessagesFetchMoreQuery(baseOptions: Apollo.QueryHookOptions<MessagesFetchMoreQuery, MessagesFetchMoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesFetchMoreQuery, MessagesFetchMoreQueryVariables>(MessagesFetchMoreDocument, options);
      }
export function useMessagesFetchMoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesFetchMoreQuery, MessagesFetchMoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesFetchMoreQuery, MessagesFetchMoreQueryVariables>(MessagesFetchMoreDocument, options);
        }
export type MessagesFetchMoreQueryHookResult = ReturnType<typeof useMessagesFetchMoreQuery>;
export type MessagesFetchMoreLazyQueryHookResult = ReturnType<typeof useMessagesFetchMoreLazyQuery>;
export type MessagesFetchMoreQueryResult = Apollo.QueryResult<MessagesFetchMoreQuery, MessagesFetchMoreQueryVariables>;
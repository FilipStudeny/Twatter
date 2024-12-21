import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export enum AdminRole {
  Admin = 'ADMIN',
  Administrator = 'ADMINISTRATOR',
  Moderator = 'MODERATOR',
  Supervisor = 'SUPERVISOR',
  SuperAdmin = 'SUPER_ADMIN'
}

export type CommentDetail = {
  __typename?: 'CommentDetail';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator: UserDetail;
  creatorId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  postId: Scalars['String']['output'];
  reactions: ReactionsCount;
  reactionsCount: Scalars['Float']['output'];
  reportsCount: Scalars['Float']['output'];
  strikesCount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAdminDto = {
  adminRole?: AdminRole;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateCommentDto = {
  content: Scalars['String']['input'];
};

export type CreateGroupDto = {
  interestId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateOrUpdateReactionDto = {
  reactionType: ReactionType;
  targetId: Scalars['String']['input'];
  targetType: ReactionTargetType;
};

export type CreatePostDto = {
  content: Scalars['String']['input'];
  groupId?: InputMaybe<Scalars['String']['input']>;
  interestId?: InputMaybe<Scalars['String']['input']>;
};

export type GenericResponse = {
  __typename?: 'GenericResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export enum GraphFilter {
  Day = 'Day',
  Month = 'Month',
  Year = 'Year'
}

export type GroupDetail = {
  __typename?: 'GroupDetail';
  id: Scalars['String']['output'];
  interest: InterestDetail;
  membersCount: Scalars['Int']['output'];
  moderators: Array<UserDetail>;
  name: Scalars['String']['output'];
  owner: UserDetail;
  postsCount: Scalars['Int']['output'];
  users: Array<UserDetail>;
};

export type InterestDetail = {
  __typename?: 'InterestDetail';
  groupsCount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  postsCount?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddReaction: GenericResponse;
  CreateAdmin: GenericResponse;
  CreateComment: GenericResponse;
  CreatePost: GenericResponse;
  PinComment: GenericResponse;
  SignInAdmin: SignInResponse;
  SignInUser: SignInResponse;
  SignOutUser: GenericResponse;
  SignUpUser: GenericResponse;
  createGroup: GenericResponse;
  forgotPassword: GenericResponse;
  refreshToken: SignInResponse;
  resetPassword: GenericResponse;
};


export type MutationAddReactionArgs = {
  createOrUpdateReactionData: CreateOrUpdateReactionDto;
};


export type MutationCreateAdminArgs = {
  createAdminDto: CreateAdminDto;
};


export type MutationCreateCommentArgs = {
  createComment: CreateCommentDto;
  postId: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  createPost: CreatePostDto;
};


export type MutationPinCommentArgs = {
  commentId: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};


export type MutationSignInAdminArgs = {
  signIn: SignInCredentials;
};


export type MutationSignInUserArgs = {
  signInUser: SignInCredentials;
};


export type MutationSignOutUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationSignUpUserArgs = {
  signUp: SignUpUserData;
};


export type MutationCreateGroupArgs = {
  createGroupDto: CreateGroupDto;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  resetPassword: ResetPasswordInput;
};

export type PaginatedCommentsListResponse = {
  __typename?: 'PaginatedCommentsListResponse';
  items?: Maybe<Array<CommentDetail>>;
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedInterestsListResponse = {
  __typename?: 'PaginatedInterestsListResponse';
  items?: Maybe<Array<InterestDetail>>;
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedPostsListResponse = {
  __typename?: 'PaginatedPostsListResponse';
  items?: Maybe<Array<PostDetail>>;
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedUsersResponse = {
  __typename?: 'PaginatedUsersResponse';
  items?: Maybe<Array<UserDetail>>;
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PostDetail = {
  __typename?: 'PostDetail';
  commentsCount?: Maybe<Scalars['Int']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creator: UserDetail;
  group?: Maybe<GroupDetail>;
  id: Scalars['String']['output'];
  interest?: Maybe<InterestDetail>;
  isPinned?: Maybe<Scalars['Boolean']['output']>;
  pinnedComment?: Maybe<CommentDetail>;
  reactions?: Maybe<ReactionsCount>;
  reportsCount?: Maybe<Scalars['Int']['output']>;
  strikesCount?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PostGraphDataDto = {
  __typename?: 'PostGraphDataDto';
  count: Scalars['Int']['output'];
  period: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCommentsList: PaginatedCommentsListResponse;
  getInterests: PaginatedInterestsListResponse;
  getPosts: PaginatedPostsListResponse;
  getPostsStatistics: Array<PostGraphDataDto>;
  getUsers: PaginatedUsersResponse;
  hello: Scalars['String']['output'];
};


export type QueryGetCommentsListArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetInterestsArgs = {
  interestId?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryGetPostsArgs = {
  creatorId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  interestId?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPostsStatisticsArgs = {
  filter: GraphFilter;
  weekNumber?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUsersArgs = {
  getAll?: InputMaybe<Scalars['Boolean']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum ReactionTargetType {
  Comment = 'COMMENT',
  Post = 'POST'
}

export enum ReactionType {
  Angry = 'ANGRY',
  Dislike = 'DISLIKE',
  Like = 'LIKE',
  Love = 'LOVE',
  Sad = 'SAD',
  Smile = 'SMILE'
}

export type ReactionsCount = {
  __typename?: 'ReactionsCount';
  angry: Scalars['Int']['output'];
  dislike: Scalars['Int']['output'];
  like: Scalars['Int']['output'];
  love: Scalars['Int']['output'];
  sad: Scalars['Int']['output'];
  smile: Scalars['Int']['output'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  repeatPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SignInCredentials = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordRepeat: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type SignUpUserData = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  repeatPassword: Scalars['String']['input'];
};

export type UserDetail = {
  __typename?: 'UserDetail';
  banStrikesCount: Scalars['Float']['output'];
  commentsCount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdGroupsCount: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  filedReportsCount: Scalars['Float']['output'];
  firstName: Scalars['String']['output'];
  friendsCount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  joinedGroupsCount: Scalars['Float']['output'];
  lastName: Scalars['String']['output'];
  likesCount: Scalars['Float']['output'];
  moderatedGroupsCount: Scalars['Float']['output'];
  postsCount: Scalars['Float']['output'];
  receivedReportsCount: Scalars['Float']['output'];
  sentNotificationsCount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type CreateAdminMutationVariables = Exact<{
  createAdmin: CreateAdminDto;
}>;


export type CreateAdminMutation = { __typename?: 'Mutation', CreateAdmin: { __typename?: 'GenericResponse', message?: string | null } };

export type SignInAdminMutationVariables = Exact<{
  signIn: SignInCredentials;
}>;


export type SignInAdminMutation = { __typename?: 'Mutation', SignInAdmin: { __typename?: 'SignInResponse', accessToken: string, refreshToken: string } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'SignInResponse', accessToken: string, refreshToken: string } };

export type CreateCommentMutationVariables = Exact<{
  createComment: CreateCommentDto;
  postId: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', CreateComment: { __typename?: 'GenericResponse', message?: string | null } };

export type PinCommentMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  commentId: Scalars['String']['input'];
}>;


export type PinCommentMutation = { __typename?: 'Mutation', PinComment: { __typename?: 'GenericResponse', message?: string | null } };

export type CreateGroupMutationVariables = Exact<{
  createGroupDto: CreateGroupDto;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'GenericResponse', message?: string | null } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostDto;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'GenericResponse', message?: string | null } };

export type GetPostStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostStatisticsQuery = { __typename?: 'Query', getPostsStatistics: Array<{ __typename?: 'PostGraphDataDto', period: string, count: number }> };

export type GetPostsListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostsListQuery = { __typename?: 'Query', getPosts: { __typename?: 'PaginatedPostsListResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'PostDetail', id: string, content: string, commentsCount?: number | null, createdAt: any, creator: { __typename?: 'UserDetail', id: string, username?: string | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, sad: number, smile: number, angry: number, love: number } | null, interest?: { __typename?: 'InterestDetail', id?: string | null, name?: string | null } | null, group?: { __typename?: 'GroupDetail', id: string, name: string } | null }> | null } };

export type GetAdministrationPostsListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAdministrationPostsListQuery = { __typename?: 'Query', getPosts: { __typename?: 'PaginatedPostsListResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'PostDetail', id: string, content: string, commentsCount?: number | null, createdAt: any, updatedAt: any, reportsCount?: number | null, strikesCount?: number | null, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName: string, lastName: string }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, sad: number, smile: number, angry: number, love: number } | null, interest?: { __typename?: 'InterestDetail', id?: string | null, name?: string | null } | null, group?: { __typename?: 'GroupDetail', id: string, name: string } | null, pinnedComment?: { __typename?: 'CommentDetail', id: string, content: string, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName: string, lastName: string } } | null }> | null } };



export const CreateAdminDocument = /*#__PURE__*/ `
    mutation CreateAdmin($createAdmin: CreateAdminDto!) {
  CreateAdmin(createAdminDto: $createAdmin) {
    message
  }
}
    `;

export const useCreateAdminMutation = <
      TError = any,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAdminMutation, TError, CreateAdminMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateAdminMutation, TError, CreateAdminMutationVariables, TContext>(
      {
    mutationKey: ['CreateAdmin'],
    mutationFn: (variables?: CreateAdminMutationVariables) => fetcher<CreateAdminMutation, CreateAdminMutationVariables>(client, CreateAdminDocument, variables, headers)(),
    ...options
  }
    )};

useCreateAdminMutation.getKey = () => ['CreateAdmin'];


useCreateAdminMutation.fetcher = (client: GraphQLClient, variables: CreateAdminMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateAdminMutation, CreateAdminMutationVariables>(client, CreateAdminDocument, variables, headers);

export const SignInAdminDocument = /*#__PURE__*/ `
    mutation SignInAdmin($signIn: SignInCredentials!) {
  SignInAdmin(signIn: $signIn) {
    accessToken
    refreshToken
  }
}
    `;

export const useSignInAdminMutation = <
      TError = any,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignInAdminMutation, TError, SignInAdminMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<SignInAdminMutation, TError, SignInAdminMutationVariables, TContext>(
      {
    mutationKey: ['SignInAdmin'],
    mutationFn: (variables?: SignInAdminMutationVariables) => fetcher<SignInAdminMutation, SignInAdminMutationVariables>(client, SignInAdminDocument, variables, headers)(),
    ...options
  }
    )};

useSignInAdminMutation.getKey = () => ['SignInAdmin'];


useSignInAdminMutation.fetcher = (client: GraphQLClient, variables: SignInAdminMutationVariables, headers?: RequestInit['headers']) => fetcher<SignInAdminMutation, SignInAdminMutationVariables>(client, SignInAdminDocument, variables, headers);

export const RefreshTokenDocument = /*#__PURE__*/ `
    mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;

export const useRefreshTokenMutation = <
      TError = any,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>(
      {
    mutationKey: ['RefreshToken'],
    mutationFn: (variables?: RefreshTokenMutationVariables) => fetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(client, RefreshTokenDocument, variables, headers)(),
    ...options
  }
    )};

useRefreshTokenMutation.getKey = () => ['RefreshToken'];


useRefreshTokenMutation.fetcher = (client: GraphQLClient, variables: RefreshTokenMutationVariables, headers?: RequestInit['headers']) => fetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(client, RefreshTokenDocument, variables, headers);

export const CreateCommentDocument = /*#__PURE__*/ `
    mutation CreateComment($createComment: CreateCommentDto!, $postId: String!) {
  CreateComment(createComment: $createComment, postId: $postId) {
    message
  }
}
    `;

export const useCreateCommentMutation = <
      TError = any,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      {
    mutationKey: ['CreateComment'],
    mutationFn: (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
    ...options
  }
    )};

useCreateCommentMutation.getKey = () => ['CreateComment'];


useCreateCommentMutation.fetcher = (client: GraphQLClient, variables: CreateCommentMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers);

export const PinCommentDocument = /*#__PURE__*/ `
    mutation PinComment($postId: String!, $commentId: String!) {
  PinComment(postId: $postId, commentId: $commentId) {
    message
  }
}
    `;

export const usePinCommentMutation = <
      TError = any,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PinCommentMutation, TError, PinCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<PinCommentMutation, TError, PinCommentMutationVariables, TContext>(
      {
    mutationKey: ['PinComment'],
    mutationFn: (variables?: PinCommentMutationVariables) => fetcher<PinCommentMutation, PinCommentMutationVariables>(client, PinCommentDocument, variables, headers)(),
    ...options
  }
    )};

usePinCommentMutation.getKey = () => ['PinComment'];


usePinCommentMutation.fetcher = (client: GraphQLClient, variables: PinCommentMutationVariables, headers?: RequestInit['headers']) => fetcher<PinCommentMutation, PinCommentMutationVariables>(client, PinCommentDocument, variables, headers);

export const CreateGroupDocument = /*#__PURE__*/ `
    mutation CreateGroup($createGroupDto: CreateGroupDto!) {
  createGroup(createGroupDto: $createGroupDto) {
    message
  }
}
    `;

export const useCreateGroupMutation = <
      TError = any,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateGroupMutation, TError, CreateGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateGroupMutation, TError, CreateGroupMutationVariables, TContext>(
      {
    mutationKey: ['CreateGroup'],
    mutationFn: (variables?: CreateGroupMutationVariables) => fetcher<CreateGroupMutation, CreateGroupMutationVariables>(client, CreateGroupDocument, variables, headers)(),
    ...options
  }
    )};

useCreateGroupMutation.getKey = () => ['CreateGroup'];


useCreateGroupMutation.fetcher = (client: GraphQLClient, variables: CreateGroupMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateGroupMutation, CreateGroupMutationVariables>(client, CreateGroupDocument, variables, headers);

export const CreatePostDocument = /*#__PURE__*/ `
    mutation CreatePost($input: CreatePostDto!) {
  CreatePost(createPost: $input) {
    message
  }
}
    `;

export const useCreatePostMutation = <
      TError = any,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      {
    mutationKey: ['CreatePost'],
    mutationFn: (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
    ...options
  }
    )};

useCreatePostMutation.getKey = () => ['CreatePost'];


useCreatePostMutation.fetcher = (client: GraphQLClient, variables: CreatePostMutationVariables, headers?: RequestInit['headers']) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers);

export const GetPostStatisticsDocument = /*#__PURE__*/ `
    query GetPostStatistics {
  getPostsStatistics(filter: Month, year: 2024) {
    period
    count
  }
}
    `;

export const useGetPostStatisticsQuery = <
      TData = GetPostStatisticsQuery,
      TError = any
    >(
      client: GraphQLClient,
      variables?: GetPostStatisticsQueryVariables,
      options?: Omit<UseQueryOptions<GetPostStatisticsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostStatisticsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetPostStatisticsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPostStatistics'] : ['GetPostStatistics', variables],
    queryFn: fetcher<GetPostStatisticsQuery, GetPostStatisticsQueryVariables>(client, GetPostStatisticsDocument, variables, headers),
    ...options
  }
    )};

useGetPostStatisticsQuery.document = GetPostStatisticsDocument;

useGetPostStatisticsQuery.getKey = (variables?: GetPostStatisticsQueryVariables) => variables === undefined ? ['GetPostStatistics'] : ['GetPostStatistics', variables];

export const useInfiniteGetPostStatisticsQuery = <
      TData = InfiniteData<GetPostStatisticsQuery>,
      TError = any
    >(
      client: GraphQLClient,
      variables: GetPostStatisticsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPostStatisticsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPostStatisticsQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<GetPostStatisticsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPostStatistics.infinite'] : ['GetPostStatistics.infinite', variables],
      queryFn: (metaData) => fetcher<GetPostStatisticsQuery, GetPostStatisticsQueryVariables>(client, GetPostStatisticsDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPostStatisticsQuery.getKey = (variables?: GetPostStatisticsQueryVariables) => variables === undefined ? ['GetPostStatistics.infinite'] : ['GetPostStatistics.infinite', variables];


useGetPostStatisticsQuery.fetcher = (client: GraphQLClient, variables?: GetPostStatisticsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostStatisticsQuery, GetPostStatisticsQueryVariables>(client, GetPostStatisticsDocument, variables, headers);

export const GetPostsListDocument = /*#__PURE__*/ `
    query GetPostsList($page: Int = 1, $limit: Int = 10) {
  getPosts(page: $page, limit: $limit) {
    items {
      id
      content
      creator {
        id
        username
      }
      reactions {
        like
        dislike
        sad
        smile
        angry
        love
      }
      interest {
        id
        name
      }
      group {
        id
        name
      }
      commentsCount
      createdAt
    }
    total
    page
    limit
  }
}
    `;

export const useGetPostsListQuery = <
      TData = GetPostsListQuery,
      TError = any
    >(
      client: GraphQLClient,
      variables?: GetPostsListQueryVariables,
      options?: Omit<UseQueryOptions<GetPostsListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostsListQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
      console.log("adsasd")
    return useQuery<GetPostsListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPostsList'] : ['GetPostsList', variables],
    queryFn: fetcher<GetPostsListQuery, GetPostsListQueryVariables>(client, GetPostsListDocument, variables, headers),
    ...options
  }
    )};

useGetPostsListQuery.document = GetPostsListDocument;

useGetPostsListQuery.getKey = (variables?: GetPostsListQueryVariables) => variables === undefined ? ['GetPostsList'] : ['GetPostsList', variables];

export const useInfiniteGetPostsListQuery = <
      TData = InfiniteData<GetPostsListQuery>,
      TError = any
    >(
      client: GraphQLClient,
      variables: GetPostsListQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPostsListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPostsListQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<GetPostsListQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPostsList.infinite'] : ['GetPostsList.infinite', variables],
      queryFn: (metaData) => fetcher<GetPostsListQuery, GetPostsListQueryVariables>(client, GetPostsListDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPostsListQuery.getKey = (variables?: GetPostsListQueryVariables) => variables === undefined ? ['GetPostsList.infinite'] : ['GetPostsList.infinite', variables];


useGetPostsListQuery.fetcher = (client: GraphQLClient, variables?: GetPostsListQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostsListQuery, GetPostsListQueryVariables>(client, GetPostsListDocument, variables, headers);

export const GetAdministrationPostsListDocument = /*#__PURE__*/ `
    query GetAdministrationPostsList($page: Int = 1, $limit: Int = 10) {
  getPosts(page: $page, limit: $limit) {
    items {
      id
      content
      creator {
        id
        username
        firstName
        lastName
      }
      reactions {
        like
        dislike
        sad
        smile
        angry
        love
      }
      interest {
        id
        name
      }
      group {
        id
        name
      }
      pinnedComment {
        id
        content
        creator {
          id
          username
          firstName
          lastName
        }
      }
      commentsCount
      createdAt
      updatedAt
      reportsCount
      strikesCount
    }
    total
    page
    limit
  }
}
    `;

export const useGetAdministrationPostsListQuery = <
      TData = GetAdministrationPostsListQuery,
      TError = any
    >(
      client: GraphQLClient,
      variables?: GetAdministrationPostsListQueryVariables,
      options?: Omit<UseQueryOptions<GetAdministrationPostsListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdministrationPostsListQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetAdministrationPostsListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAdministrationPostsList'] : ['GetAdministrationPostsList', variables],
    queryFn: fetcher<GetAdministrationPostsListQuery, GetAdministrationPostsListQueryVariables>(client, GetAdministrationPostsListDocument, variables, headers),
    ...options
  }
    )};

useGetAdministrationPostsListQuery.document = GetAdministrationPostsListDocument;

useGetAdministrationPostsListQuery.getKey = (variables?: GetAdministrationPostsListQueryVariables) => variables === undefined ? ['GetAdministrationPostsList'] : ['GetAdministrationPostsList', variables];

export const useInfiniteGetAdministrationPostsListQuery = <
      TData = InfiniteData<GetAdministrationPostsListQuery>,
      TError = any
    >(
      client: GraphQLClient,
      variables: GetAdministrationPostsListQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAdministrationPostsListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAdministrationPostsListQuery, TError, TData>['queryKey'] },
      headers?: RequestInit['headers']
    ) => {
    
    return useInfiniteQuery<GetAdministrationPostsListQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAdministrationPostsList.infinite'] : ['GetAdministrationPostsList.infinite', variables],
      queryFn: (metaData) => fetcher<GetAdministrationPostsListQuery, GetAdministrationPostsListQueryVariables>(client, GetAdministrationPostsListDocument, {...variables, ...(metaData.pageParam ?? {})}, headers)(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAdministrationPostsListQuery.getKey = (variables?: GetAdministrationPostsListQueryVariables) => variables === undefined ? ['GetAdministrationPostsList.infinite'] : ['GetAdministrationPostsList.infinite', variables];


useGetAdministrationPostsListQuery.fetcher = (client: GraphQLClient, variables?: GetAdministrationPostsListQueryVariables, headers?: RequestInit['headers']) => fetcher<GetAdministrationPostsListQuery, GetAdministrationPostsListQueryVariables>(client, GetAdministrationPostsListDocument, variables, headers);

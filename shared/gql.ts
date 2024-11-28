import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Different types of roles available */
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
  reactionsCount: Scalars['Int']['output'];
  reportsCount: Scalars['Int']['output'];
  strikesCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CommentDto = {
  __typename?: 'CommentDto';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creatorName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
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

export type CreateUserDto = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  repeatPassword: Scalars['String']['input'];
};

export type GenericResponse = {
  __typename?: 'GenericResponse';
  message?: Maybe<Scalars['String']['output']>;
};

/** Filter options for the graph data */
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
  posts: Array<PostDetail>;
  postsCount: Scalars['Int']['output'];
  users: Array<UserDetail>;
};

export type InterestDetail = {
  __typename?: 'InterestDetail';
  groups?: Maybe<Array<GroupDetail>>;
  groupsCount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<PostDetail>>;
  postsCount?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddReaction: GenericResponse;
  CreateAdmin: GenericResponse;
  CreateComment: GenericResponse;
  CreatePost: GenericResponse;
  CreateUser: GenericResponse;
  PinComment: GenericResponse;
  SignInAdmin: SignInResponse;
  SignInUser: SignInResponse;
  createGroup: GenericResponse;
  logout: GenericResponse;
  refreshToken: SignInResponse;
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


export type MutationCreateUserArgs = {
  createUser: CreateUserDto;
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


export type MutationCreateGroupArgs = {
  createGroupDto: CreateGroupDto;
};


export type MutationLogoutArgs = {
  userId: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};

export type PaginatedCommentsResponse = {
  __typename?: 'PaginatedCommentsResponse';
  items?: Maybe<Array<CommentDto>>;
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
  GetPostComments: PaginatedCommentsResponse;
  GetPostDetail: PostDetail;
  getPosts: PaginatedPostsListResponse;
  getPostsStatistics: Array<PostGraphDataDto>;
  getUsers: PaginatedUsersResponse;
  hello: Scalars['String']['output'];
  user: UserDetail;
};


export type QueryGetPostCommentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  postId: Scalars['String']['input'];
};


export type QueryGetPostDetailArgs = {
  postId: Scalars['String']['input'];
};


export type QueryGetPostsArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryGetPostsStatisticsArgs = {
  filter: GraphFilter;
  weekNumber?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUsersArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Target type for the reaction, either POST or COMMENT */
export enum ReactionTargetType {
  Comment = 'COMMENT',
  Post = 'POST'
}

/** Different types of reactions available */
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

export type UserDetail = {
  __typename?: 'UserDetail';
  banStrikesCount?: Maybe<Scalars['Int']['output']>;
  commentsCount?: Maybe<Scalars['Int']['output']>;
  createdGroupsCount?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  filedReportsCount?: Maybe<Scalars['Int']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  friendsCount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  joinedGroupsCount?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  moderatedGroupsCount?: Maybe<Scalars['Int']['output']>;
  postsCount?: Maybe<Scalars['Int']['output']>;
  receivedReportsCount?: Maybe<Scalars['Int']['output']>;
  sentNotificationsCount?: Maybe<Scalars['Int']['output']>;
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

export type SignInUserMutationVariables = Exact<{
  signInUser: SignInCredentials;
}>;


export type SignInUserMutation = { __typename?: 'Mutation', SignInUser: { __typename?: 'SignInResponse', accessToken: string, refreshToken: string } };

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

export type GetPostCommentsQueryVariables = Exact<{
  postId: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetPostCommentsQuery = { __typename?: 'Query', GetPostComments: { __typename?: 'PaginatedCommentsResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'CommentDto', id: string, content: string, creatorName: string, createdAt: any }> | null } };

export type CreateGroupMutationVariables = Exact<{
  createGroupDto: CreateGroupDto;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'GenericResponse', message?: string | null } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostDto;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'GenericResponse', message?: string | null } };

export type GetPostDetailQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type GetPostDetailQuery = { __typename?: 'Query', GetPostDetail: { __typename?: 'PostDetail', id: string, content: string, creator: { __typename?: 'UserDetail', id?: string | null, email?: string | null, likesCount?: number | null, commentsCount?: number | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null, interest?: { __typename?: 'InterestDetail', id?: string | null, name?: string | null, postsCount?: number | null } | null, group?: { __typename?: 'GroupDetail', id: string, name: string, postsCount: number } | null } };

export type GetPostStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostStatisticsQuery = { __typename?: 'Query', getPostsStatistics: Array<{ __typename?: 'PostGraphDataDto', period: string, count: number }> };

export type GetPostsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PaginatedPostsListResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'PostDetail', id: string, content: string, commentsCount?: number | null, createdAt: any, creator: { __typename?: 'UserDetail', id?: string | null, username?: string | null, postsCount?: number | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, sad: number, smile: number, angry: number, love: number } | null, interest?: { __typename?: 'InterestDetail', name?: string | null } | null }> | null } };

export type GetPostsDetailsListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPostsDetailsListQuery = { __typename?: 'Query', getPosts: { __typename?: 'PaginatedPostsListResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'PostDetail', id: string, content: string, commentsCount?: number | null, createdAt: any, creator: { __typename?: 'UserDetail', id?: string | null, username?: string | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, sad: number, smile: number, angry: number, love: number } | null, interest?: { __typename?: 'InterestDetail', name?: string | null } | null, group?: { __typename?: 'GroupDetail', id: string, name: string } | null }> | null } };

export type AddReactionMutationVariables = Exact<{
  createOrUpdateReactionData: CreateOrUpdateReactionDto;
}>;


export type AddReactionMutation = { __typename?: 'Mutation', AddReaction: { __typename?: 'GenericResponse', message?: string | null } };

export type CreateUserMutationVariables = Exact<{
  createUser: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', CreateUser: { __typename?: 'GenericResponse', message?: string | null } };

export type GetUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserDetail', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null } };

export type GetUsersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'UserDetail', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null }> | null } };



export const CreateAdminDocument = `
    mutation CreateAdmin($createAdmin: CreateAdminDto!) {
  CreateAdmin(createAdminDto: $createAdmin) {
    message
  }
}
    `;

export const useCreateAdminMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAdminMutation, TError, CreateAdminMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateAdminMutation, TError, CreateAdminMutationVariables, TContext>(
      ['CreateAdmin'],
      (variables?: CreateAdminMutationVariables) => fetcher<CreateAdminMutation, CreateAdminMutationVariables>(client, CreateAdminDocument, variables, headers)(),
      options
    )};


useCreateAdminMutation.fetcher = (client: GraphQLClient, variables: CreateAdminMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateAdminMutation, CreateAdminMutationVariables>(client, CreateAdminDocument, variables, headers);

export const SignInAdminDocument = `
    mutation SignInAdmin($signIn: SignInCredentials!) {
  SignInAdmin(signIn: $signIn) {
    accessToken
    refreshToken
  }
}
    `;

export const useSignInAdminMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignInAdminMutation, TError, SignInAdminMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<SignInAdminMutation, TError, SignInAdminMutationVariables, TContext>(
      ['SignInAdmin'],
      (variables?: SignInAdminMutationVariables) => fetcher<SignInAdminMutation, SignInAdminMutationVariables>(client, SignInAdminDocument, variables, headers)(),
      options
    )};


useSignInAdminMutation.fetcher = (client: GraphQLClient, variables: SignInAdminMutationVariables, headers?: RequestInit['headers']) => fetcher<SignInAdminMutation, SignInAdminMutationVariables>(client, SignInAdminDocument, variables, headers);

export const RefreshTokenDocument = `
    mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;

export const useRefreshTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>(
      ['RefreshToken'],
      (variables?: RefreshTokenMutationVariables) => fetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(client, RefreshTokenDocument, variables, headers)(),
      options
    )};


useRefreshTokenMutation.fetcher = (client: GraphQLClient, variables: RefreshTokenMutationVariables, headers?: RequestInit['headers']) => fetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(client, RefreshTokenDocument, variables, headers);

export const SignInUserDocument = `
    mutation SignInUser($signInUser: SignInCredentials!) {
  SignInUser(signInUser: $signInUser) {
    accessToken
    refreshToken
  }
}
    `;

export const useSignInUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignInUserMutation, TError, SignInUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<SignInUserMutation, TError, SignInUserMutationVariables, TContext>(
      ['SignInUser'],
      (variables?: SignInUserMutationVariables) => fetcher<SignInUserMutation, SignInUserMutationVariables>(client, SignInUserDocument, variables, headers)(),
      options
    )};


useSignInUserMutation.fetcher = (client: GraphQLClient, variables: SignInUserMutationVariables, headers?: RequestInit['headers']) => fetcher<SignInUserMutation, SignInUserMutationVariables>(client, SignInUserDocument, variables, headers);

export const CreateCommentDocument = `
    mutation CreateComment($createComment: CreateCommentDto!, $postId: String!) {
  CreateComment(createComment: $createComment, postId: $postId) {
    message
  }
}
    `;

export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['CreateComment'],
      (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers)(),
      options
    )};


useCreateCommentMutation.fetcher = (client: GraphQLClient, variables: CreateCommentMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(client, CreateCommentDocument, variables, headers);

export const PinCommentDocument = `
    mutation PinComment($postId: String!, $commentId: String!) {
  PinComment(postId: $postId, commentId: $commentId) {
    message
  }
}
    `;

export const usePinCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PinCommentMutation, TError, PinCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<PinCommentMutation, TError, PinCommentMutationVariables, TContext>(
      ['PinComment'],
      (variables?: PinCommentMutationVariables) => fetcher<PinCommentMutation, PinCommentMutationVariables>(client, PinCommentDocument, variables, headers)(),
      options
    )};


usePinCommentMutation.fetcher = (client: GraphQLClient, variables: PinCommentMutationVariables, headers?: RequestInit['headers']) => fetcher<PinCommentMutation, PinCommentMutationVariables>(client, PinCommentDocument, variables, headers);

export const GetPostCommentsDocument = `
    query GetPostComments($postId: String!, $page: Int!, $limit: Int!) {
  GetPostComments(postId: $postId, page: $page, limit: $limit) {
    items {
      id
      content
      creatorName
      createdAt
    }
    total
    page
    limit
  }
}
    `;

export const useGetPostCommentsQuery = <
      TData = GetPostCommentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostCommentsQueryVariables,
      options?: UseQueryOptions<GetPostCommentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetPostCommentsQuery, TError, TData>(
      ['GetPostComments', variables],
      fetcher<GetPostCommentsQuery, GetPostCommentsQueryVariables>(client, GetPostCommentsDocument, variables, headers),
      options
    )};

useGetPostCommentsQuery.getKey = (variables: GetPostCommentsQueryVariables) => ['GetPostComments', variables];


useGetPostCommentsQuery.fetcher = (client: GraphQLClient, variables: GetPostCommentsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostCommentsQuery, GetPostCommentsQueryVariables>(client, GetPostCommentsDocument, variables, headers);

export const CreateGroupDocument = `
    mutation CreateGroup($createGroupDto: CreateGroupDto!) {
  createGroup(createGroupDto: $createGroupDto) {
    message
  }
}
    `;

export const useCreateGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateGroupMutation, TError, CreateGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateGroupMutation, TError, CreateGroupMutationVariables, TContext>(
      ['CreateGroup'],
      (variables?: CreateGroupMutationVariables) => fetcher<CreateGroupMutation, CreateGroupMutationVariables>(client, CreateGroupDocument, variables, headers)(),
      options
    )};


useCreateGroupMutation.fetcher = (client: GraphQLClient, variables: CreateGroupMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateGroupMutation, CreateGroupMutationVariables>(client, CreateGroupDocument, variables, headers);

export const CreatePostDocument = `
    mutation CreatePost($input: CreatePostDto!) {
  CreatePost(createPost: $input) {
    message
  }
}
    `;

export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['CreatePost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    )};


useCreatePostMutation.fetcher = (client: GraphQLClient, variables: CreatePostMutationVariables, headers?: RequestInit['headers']) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers);

export const GetPostDetailDocument = `
    query GetPostDetail($postId: String!) {
  GetPostDetail(postId: $postId) {
    id
    content
    creator {
      id
      email
      likesCount
      commentsCount
    }
    reactions {
      like
      dislike
      smile
      angry
      sad
      love
    }
    interest {
      id
      name
      postsCount
    }
    group {
      id
      name
      postsCount
    }
  }
}
    `;

export const useGetPostDetailQuery = <
      TData = GetPostDetailQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostDetailQueryVariables,
      options?: UseQueryOptions<GetPostDetailQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetPostDetailQuery, TError, TData>(
      ['GetPostDetail', variables],
      fetcher<GetPostDetailQuery, GetPostDetailQueryVariables>(client, GetPostDetailDocument, variables, headers),
      options
    )};

useGetPostDetailQuery.getKey = (variables: GetPostDetailQueryVariables) => ['GetPostDetail', variables];


useGetPostDetailQuery.fetcher = (client: GraphQLClient, variables: GetPostDetailQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostDetailQuery, GetPostDetailQueryVariables>(client, GetPostDetailDocument, variables, headers);

export const GetPostStatisticsDocument = `
    query GetPostStatistics {
  getPostsStatistics(filter: Month, year: 2024) {
    period
    count
  }
}
    `;

export const useGetPostStatisticsQuery = <
      TData = GetPostStatisticsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetPostStatisticsQueryVariables,
      options?: UseQueryOptions<GetPostStatisticsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetPostStatisticsQuery, TError, TData>(
      variables === undefined ? ['GetPostStatistics'] : ['GetPostStatistics', variables],
      fetcher<GetPostStatisticsQuery, GetPostStatisticsQueryVariables>(client, GetPostStatisticsDocument, variables, headers),
      options
    )};

useGetPostStatisticsQuery.getKey = (variables?: GetPostStatisticsQueryVariables) => variables === undefined ? ['GetPostStatistics'] : ['GetPostStatistics', variables];


useGetPostStatisticsQuery.fetcher = (client: GraphQLClient, variables?: GetPostStatisticsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostStatisticsQuery, GetPostStatisticsQueryVariables>(client, GetPostStatisticsDocument, variables, headers);

export const GetPostsDocument = `
    query GetPosts($page: Int = 1, $limit: Int = 10) {
  getPosts(page: $page, limit: $limit) {
    items {
      id
      content
      creator {
        id
        username
        postsCount
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

export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetPostsQueryVariables,
      options?: UseQueryOptions<GetPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetPostsQuery, TError, TData>(
      variables === undefined ? ['GetPosts'] : ['GetPosts', variables],
      fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers),
      options
    )};

useGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) => variables === undefined ? ['GetPosts'] : ['GetPosts', variables];


useGetPostsQuery.fetcher = (client: GraphQLClient, variables?: GetPostsQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers);

export const GetPostsDetailsListDocument = `
    query GetPostsDetailsList($page: Int = 1, $limit: Int = 10) {
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

export const useGetPostsDetailsListQuery = <
      TData = GetPostsDetailsListQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetPostsDetailsListQueryVariables,
      options?: UseQueryOptions<GetPostsDetailsListQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetPostsDetailsListQuery, TError, TData>(
      variables === undefined ? ['GetPostsDetailsList'] : ['GetPostsDetailsList', variables],
      fetcher<GetPostsDetailsListQuery, GetPostsDetailsListQueryVariables>(client, GetPostsDetailsListDocument, variables, headers),
      options
    )};

useGetPostsDetailsListQuery.getKey = (variables?: GetPostsDetailsListQueryVariables) => variables === undefined ? ['GetPostsDetailsList'] : ['GetPostsDetailsList', variables];


useGetPostsDetailsListQuery.fetcher = (client: GraphQLClient, variables?: GetPostsDetailsListQueryVariables, headers?: RequestInit['headers']) => fetcher<GetPostsDetailsListQuery, GetPostsDetailsListQueryVariables>(client, GetPostsDetailsListDocument, variables, headers);

export const AddReactionDocument = `
    mutation AddReaction($createOrUpdateReactionData: CreateOrUpdateReactionDto!) {
  AddReaction(createOrUpdateReactionData: $createOrUpdateReactionData) {
    message
  }
}
    `;

export const useAddReactionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddReactionMutation, TError, AddReactionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<AddReactionMutation, TError, AddReactionMutationVariables, TContext>(
      ['AddReaction'],
      (variables?: AddReactionMutationVariables) => fetcher<AddReactionMutation, AddReactionMutationVariables>(client, AddReactionDocument, variables, headers)(),
      options
    )};


useAddReactionMutation.fetcher = (client: GraphQLClient, variables: AddReactionMutationVariables, headers?: RequestInit['headers']) => fetcher<AddReactionMutation, AddReactionMutationVariables>(client, AddReactionDocument, variables, headers);

export const CreateUserDocument = `
    mutation CreateUser($createUser: CreateUserDto!) {
  CreateUser(createUser: $createUser) {
    message
  }
}
    `;

export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) => {
    
    return useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers)(),
      options
    )};


useCreateUserMutation.fetcher = (client: GraphQLClient, variables: CreateUserMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers);

export const GetUserDocument = `
    query GetUser($id: ID, $username: String, $firstName: String, $lastName: String) {
  user(id: $id, username: $username, firstName: $firstName, lastName: $lastName) {
    id
    email
    firstName
    lastName
  }
}
    `;

export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUserQueryVariables,
      options?: UseQueryOptions<GetUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetUserQuery, TError, TData>(
      variables === undefined ? ['GetUser'] : ['GetUser', variables],
      fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers),
      options
    )};

useGetUserQuery.getKey = (variables?: GetUserQueryVariables) => variables === undefined ? ['GetUser'] : ['GetUser', variables];


useGetUserQuery.fetcher = (client: GraphQLClient, variables?: GetUserQueryVariables, headers?: RequestInit['headers']) => fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers);

export const GetUsersDocument = `
    query GetUsers($page: Int = 1, $limit: Int = 10) {
  getUsers(page: $page, limit: $limit) {
    items {
      id
      email
      firstName
      lastName
    }
    total
    page
    limit
  }
}
    `;

export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) => {
    
    return useQuery<GetUsersQuery, TError, TData>(
      variables === undefined ? ['GetUsers'] : ['GetUsers', variables],
      fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, variables, headers),
      options
    )};

useGetUsersQuery.getKey = (variables?: GetUsersQueryVariables) => variables === undefined ? ['GetUsers'] : ['GetUsers', variables];


useGetUsersQuery.fetcher = (client: GraphQLClient, variables?: GetUsersQueryVariables, headers?: RequestInit['headers']) => fetcher<GetUsersQuery, GetUsersQueryVariables>(client, GetUsersDocument, variables, headers);

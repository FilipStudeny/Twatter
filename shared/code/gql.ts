import { GraphQLResponse } from "graphql-request/dist/types";
import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { fetcher } from './fetcher.client.ts';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  reactions?: Maybe<ReactionsCount>;
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

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'GenericResponse', message?: string | null } };

export type SignOutUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type SignOutUserMutation = { __typename?: 'Mutation', SignOutUser: { __typename?: 'GenericResponse', message?: string | null } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'SignInResponse', accessToken: string, refreshToken: string } };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  repeatPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'GenericResponse', message?: string | null } };

export type SignInUserMutationVariables = Exact<{
  signInUser: SignInCredentials;
}>;


export type SignInUserMutation = { __typename?: 'Mutation', SignInUser: { __typename?: 'SignInResponse', accessToken: string, refreshToken: string } };

export type SignUpMutationVariables = Exact<{
  createUser: SignUpUserData;
}>;


export type SignUpMutation = { __typename?: 'Mutation', SignUpUser: { __typename?: 'GenericResponse', message?: string | null } };

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

export type GetCommentsByPostIdQueryVariables = Exact<{
  postId: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetCommentsByPostIdQuery = { __typename?: 'Query', getCommentsList: { __typename?: 'PaginatedCommentsListResponse', items?: Array<{ __typename?: 'CommentDetail', id: string, content: string, postId: string, reportsCount: number, strikesCount: number, createdAt: any, updatedAt: any, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName: string, lastName: string }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null }> | null } };

export type GetCommentsByCreatorIdQueryVariables = Exact<{
  creatorId: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetCommentsByCreatorIdQuery = { __typename?: 'Query', getCommentsList: { __typename?: 'PaginatedCommentsListResponse', items?: Array<{ __typename?: 'CommentDetail', id: string, content: string, postId: string, reportsCount: number, strikesCount: number, createdAt: any, updatedAt: any, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName: string, lastName: string }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null }> | null } };

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

export type AddReactionMutationVariables = Exact<{
  createOrUpdateReactionData: CreateOrUpdateReactionDto;
}>;


export type AddReactionMutation = { __typename?: 'Mutation', AddReaction: { __typename?: 'GenericResponse', message?: string | null } };

export type GetUsersListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUsersListQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'UserDetail', id: string, email: string, firstName: string, lastName: string }> | null } };

export type GetUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', items?: Array<{ __typename?: 'UserDetail', id: string, username?: string | null, firstName: string, lastName: string, email: string, friendsCount: number, createdAt: any, updatedAt: any, joinedGroupsCount: number, likesCount: number, commentsCount: number }> | null } };

export type GetUsersWithAdministartionListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUsersWithAdministartionListQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'UserDetail', id: string, username?: string | null, firstName: string, lastName: string, email: string, createdAt: any, updatedAt: any, banStrikesCount: number, filedReportsCount: number, receivedReportsCount: number, createdGroupsCount: number, moderatedGroupsCount: number }> | null } };

export type GetUsersDropDownListDataQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  getAll?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetUsersDropDownListDataQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', total?: number | null, items?: Array<{ __typename?: 'UserDetail', id: string, email: string, firstName: string, lastName: string, username?: string | null }> | null } };



export const CreateAdminDocument = /*#__PURE__*/ `
    mutation CreateAdmin($createAdmin: CreateAdminDto!) {
  CreateAdmin(createAdminDto: $createAdmin) {
    message
  }
}
    `;

export const useCreateAdminMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<CreateAdminMutation, TError, CreateAdminMutationVariables, TContext>) => {
    
    return useMutation<CreateAdminMutation, TError, CreateAdminMutationVariables, TContext>(
      {
    mutationKey: ['CreateAdmin'],
    mutationFn: (variables?: CreateAdminMutationVariables) => fetcher<CreateAdminMutation, CreateAdminMutationVariables>(CreateAdminDocument, variables)(),
    ...options
  }
    )};

useCreateAdminMutation.getKey = () => ['CreateAdmin'];


useCreateAdminMutation.fetcher = (variables: CreateAdminMutationVariables, options?: RequestInit['headers']) => fetcher<CreateAdminMutation, CreateAdminMutationVariables>(CreateAdminDocument, variables, options);

export const SignInAdminDocument = /*#__PURE__*/ `
    mutation SignInAdmin($signIn: SignInCredentials!) {
  SignInAdmin(signIn: $signIn) {
    accessToken
    refreshToken
  }
}
    `;

export const useSignInAdminMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<SignInAdminMutation, TError, SignInAdminMutationVariables, TContext>) => {
    
    return useMutation<SignInAdminMutation, TError, SignInAdminMutationVariables, TContext>(
      {
    mutationKey: ['SignInAdmin'],
    mutationFn: (variables?: SignInAdminMutationVariables) => fetcher<SignInAdminMutation, SignInAdminMutationVariables>(SignInAdminDocument, variables)(),
    ...options
  }
    )};

useSignInAdminMutation.getKey = () => ['SignInAdmin'];


useSignInAdminMutation.fetcher = (variables: SignInAdminMutationVariables, options?: RequestInit['headers']) => fetcher<SignInAdminMutation, SignInAdminMutationVariables>(SignInAdminDocument, variables, options);

export const ForgotPasswordDocument = /*#__PURE__*/ `
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    message
  }
}
    `;

export const useForgotPasswordMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>) => {
    
    return useMutation<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>(
      {
    mutationKey: ['ForgotPassword'],
    mutationFn: (variables?: ForgotPasswordMutationVariables) => fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, variables)(),
    ...options
  }
    )};

useForgotPasswordMutation.getKey = () => ['ForgotPassword'];


useForgotPasswordMutation.fetcher = (variables: ForgotPasswordMutationVariables, options?: RequestInit['headers']) => fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, variables, options);

export const SignOutUserDocument = /*#__PURE__*/ `
    mutation SignOutUser($userId: String!) {
  SignOutUser(userId: $userId) {
    message
  }
}
    `;

export const useSignOutUserMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<SignOutUserMutation, TError, SignOutUserMutationVariables, TContext>) => {
    
    return useMutation<SignOutUserMutation, TError, SignOutUserMutationVariables, TContext>(
      {
    mutationKey: ['SignOutUser'],
    mutationFn: (variables?: SignOutUserMutationVariables) => fetcher<SignOutUserMutation, SignOutUserMutationVariables>(SignOutUserDocument, variables)(),
    ...options
  }
    )};

useSignOutUserMutation.getKey = () => ['SignOutUser'];


useSignOutUserMutation.fetcher = (variables: SignOutUserMutationVariables, options?: RequestInit['headers']) => fetcher<SignOutUserMutation, SignOutUserMutationVariables>(SignOutUserDocument, variables, options);

export const RefreshTokenDocument = /*#__PURE__*/ `
    mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;

export const useRefreshTokenMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>) => {
    
    return useMutation<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>(
      {
    mutationKey: ['RefreshToken'],
    mutationFn: (variables?: RefreshTokenMutationVariables) => fetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, variables)(),
    ...options
  }
    )};

useRefreshTokenMutation.getKey = () => ['RefreshToken'];


useRefreshTokenMutation.fetcher = (variables: RefreshTokenMutationVariables, options?: RequestInit['headers']) => fetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, variables, options);

export const ResetPasswordDocument = /*#__PURE__*/ `
    mutation ResetPassword($email: String!, $token: String!, $newPassword: String!, $repeatPassword: String!) {
  resetPassword(
    resetPassword: {email: $email, token: $token, newPassword: $newPassword, repeatPassword: $repeatPassword}
  ) {
    message
  }
}
    `;

export const useResetPasswordMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>) => {
    
    return useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      {
    mutationKey: ['ResetPassword'],
    mutationFn: (variables?: ResetPasswordMutationVariables) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables)(),
    ...options
  }
    )};

useResetPasswordMutation.getKey = () => ['ResetPassword'];


useResetPasswordMutation.fetcher = (variables: ResetPasswordMutationVariables, options?: RequestInit['headers']) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables, options);

export const SignInUserDocument = /*#__PURE__*/ `
    mutation SignInUser($signInUser: SignInCredentials!) {
  SignInUser(signInUser: $signInUser) {
    accessToken
    refreshToken
  }
}
    `;

export const useSignInUserMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<SignInUserMutation, TError, SignInUserMutationVariables, TContext>) => {
    
    return useMutation<SignInUserMutation, TError, SignInUserMutationVariables, TContext>(
      {
    mutationKey: ['SignInUser'],
    mutationFn: (variables?: SignInUserMutationVariables) => fetcher<SignInUserMutation, SignInUserMutationVariables>(SignInUserDocument, variables)(),
    ...options
  }
    )};

useSignInUserMutation.getKey = () => ['SignInUser'];


useSignInUserMutation.fetcher = (variables: SignInUserMutationVariables, options?: RequestInit['headers']) => fetcher<SignInUserMutation, SignInUserMutationVariables>(SignInUserDocument, variables, options);

export const SignUpDocument = /*#__PURE__*/ `
    mutation SignUp($createUser: SignUpUserData!) {
  SignUpUser(signUp: $createUser) {
    message
  }
}
    `;

export const useSignUpMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>) => {
    
    return useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      {
    mutationKey: ['SignUp'],
    mutationFn: (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(SignUpDocument, variables)(),
    ...options
  }
    )};

useSignUpMutation.getKey = () => ['SignUp'];


useSignUpMutation.fetcher = (variables: SignUpMutationVariables, options?: RequestInit['headers']) => fetcher<SignUpMutation, SignUpMutationVariables>(SignUpDocument, variables, options);

export const CreateCommentDocument = /*#__PURE__*/ `
    mutation CreateComment($createComment: CreateCommentDto!, $postId: String!) {
  CreateComment(createComment: $createComment, postId: $postId) {
    message
  }
}
    `;

export const useCreateCommentMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>) => {
    
    return useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      {
    mutationKey: ['CreateComment'],
    mutationFn: (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables)(),
    ...options
  }
    )};

useCreateCommentMutation.getKey = () => ['CreateComment'];


useCreateCommentMutation.fetcher = (variables: CreateCommentMutationVariables, options?: RequestInit['headers']) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables, options);

export const PinCommentDocument = /*#__PURE__*/ `
    mutation PinComment($postId: String!, $commentId: String!) {
  PinComment(postId: $postId, commentId: $commentId) {
    message
  }
}
    `;

export const usePinCommentMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<PinCommentMutation, TError, PinCommentMutationVariables, TContext>) => {
    
    return useMutation<PinCommentMutation, TError, PinCommentMutationVariables, TContext>(
      {
    mutationKey: ['PinComment'],
    mutationFn: (variables?: PinCommentMutationVariables) => fetcher<PinCommentMutation, PinCommentMutationVariables>(PinCommentDocument, variables)(),
    ...options
  }
    )};

usePinCommentMutation.getKey = () => ['PinComment'];


usePinCommentMutation.fetcher = (variables: PinCommentMutationVariables, options?: RequestInit['headers']) => fetcher<PinCommentMutation, PinCommentMutationVariables>(PinCommentDocument, variables, options);

export const GetCommentsByPostIdDocument = /*#__PURE__*/ `
    query GetCommentsByPostId($postId: String!, $page: Int!, $limit: Int!) {
  getCommentsList(postId: $postId, page: $page, limit: $limit) {
    items {
      id
      content
      creator {
        id
        username
        firstName
        lastName
      }
      postId
      reactions {
        like
        dislike
        smile
        angry
        sad
        love
      }
      reportsCount
      strikesCount
      createdAt
      updatedAt
    }
  }
}
    `;

export const useGetCommentsByPostIdQuery = <
      TData = GetCommentsByPostIdQuery,
      TError = GraphQLResponse
    >(
      variables: GetCommentsByPostIdQueryVariables,
      options?: Omit<UseQueryOptions<GetCommentsByPostIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCommentsByPostIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCommentsByPostIdQuery, TError, TData>(
      {
    queryKey: ['GetCommentsByPostId', variables],
    queryFn: fetcher<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, variables),
    ...options
  }
    )};

useGetCommentsByPostIdQuery.document = GetCommentsByPostIdDocument;

useGetCommentsByPostIdQuery.getKey = (variables: GetCommentsByPostIdQueryVariables) => ['GetCommentsByPostId', variables];

export const useInfiniteGetCommentsByPostIdQuery = <
      TData = InfiniteData<GetCommentsByPostIdQuery>,
      TError = GraphQLResponse
    >(
      variables: GetCommentsByPostIdQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetCommentsByPostIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetCommentsByPostIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetCommentsByPostIdQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetCommentsByPostId.infinite', variables],
      queryFn: (metaData) => fetcher<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetCommentsByPostIdQuery.getKey = (variables: GetCommentsByPostIdQueryVariables) => ['GetCommentsByPostId.infinite', variables];


useGetCommentsByPostIdQuery.fetcher = (variables: GetCommentsByPostIdQueryVariables, options?: RequestInit['headers']) => fetcher<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, variables, options);

export const GetCommentsByCreatorIdDocument = /*#__PURE__*/ `
    query GetCommentsByCreatorId($creatorId: String!, $page: Int!, $limit: Int!) {
  getCommentsList(creatorId: $creatorId, page: $page, limit: $limit) {
    items {
      id
      content
      creator {
        id
        username
        firstName
        lastName
      }
      postId
      reactions {
        like
        dislike
        smile
        angry
        sad
        love
      }
      reportsCount
      strikesCount
      createdAt
      updatedAt
    }
  }
}
    `;

export const useGetCommentsByCreatorIdQuery = <
      TData = GetCommentsByCreatorIdQuery,
      TError = GraphQLResponse
    >(
      variables: GetCommentsByCreatorIdQueryVariables,
      options?: Omit<UseQueryOptions<GetCommentsByCreatorIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCommentsByCreatorIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCommentsByCreatorIdQuery, TError, TData>(
      {
    queryKey: ['GetCommentsByCreatorId', variables],
    queryFn: fetcher<GetCommentsByCreatorIdQuery, GetCommentsByCreatorIdQueryVariables>(GetCommentsByCreatorIdDocument, variables),
    ...options
  }
    )};

useGetCommentsByCreatorIdQuery.document = GetCommentsByCreatorIdDocument;

useGetCommentsByCreatorIdQuery.getKey = (variables: GetCommentsByCreatorIdQueryVariables) => ['GetCommentsByCreatorId', variables];

export const useInfiniteGetCommentsByCreatorIdQuery = <
      TData = InfiniteData<GetCommentsByCreatorIdQuery>,
      TError = GraphQLResponse
    >(
      variables: GetCommentsByCreatorIdQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetCommentsByCreatorIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetCommentsByCreatorIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetCommentsByCreatorIdQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetCommentsByCreatorId.infinite', variables],
      queryFn: (metaData) => fetcher<GetCommentsByCreatorIdQuery, GetCommentsByCreatorIdQueryVariables>(GetCommentsByCreatorIdDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetCommentsByCreatorIdQuery.getKey = (variables: GetCommentsByCreatorIdQueryVariables) => ['GetCommentsByCreatorId.infinite', variables];


useGetCommentsByCreatorIdQuery.fetcher = (variables: GetCommentsByCreatorIdQueryVariables, options?: RequestInit['headers']) => fetcher<GetCommentsByCreatorIdQuery, GetCommentsByCreatorIdQueryVariables>(GetCommentsByCreatorIdDocument, variables, options);

export const CreateGroupDocument = /*#__PURE__*/ `
    mutation CreateGroup($createGroupDto: CreateGroupDto!) {
  createGroup(createGroupDto: $createGroupDto) {
    message
  }
}
    `;

export const useCreateGroupMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<CreateGroupMutation, TError, CreateGroupMutationVariables, TContext>) => {
    
    return useMutation<CreateGroupMutation, TError, CreateGroupMutationVariables, TContext>(
      {
    mutationKey: ['CreateGroup'],
    mutationFn: (variables?: CreateGroupMutationVariables) => fetcher<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, variables)(),
    ...options
  }
    )};

useCreateGroupMutation.getKey = () => ['CreateGroup'];


useCreateGroupMutation.fetcher = (variables: CreateGroupMutationVariables, options?: RequestInit['headers']) => fetcher<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, variables, options);

export const CreatePostDocument = /*#__PURE__*/ `
    mutation CreatePost($input: CreatePostDto!) {
  CreatePost(createPost: $input) {
    message
  }
}
    `;

export const useCreatePostMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      {
    mutationKey: ['CreatePost'],
    mutationFn: (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables)(),
    ...options
  }
    )};

useCreatePostMutation.getKey = () => ['CreatePost'];


useCreatePostMutation.fetcher = (variables: CreatePostMutationVariables, options?: RequestInit['headers']) => fetcher<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables, options);

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
      TError = GraphQLResponse
    >(
      variables?: GetPostStatisticsQueryVariables,
      options?: Omit<UseQueryOptions<GetPostStatisticsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostStatisticsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostStatisticsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPostStatistics'] : ['GetPostStatistics', variables],
    queryFn: fetcher<GetPostStatisticsQuery, GetPostStatisticsQueryVariables>(GetPostStatisticsDocument, variables),
    ...options
  }
    )};

useGetPostStatisticsQuery.document = GetPostStatisticsDocument;

useGetPostStatisticsQuery.getKey = (variables?: GetPostStatisticsQueryVariables) => variables === undefined ? ['GetPostStatistics'] : ['GetPostStatistics', variables];

export const useInfiniteGetPostStatisticsQuery = <
      TData = InfiniteData<GetPostStatisticsQuery>,
      TError = GraphQLResponse
    >(
      variables: GetPostStatisticsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPostStatisticsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPostStatisticsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPostStatisticsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPostStatistics.infinite'] : ['GetPostStatistics.infinite', variables],
      queryFn: (metaData) => fetcher<GetPostStatisticsQuery, GetPostStatisticsQueryVariables>(GetPostStatisticsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPostStatisticsQuery.getKey = (variables?: GetPostStatisticsQueryVariables) => variables === undefined ? ['GetPostStatistics.infinite'] : ['GetPostStatistics.infinite', variables];


useGetPostStatisticsQuery.fetcher = (variables?: GetPostStatisticsQueryVariables, options?: RequestInit['headers']) => fetcher<GetPostStatisticsQuery, GetPostStatisticsQueryVariables>(GetPostStatisticsDocument, variables, options);

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
      TError = GraphQLResponse
    >(
      variables?: GetPostsListQueryVariables,
      options?: Omit<UseQueryOptions<GetPostsListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostsListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostsListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPostsList'] : ['GetPostsList', variables],
    queryFn: fetcher<GetPostsListQuery, GetPostsListQueryVariables>(GetPostsListDocument, variables),
    ...options
  }
    )};

useGetPostsListQuery.document = GetPostsListDocument;

useGetPostsListQuery.getKey = (variables?: GetPostsListQueryVariables) => variables === undefined ? ['GetPostsList'] : ['GetPostsList', variables];

export const useInfiniteGetPostsListQuery = <
      TData = InfiniteData<GetPostsListQuery>,
      TError = GraphQLResponse
    >(
      variables: GetPostsListQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPostsListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPostsListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPostsListQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPostsList.infinite'] : ['GetPostsList.infinite', variables],
      queryFn: (metaData) => fetcher<GetPostsListQuery, GetPostsListQueryVariables>(GetPostsListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPostsListQuery.getKey = (variables?: GetPostsListQueryVariables) => variables === undefined ? ['GetPostsList.infinite'] : ['GetPostsList.infinite', variables];


useGetPostsListQuery.fetcher = (variables?: GetPostsListQueryVariables, options?: RequestInit['headers']) => fetcher<GetPostsListQuery, GetPostsListQueryVariables>(GetPostsListDocument, variables, options);

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
      TError = GraphQLResponse
    >(
      variables?: GetAdministrationPostsListQueryVariables,
      options?: Omit<UseQueryOptions<GetAdministrationPostsListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdministrationPostsListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdministrationPostsListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAdministrationPostsList'] : ['GetAdministrationPostsList', variables],
    queryFn: fetcher<GetAdministrationPostsListQuery, GetAdministrationPostsListQueryVariables>(GetAdministrationPostsListDocument, variables),
    ...options
  }
    )};

useGetAdministrationPostsListQuery.document = GetAdministrationPostsListDocument;

useGetAdministrationPostsListQuery.getKey = (variables?: GetAdministrationPostsListQueryVariables) => variables === undefined ? ['GetAdministrationPostsList'] : ['GetAdministrationPostsList', variables];

export const useInfiniteGetAdministrationPostsListQuery = <
      TData = InfiniteData<GetAdministrationPostsListQuery>,
      TError = GraphQLResponse
    >(
      variables: GetAdministrationPostsListQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetAdministrationPostsListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetAdministrationPostsListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetAdministrationPostsListQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetAdministrationPostsList.infinite'] : ['GetAdministrationPostsList.infinite', variables],
      queryFn: (metaData) => fetcher<GetAdministrationPostsListQuery, GetAdministrationPostsListQueryVariables>(GetAdministrationPostsListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetAdministrationPostsListQuery.getKey = (variables?: GetAdministrationPostsListQueryVariables) => variables === undefined ? ['GetAdministrationPostsList.infinite'] : ['GetAdministrationPostsList.infinite', variables];


useGetAdministrationPostsListQuery.fetcher = (variables?: GetAdministrationPostsListQueryVariables, options?: RequestInit['headers']) => fetcher<GetAdministrationPostsListQuery, GetAdministrationPostsListQueryVariables>(GetAdministrationPostsListDocument, variables, options);

export const AddReactionDocument = /*#__PURE__*/ `
    mutation AddReaction($createOrUpdateReactionData: CreateOrUpdateReactionDto!) {
  AddReaction(createOrUpdateReactionData: $createOrUpdateReactionData) {
    message
  }
}
    `;

export const useAddReactionMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<AddReactionMutation, TError, AddReactionMutationVariables, TContext>) => {
    
    return useMutation<AddReactionMutation, TError, AddReactionMutationVariables, TContext>(
      {
    mutationKey: ['AddReaction'],
    mutationFn: (variables?: AddReactionMutationVariables) => fetcher<AddReactionMutation, AddReactionMutationVariables>(AddReactionDocument, variables)(),
    ...options
  }
    )};

useAddReactionMutation.getKey = () => ['AddReaction'];


useAddReactionMutation.fetcher = (variables: AddReactionMutationVariables, options?: RequestInit['headers']) => fetcher<AddReactionMutation, AddReactionMutationVariables>(AddReactionDocument, variables, options);

export const GetUsersListDocument = /*#__PURE__*/ `
    query GetUsersList($page: Int = 1, $limit: Int = 10) {
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

export const useGetUsersListQuery = <
      TData = GetUsersListQuery,
      TError = GraphQLResponse
    >(
      variables?: GetUsersListQueryVariables,
      options?: Omit<UseQueryOptions<GetUsersListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUsersListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUsersListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUsersList'] : ['GetUsersList', variables],
    queryFn: fetcher<GetUsersListQuery, GetUsersListQueryVariables>(GetUsersListDocument, variables),
    ...options
  }
    )};

useGetUsersListQuery.document = GetUsersListDocument;

useGetUsersListQuery.getKey = (variables?: GetUsersListQueryVariables) => variables === undefined ? ['GetUsersList'] : ['GetUsersList', variables];

export const useInfiniteGetUsersListQuery = <
      TData = InfiniteData<GetUsersListQuery>,
      TError = GraphQLResponse
    >(
      variables: GetUsersListQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUsersListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUsersListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUsersListQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUsersList.infinite'] : ['GetUsersList.infinite', variables],
      queryFn: (metaData) => fetcher<GetUsersListQuery, GetUsersListQueryVariables>(GetUsersListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUsersListQuery.getKey = (variables?: GetUsersListQueryVariables) => variables === undefined ? ['GetUsersList.infinite'] : ['GetUsersList.infinite', variables];


useGetUsersListQuery.fetcher = (variables?: GetUsersListQueryVariables, options?: RequestInit['headers']) => fetcher<GetUsersListQuery, GetUsersListQueryVariables>(GetUsersListDocument, variables, options);

export const GetUserDocument = /*#__PURE__*/ `
    query GetUser($userId: String) {
  getUsers(userId: $userId) {
    items {
      id
      username
      firstName
      lastName
      email
      friendsCount
      createdAt
      updatedAt
      joinedGroupsCount
      likesCount
      commentsCount
    }
  }
}
    `;

export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = GraphQLResponse
    >(
      variables?: GetUserQueryVariables,
      options?: Omit<UseQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUser'] : ['GetUser', variables],
    queryFn: fetcher<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables),
    ...options
  }
    )};

useGetUserQuery.document = GetUserDocument;

useGetUserQuery.getKey = (variables?: GetUserQueryVariables) => variables === undefined ? ['GetUser'] : ['GetUser', variables];

export const useInfiniteGetUserQuery = <
      TData = InfiniteData<GetUserQuery>,
      TError = GraphQLResponse
    >(
      variables: GetUserQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUserQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUser.infinite'] : ['GetUser.infinite', variables],
      queryFn: (metaData) => fetcher<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUserQuery.getKey = (variables?: GetUserQueryVariables) => variables === undefined ? ['GetUser.infinite'] : ['GetUser.infinite', variables];


useGetUserQuery.fetcher = (variables?: GetUserQueryVariables, options?: RequestInit['headers']) => fetcher<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);

export const GetUsersWithAdministartionListDocument = /*#__PURE__*/ `
    query GetUsersWithAdministartionList($page: Int = 1, $limit: Int = 10) {
  getUsers(page: $page, limit: $limit) {
    items {
      id
      username
      firstName
      lastName
      email
      createdAt
      updatedAt
      banStrikesCount
      filedReportsCount
      banStrikesCount
      receivedReportsCount
      createdGroupsCount
      moderatedGroupsCount
    }
    total
    page
    limit
  }
}
    `;

export const useGetUsersWithAdministartionListQuery = <
      TData = GetUsersWithAdministartionListQuery,
      TError = GraphQLResponse
    >(
      variables?: GetUsersWithAdministartionListQueryVariables,
      options?: Omit<UseQueryOptions<GetUsersWithAdministartionListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUsersWithAdministartionListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUsersWithAdministartionListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUsersWithAdministartionList'] : ['GetUsersWithAdministartionList', variables],
    queryFn: fetcher<GetUsersWithAdministartionListQuery, GetUsersWithAdministartionListQueryVariables>(GetUsersWithAdministartionListDocument, variables),
    ...options
  }
    )};

useGetUsersWithAdministartionListQuery.document = GetUsersWithAdministartionListDocument;

useGetUsersWithAdministartionListQuery.getKey = (variables?: GetUsersWithAdministartionListQueryVariables) => variables === undefined ? ['GetUsersWithAdministartionList'] : ['GetUsersWithAdministartionList', variables];

export const useInfiniteGetUsersWithAdministartionListQuery = <
      TData = InfiniteData<GetUsersWithAdministartionListQuery>,
      TError = GraphQLResponse
    >(
      variables: GetUsersWithAdministartionListQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUsersWithAdministartionListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUsersWithAdministartionListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUsersWithAdministartionListQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUsersWithAdministartionList.infinite'] : ['GetUsersWithAdministartionList.infinite', variables],
      queryFn: (metaData) => fetcher<GetUsersWithAdministartionListQuery, GetUsersWithAdministartionListQueryVariables>(GetUsersWithAdministartionListDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUsersWithAdministartionListQuery.getKey = (variables?: GetUsersWithAdministartionListQueryVariables) => variables === undefined ? ['GetUsersWithAdministartionList.infinite'] : ['GetUsersWithAdministartionList.infinite', variables];


useGetUsersWithAdministartionListQuery.fetcher = (variables?: GetUsersWithAdministartionListQueryVariables, options?: RequestInit['headers']) => fetcher<GetUsersWithAdministartionListQuery, GetUsersWithAdministartionListQueryVariables>(GetUsersWithAdministartionListDocument, variables, options);

export const GetUsersDropDownListDataDocument = /*#__PURE__*/ `
    query GetUsersDropDownListData($page: Int = 1, $limit: Int = 10, $userId: String, $groupId: String, $getAll: Boolean) {
  getUsers(
    page: $page
    limit: $limit
    userId: $userId
    groupId: $groupId
    getAll: $getAll
  ) {
    items {
      id
      email
      firstName
      lastName
      username
    }
    total
  }
}
    `;

export const useGetUsersDropDownListDataQuery = <
      TData = GetUsersDropDownListDataQuery,
      TError = GraphQLResponse
    >(
      variables?: GetUsersDropDownListDataQueryVariables,
      options?: Omit<UseQueryOptions<GetUsersDropDownListDataQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUsersDropDownListDataQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUsersDropDownListDataQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUsersDropDownListData'] : ['GetUsersDropDownListData', variables],
    queryFn: fetcher<GetUsersDropDownListDataQuery, GetUsersDropDownListDataQueryVariables>(GetUsersDropDownListDataDocument, variables),
    ...options
  }
    )};

useGetUsersDropDownListDataQuery.document = GetUsersDropDownListDataDocument;

useGetUsersDropDownListDataQuery.getKey = (variables?: GetUsersDropDownListDataQueryVariables) => variables === undefined ? ['GetUsersDropDownListData'] : ['GetUsersDropDownListData', variables];

export const useInfiniteGetUsersDropDownListDataQuery = <
      TData = InfiniteData<GetUsersDropDownListDataQuery>,
      TError = GraphQLResponse
    >(
      variables: GetUsersDropDownListDataQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUsersDropDownListDataQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUsersDropDownListDataQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUsersDropDownListDataQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUsersDropDownListData.infinite'] : ['GetUsersDropDownListData.infinite', variables],
      queryFn: (metaData) => fetcher<GetUsersDropDownListDataQuery, GetUsersDropDownListDataQueryVariables>(GetUsersDropDownListDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUsersDropDownListDataQuery.getKey = (variables?: GetUsersDropDownListDataQueryVariables) => variables === undefined ? ['GetUsersDropDownListData.infinite'] : ['GetUsersDropDownListData.infinite', variables];


useGetUsersDropDownListDataQuery.fetcher = (variables?: GetUsersDropDownListDataQueryVariables, options?: RequestInit['headers']) => fetcher<GetUsersDropDownListDataQuery, GetUsersDropDownListDataQueryVariables>(GetUsersDropDownListDataDocument, variables, options);

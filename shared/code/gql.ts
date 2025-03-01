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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: UserDetail;
  id: Scalars['String']['output'];
  myReaction?: Maybe<ReactionType>;
  postId: Scalars['String']['output'];
  reactions?: Maybe<ReactionsCount>;
  reportsCount?: Maybe<Scalars['Float']['output']>;
  strikesCount?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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
  currentUserIsReceiver?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Scalars['Boolean']['output']>;
};

export enum GraphFilter {
  Day = 'Day',
  Month = 'Month',
  Year = 'Year'
}

export type GroupDetail = {
  __typename?: 'GroupDetail';
  id?: Maybe<Scalars['String']['output']>;
  interest?: Maybe<InterestDetail>;
  membersCount?: Maybe<Scalars['Int']['output']>;
  moderators?: Maybe<Array<UserDetail>>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<UserDetail>;
  postsCount?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<UserDetail>>;
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
  AddFriendRequest: GenericResponse;
  AddReaction: GenericResponse;
  CreateAdmin: GenericResponse;
  CreateComment: GenericResponse;
  CreatePost: GenericResponse;
  CreateReport: GenericResponse;
  PinComment: GenericResponse;
  SignInAdmin: SignInResponse;
  SignInUser: SignInResponse;
  SignOutUser: GenericResponse;
  SignUpUser: GenericResponse;
  UpdateFriend: GenericResponse;
  UpdateUserConfiguration: GenericResponse;
  createGroup: GenericResponse;
  forgotPassword: GenericResponse;
  refreshToken: SignInResponse;
  resetPassword: GenericResponse;
};


export type MutationAddFriendRequestArgs = {
  addFriendDto: NotificationDto;
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


export type MutationCreateReportArgs = {
  createReportDto: ReportDto;
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


export type MutationUpdateFriendArgs = {
  userId: Scalars['String']['input'];
};


export type MutationUpdateUserConfigurationArgs = {
  updateDto: UpdateUserConfigurationDto;
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

export type NotificationDetail = {
  __typename?: 'NotificationDetail';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: UserDetail;
  id: Scalars['String']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  notificationType: NotificationType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type NotificationDto = {
  message?: InputMaybe<Scalars['String']['input']>;
  notificationId?: InputMaybe<Scalars['String']['input']>;
  receiverId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationType>;
};

export enum NotificationType {
  AcceptedIntoGroup = 'ACCEPTED_INTO_GROUP',
  Comment = 'COMMENT',
  FriendRequest = 'FRIEND_REQUEST',
  KickedOutOfGroup = 'KICKED_OUT_OF_GROUP',
  Reaction = 'REACTION',
  ReceivedBanStrike = 'RECEIVED_BAN_STRIKE',
  ReportAssigned = 'REPORT_ASSIGNED',
  ReportClosed = 'REPORT_CLOSED',
  ReportRejected = 'REPORT_REJECTED',
  ReportSubmitted = 'REPORT_SUBMITTED'
}

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

export type PaginatedNotificationsResponse = {
  __typename?: 'PaginatedNotificationsResponse';
  items?: Maybe<Array<NotificationDetail>>;
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

export type PaginatedReportsListResponse = {
  __typename?: 'PaginatedReportsListResponse';
  items?: Maybe<Array<ReportDetail>>;
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedUserReactionsResponse = {
  __typename?: 'PaginatedUserReactionsResponse';
  items?: Maybe<Array<ReactedItemUnion>>;
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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creator: UserDetail;
  group?: Maybe<GroupDetail>;
  id: Scalars['String']['output'];
  interest?: Maybe<InterestDetail>;
  isPinned?: Maybe<Scalars['Boolean']['output']>;
  myReaction?: Maybe<ReactionType>;
  pinnedComment?: Maybe<CommentDetail>;
  postPicture?: Maybe<Scalars['String']['output']>;
  reactions?: Maybe<ReactionsCount>;
  reportsCount?: Maybe<Scalars['Int']['output']>;
  strikesCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PostGraphDataDto = {
  __typename?: 'PostGraphDataDto';
  count: Scalars['Int']['output'];
  period: Scalars['String']['output'];
};

export enum ProfileVisibility {
  OnlyFriends = 'ONLY_FRIENDS',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  GetFriendRequest?: Maybe<NotificationDetail>;
  GetInterests: PaginatedInterestsListResponse;
  GetNotifications: PaginatedNotificationsResponse;
  GetReports: PaginatedReportsListResponse;
  GetUnreadNotificationsCount: Scalars['Float']['output'];
  GetUserConfiguration: UserConfigurationDetail;
  GetUserIsFriend: GenericResponse;
  getCommentsList: PaginatedCommentsListResponse;
  getPosts: PaginatedPostsListResponse;
  getPostsStatistics: Array<PostGraphDataDto>;
  getUserReactions: PaginatedUserReactionsResponse;
  getUsers: PaginatedUsersResponse;
  hello: Scalars['String']['output'];
};


export type QueryGetFriendRequestArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetInterestsArgs = {
  interestId?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryGetNotificationsArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryGetReportsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryGetUserConfigurationArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUserIsFriendArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetCommentsListArgs = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  creatorId?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  postId?: InputMaybe<Scalars['String']['input']>;
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


export type QueryGetUserReactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryGetUsersArgs = {
  friendOf?: InputMaybe<Scalars['String']['input']>;
  getAll?: InputMaybe<Scalars['Boolean']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ReactedItemUnion = CommentDetail | PostDetail;

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

export type ReportDetail = {
  __typename?: 'ReportDetail';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  reportMessage?: Maybe<Scalars['String']['output']>;
  reportStatus: ReportStatus;
  reportType: ReportType;
  reportedComment?: Maybe<Scalars['String']['output']>;
  reportedPost?: Maybe<Scalars['String']['output']>;
  reportedUser?: Maybe<Scalars['String']['output']>;
  reporter?: Maybe<UserDetail>;
  resolutionMessage?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ReportDto = {
  message: Scalars['String']['input'];
  reportType: ReportType;
  reportedCommentId?: InputMaybe<Scalars['String']['input']>;
  reportedPostId?: InputMaybe<Scalars['String']['input']>;
  reportedUserId?: InputMaybe<Scalars['String']['input']>;
};

export enum ReportStatus {
  Closed = 'CLOSED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export enum ReportType {
  Abuse = 'ABUSE',
  Harassment = 'HARASSMENT',
  InappropriateContent = 'INAPPROPRIATE_CONTENT',
  Other = 'OTHER',
  Spam = 'SPAM'
}

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
  userData: UserDetail;
};

export type SignUpUserData = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  repeatPassword: Scalars['String']['input'];
};

export type UpdateUserConfigurationDto = {
  commentReactedTo_App_Notification?: InputMaybe<Scalars['Boolean']['input']>;
  commentReactedTo_Email_Notification?: InputMaybe<Scalars['Boolean']['input']>;
  friendRequest_App_Notification?: InputMaybe<Scalars['Boolean']['input']>;
  friendRequest_Email_Notification?: InputMaybe<Scalars['Boolean']['input']>;
  postReactedTo_App_Notification?: InputMaybe<Scalars['Boolean']['input']>;
  postReactedTo_Email_Notification?: InputMaybe<Scalars['Boolean']['input']>;
  profileBackgroundColor1?: InputMaybe<Scalars['String']['input']>;
  profileBackgroundColor2?: InputMaybe<Scalars['String']['input']>;
  profileBackgroundLightAngle?: InputMaybe<Scalars['Float']['input']>;
  profileVisibility?: InputMaybe<ProfileVisibility>;
};

export type UserConfigurationDetail = {
  __typename?: 'UserConfigurationDetail';
  commentReactedTo_App_Notification?: Maybe<Scalars['Boolean']['output']>;
  commentReactedTo_Email_Notification?: Maybe<Scalars['Boolean']['output']>;
  friendRequest_App_Notification?: Maybe<Scalars['Boolean']['output']>;
  friendRequest_Email_Notification?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  postReactedTo_App_Notification?: Maybe<Scalars['Boolean']['output']>;
  postReactedTo_Email_Notification?: Maybe<Scalars['Boolean']['output']>;
  profileBackgroundColor1: Scalars['String']['output'];
  profileBackgroundColor2: Scalars['String']['output'];
  profileBackgroundLightAngle: Scalars['Float']['output'];
  profileVisibility: ProfileVisibility;
};

export type UserDetail = {
  __typename?: 'UserDetail';
  banStrikesCount?: Maybe<Scalars['Float']['output']>;
  commentsCount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdGroupsCount?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  filedReportsCount?: Maybe<Scalars['Float']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  friendsCount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  joinedGroupsCount?: Maybe<Scalars['Float']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  moderatedGroupsCount?: Maybe<Scalars['Float']['output']>;
  postsCount?: Maybe<Scalars['Float']['output']>;
  profilePictureUrl?: Maybe<Scalars['String']['output']>;
  reactions?: Maybe<ReactionsCount>;
  receivedReportsCount?: Maybe<Scalars['Float']['output']>;
  sentNotificationsCount?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userConfiguration?: Maybe<UserConfigurationDetail>;
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


export type SignInUserMutation = { __typename?: 'Mutation', SignInUser: { __typename?: 'SignInResponse', accessToken: string, refreshToken: string, userData: { __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profilePictureUrl?: string | null } } };

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


export type GetCommentsByPostIdQuery = { __typename?: 'Query', getCommentsList: { __typename?: 'PaginatedCommentsListResponse', page?: number | null, total?: number | null, limit?: number | null, items?: Array<{ __typename: 'CommentDetail', id: string, content: string, postId: string, createdAt?: any | null, updatedAt?: any | null, myReaction?: ReactionType | null, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null, profilePictureUrl?: string | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null }> | null } };

export type GetCommentReactionsQueryVariables = Exact<{
  commentId: Scalars['String']['input'];
}>;


export type GetCommentReactionsQuery = { __typename?: 'Query', getCommentsList: { __typename?: 'PaginatedCommentsListResponse', items?: Array<{ __typename?: 'CommentDetail', reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null }> | null } };

export type GetCommentsByCreatorIdQueryVariables = Exact<{
  creatorId: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetCommentsByCreatorIdQuery = { __typename?: 'Query', getCommentsList: { __typename?: 'PaginatedCommentsListResponse', page?: number | null, total?: number | null, limit?: number | null, items?: Array<{ __typename: 'CommentDetail', id: string, content: string, postId: string, createdAt?: any | null, updatedAt?: any | null, myReaction?: ReactionType | null, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null, profilePictureUrl?: string | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null }> | null } };

export type CreateGroupMutationVariables = Exact<{
  createGroupDto: CreateGroupDto;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'GenericResponse', message?: string | null } };

export type GetInterestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInterestsQuery = { __typename?: 'Query', GetInterests: { __typename?: 'PaginatedInterestsListResponse', total?: number | null, items?: Array<{ __typename?: 'InterestDetail', id?: string | null, name?: string | null }> | null } };

export type GetNotificationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', GetNotifications: { __typename?: 'PaginatedNotificationsResponse', total?: number | null, page?: number | null, items?: Array<{ __typename?: 'NotificationDetail', id: string, message?: string | null, isRead?: boolean | null, createdAt?: any | null, notificationType: NotificationType, creator: { __typename?: 'UserDetail', id: string, firstName?: string | null, lastName?: string | null, username?: string | null, profilePictureUrl?: string | null } }> | null } };

export type GetUnreadNotificationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnreadNotificationsCountQuery = { __typename?: 'Query', GetUnreadNotificationsCount: number };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostDto;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'GenericResponse', message?: string | null } };

export type GetPostStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostStatisticsQuery = { __typename?: 'Query', getPostsStatistics: Array<{ __typename?: 'PostGraphDataDto', period: string, count: number }> };

export type GetPostsListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  creatorId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  interestId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostsListQuery = { __typename?: 'Query', getPosts: { __typename?: 'PaginatedPostsListResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename: 'PostDetail', id: string, content: string, postPicture?: string | null, myReaction?: ReactionType | null, commentsCount?: number | null, createdAt?: any | null, updatedAt?: any | null, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null, profilePictureUrl?: string | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, sad: number, smile: number, angry: number, love: number } | null, interest?: { __typename?: 'InterestDetail', id?: string | null, name?: string | null } | null, group?: { __typename?: 'GroupDetail', id?: string | null, name?: string | null } | null }> | null } };

export type GetPostReactionsQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type GetPostReactionsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PaginatedPostsListResponse', items?: Array<{ __typename?: 'PostDetail', reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null }> | null } };

export type GetAdministrationPostsListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  creatorId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  interestId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAdministrationPostsListQuery = { __typename?: 'Query', getPosts: { __typename?: 'PaginatedPostsListResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'PostDetail', id: string, content: string, postPicture?: string | null, commentsCount?: number | null, createdAt?: any | null, updatedAt?: any | null, reportsCount?: number | null, strikesCount?: number | null, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, sad: number, smile: number, angry: number, love: number } | null, interest?: { __typename?: 'InterestDetail', id?: string | null, name?: string | null } | null, group?: { __typename?: 'GroupDetail', id?: string | null, name?: string | null } | null, pinnedComment?: { __typename?: 'CommentDetail', id: string, content: string, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null } } | null }> | null } };

export type AddReactionMutationVariables = Exact<{
  createOrUpdateReactionData: CreateOrUpdateReactionDto;
}>;


export type AddReactionMutation = { __typename?: 'Mutation', AddReaction: { __typename?: 'GenericResponse', message?: string | null } };

export type GetUserReactionsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserReactionsQuery = { __typename?: 'Query', getUserReactions: { __typename?: 'PaginatedUserReactionsResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename: 'CommentDetail', id: string, content: string, postId: string, createdAt?: any | null, updatedAt?: any | null, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null } | { __typename: 'PostDetail', id: string, content: string, postPicture?: string | null, commentsCount?: number | null, createdAt?: any | null, updatedAt?: any | null, creator: { __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null }, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, sad: number, smile: number, angry: number, love: number } | null, interest?: { __typename?: 'InterestDetail', id?: string | null, name?: string | null } | null, group?: { __typename?: 'GroupDetail', id?: string | null, name?: string | null } | null }> | null } };

export type CreateReportMutationVariables = Exact<{
  input: ReportDto;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', CreateReport: { __typename?: 'GenericResponse', message?: string | null } };

export type GetReportsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetReportsQuery = { __typename?: 'Query', GetReports: { __typename?: 'PaginatedReportsListResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename: 'ReportDetail', id: string, reportMessage?: string | null, resolutionMessage?: string | null, reportedUser?: string | null, reportedComment?: string | null, reportedPost?: string | null, reportStatus: ReportStatus, reportType: ReportType, createdAt: any, updatedAt: any }> | null } };

export type GetReportsAdministrationQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetReportsAdministrationQuery = { __typename?: 'Query', GetReports: { __typename?: 'PaginatedReportsListResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename: 'ReportDetail', id: string, reportStatus: ReportStatus, reportMessage?: string | null, resolutionMessage?: string | null, createdAt: any, updatedAt: any, reportedUser?: string | null, reportedComment?: string | null, reportedPost?: string | null, reporter?: { __typename?: 'UserDetail', id: string, firstName?: string | null, lastName?: string | null, profilePictureUrl?: string | null, username?: string | null } | null }> | null } };

export type SendFriendRequestMutationVariables = Exact<{
  dto: NotificationDto;
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', AddFriendRequest: { __typename?: 'GenericResponse', message?: string | null } };

export type UpdateFriendMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UpdateFriendMutation = { __typename?: 'Mutation', UpdateFriend: { __typename?: 'GenericResponse', message?: string | null } };

export type UpdateUserConfigurationMutationVariables = Exact<{
  updateDto: UpdateUserConfigurationDto;
}>;


export type UpdateUserConfigurationMutation = { __typename?: 'Mutation', UpdateUserConfiguration: { __typename?: 'GenericResponse', message?: string | null } };

export type GetFriendRequestQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetFriendRequestQuery = { __typename?: 'Query', GetFriendRequest?: { __typename?: 'NotificationDetail', id: string, notificationType: NotificationType, createdAt?: any | null, creator: { __typename?: 'UserDetail', id: string } } | null };

export type GetUserConfigurationQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserConfigurationQuery = { __typename?: 'Query', GetUserConfiguration: { __typename?: 'UserConfigurationDetail', id: string, profileVisibility: ProfileVisibility, profileBackgroundColor1: string, profileBackgroundColor2: string, profileBackgroundLightAngle: number, friendRequest_Email_Notification?: boolean | null, friendRequest_App_Notification?: boolean | null, postReactedTo_Email_Notification?: boolean | null, postReactedTo_App_Notification?: boolean | null, commentReactedTo_Email_Notification?: boolean | null, commentReactedTo_App_Notification?: boolean | null } };

export type GetUserIsFriendQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserIsFriendQuery = { __typename?: 'Query', GetUserIsFriend: { __typename?: 'GenericResponse', result?: boolean | null } };

export type GetUsersListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUsersListQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename: 'UserDetail', id: string, email?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, profilePictureUrl?: string | null, friendsCount?: number | null, joinedGroupsCount?: number | null, postsCount?: number | null, userConfiguration?: { __typename: 'UserConfigurationDetail', id: string, profileBackgroundColor1: string, profileBackgroundColor2: string } | null }> | null } };

export type GetUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', items?: Array<{ __typename: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profilePictureUrl?: string | null, friendsCount?: number | null, createdAt?: any | null, updatedAt?: any | null, joinedGroupsCount?: number | null, commentsCount?: number | null, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null, userConfiguration?: { __typename?: 'UserConfigurationDetail', id: string, profileBackgroundColor1: string, profileBackgroundColor2: string, profileVisibility: ProfileVisibility, profileBackgroundLightAngle: number } | null }> | null } };

export type GetFriendsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  friendOf?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFriendsQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null, profilePictureUrl?: string | null }> | null } };

export type GetUsersWithAdministartionListQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUsersWithAdministartionListQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', total?: number | null, page?: number | null, limit?: number | null, items?: Array<{ __typename?: 'UserDetail', id: string, username?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, banStrikesCount?: number | null, filedReportsCount?: number | null, receivedReportsCount?: number | null, createdGroupsCount?: number | null, moderatedGroupsCount?: number | null, reactions?: { __typename?: 'ReactionsCount', like: number, dislike: number, smile: number, angry: number, sad: number, love: number } | null }> | null } };

export type GetUsersDropDownListDataQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['String']['input']>;
  getAll?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetUsersDropDownListDataQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', total?: number | null, items?: Array<{ __typename?: 'UserDetail', id: string, email?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null }> | null } };



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
    userData {
      id
      username
      firstName
      lastName
      email
      profilePictureUrl
    }
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
      __typename
      id
      content
      creator {
        id
        username
        firstName
        lastName
        profilePictureUrl
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
      createdAt
      updatedAt
      myReaction
    }
    page
    total
    limit
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

export const GetCommentReactionsDocument = /*#__PURE__*/ `
    query GetCommentReactions($commentId: String!) {
  getCommentsList(limit: 1, page: 1, commentId: $commentId) {
    items {
      reactions {
        like
        dislike
        smile
        angry
        sad
        love
      }
    }
  }
}
    `;

export const useGetCommentReactionsQuery = <
      TData = GetCommentReactionsQuery,
      TError = GraphQLResponse
    >(
      variables: GetCommentReactionsQueryVariables,
      options?: Omit<UseQueryOptions<GetCommentReactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCommentReactionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCommentReactionsQuery, TError, TData>(
      {
    queryKey: ['GetCommentReactions', variables],
    queryFn: fetcher<GetCommentReactionsQuery, GetCommentReactionsQueryVariables>(GetCommentReactionsDocument, variables),
    ...options
  }
    )};

useGetCommentReactionsQuery.document = GetCommentReactionsDocument;

useGetCommentReactionsQuery.getKey = (variables: GetCommentReactionsQueryVariables) => ['GetCommentReactions', variables];

export const useInfiniteGetCommentReactionsQuery = <
      TData = InfiniteData<GetCommentReactionsQuery>,
      TError = GraphQLResponse
    >(
      variables: GetCommentReactionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetCommentReactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetCommentReactionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetCommentReactionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetCommentReactions.infinite', variables],
      queryFn: (metaData) => fetcher<GetCommentReactionsQuery, GetCommentReactionsQueryVariables>(GetCommentReactionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetCommentReactionsQuery.getKey = (variables: GetCommentReactionsQueryVariables) => ['GetCommentReactions.infinite', variables];


useGetCommentReactionsQuery.fetcher = (variables: GetCommentReactionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetCommentReactionsQuery, GetCommentReactionsQueryVariables>(GetCommentReactionsDocument, variables, options);

export const GetCommentsByCreatorIdDocument = /*#__PURE__*/ `
    query GetCommentsByCreatorId($creatorId: String!, $page: Int!, $limit: Int!) {
  getCommentsList(creatorId: $creatorId, page: $page, limit: $limit) {
    items {
      __typename
      id
      content
      creator {
        id
        username
        firstName
        lastName
        profilePictureUrl
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
      createdAt
      updatedAt
      myReaction
    }
    page
    total
    limit
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

export const GetInterestsDocument = /*#__PURE__*/ `
    query GetInterests {
  GetInterests {
    items {
      id
      name
    }
    total
  }
}
    `;

export const useGetInterestsQuery = <
      TData = GetInterestsQuery,
      TError = GraphQLResponse
    >(
      variables?: GetInterestsQueryVariables,
      options?: Omit<UseQueryOptions<GetInterestsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetInterestsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetInterestsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetInterests'] : ['GetInterests', variables],
    queryFn: fetcher<GetInterestsQuery, GetInterestsQueryVariables>(GetInterestsDocument, variables),
    ...options
  }
    )};

useGetInterestsQuery.document = GetInterestsDocument;

useGetInterestsQuery.getKey = (variables?: GetInterestsQueryVariables) => variables === undefined ? ['GetInterests'] : ['GetInterests', variables];

export const useInfiniteGetInterestsQuery = <
      TData = InfiniteData<GetInterestsQuery>,
      TError = GraphQLResponse
    >(
      variables: GetInterestsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetInterestsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetInterestsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetInterestsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetInterests.infinite'] : ['GetInterests.infinite', variables],
      queryFn: (metaData) => fetcher<GetInterestsQuery, GetInterestsQueryVariables>(GetInterestsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetInterestsQuery.getKey = (variables?: GetInterestsQueryVariables) => variables === undefined ? ['GetInterests.infinite'] : ['GetInterests.infinite', variables];


useGetInterestsQuery.fetcher = (variables?: GetInterestsQueryVariables, options?: RequestInit['headers']) => fetcher<GetInterestsQuery, GetInterestsQueryVariables>(GetInterestsDocument, variables, options);

export const GetNotificationsDocument = /*#__PURE__*/ `
    query GetNotifications($page: Int, $limit: Int) {
  GetNotifications(page: $page, limit: $limit) {
    total
    page
    items {
      id
      message
      isRead
      createdAt
      notificationType
      creator {
        id
        firstName
        lastName
        username
        profilePictureUrl
      }
    }
  }
}
    `;

export const useGetNotificationsQuery = <
      TData = GetNotificationsQuery,
      TError = GraphQLResponse
    >(
      variables?: GetNotificationsQueryVariables,
      options?: Omit<UseQueryOptions<GetNotificationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetNotificationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetNotificationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetNotifications'] : ['GetNotifications', variables],
    queryFn: fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, variables),
    ...options
  }
    )};

useGetNotificationsQuery.document = GetNotificationsDocument;

useGetNotificationsQuery.getKey = (variables?: GetNotificationsQueryVariables) => variables === undefined ? ['GetNotifications'] : ['GetNotifications', variables];

export const useInfiniteGetNotificationsQuery = <
      TData = InfiniteData<GetNotificationsQuery>,
      TError = GraphQLResponse
    >(
      variables: GetNotificationsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetNotificationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetNotificationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetNotificationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetNotifications.infinite'] : ['GetNotifications.infinite', variables],
      queryFn: (metaData) => fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetNotificationsQuery.getKey = (variables?: GetNotificationsQueryVariables) => variables === undefined ? ['GetNotifications.infinite'] : ['GetNotifications.infinite', variables];


useGetNotificationsQuery.fetcher = (variables?: GetNotificationsQueryVariables, options?: RequestInit['headers']) => fetcher<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, variables, options);

export const GetUnreadNotificationsCountDocument = /*#__PURE__*/ `
    query GetUnreadNotificationsCount {
  GetUnreadNotificationsCount
}
    `;

export const useGetUnreadNotificationsCountQuery = <
      TData = GetUnreadNotificationsCountQuery,
      TError = GraphQLResponse
    >(
      variables?: GetUnreadNotificationsCountQueryVariables,
      options?: Omit<UseQueryOptions<GetUnreadNotificationsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUnreadNotificationsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUnreadNotificationsCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUnreadNotificationsCount'] : ['GetUnreadNotificationsCount', variables],
    queryFn: fetcher<GetUnreadNotificationsCountQuery, GetUnreadNotificationsCountQueryVariables>(GetUnreadNotificationsCountDocument, variables),
    ...options
  }
    )};

useGetUnreadNotificationsCountQuery.document = GetUnreadNotificationsCountDocument;

useGetUnreadNotificationsCountQuery.getKey = (variables?: GetUnreadNotificationsCountQueryVariables) => variables === undefined ? ['GetUnreadNotificationsCount'] : ['GetUnreadNotificationsCount', variables];

export const useInfiniteGetUnreadNotificationsCountQuery = <
      TData = InfiniteData<GetUnreadNotificationsCountQuery>,
      TError = GraphQLResponse
    >(
      variables: GetUnreadNotificationsCountQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUnreadNotificationsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUnreadNotificationsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUnreadNotificationsCountQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUnreadNotificationsCount.infinite'] : ['GetUnreadNotificationsCount.infinite', variables],
      queryFn: (metaData) => fetcher<GetUnreadNotificationsCountQuery, GetUnreadNotificationsCountQueryVariables>(GetUnreadNotificationsCountDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUnreadNotificationsCountQuery.getKey = (variables?: GetUnreadNotificationsCountQueryVariables) => variables === undefined ? ['GetUnreadNotificationsCount.infinite'] : ['GetUnreadNotificationsCount.infinite', variables];


useGetUnreadNotificationsCountQuery.fetcher = (variables?: GetUnreadNotificationsCountQueryVariables, options?: RequestInit['headers']) => fetcher<GetUnreadNotificationsCountQuery, GetUnreadNotificationsCountQueryVariables>(GetUnreadNotificationsCountDocument, variables, options);

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
    query GetPostsList($page: Int = 1, $limit: Int = 10, $creatorId: String, $groupId: String, $interestId: String, $postId: String) {
  getPosts(
    page: $page
    limit: $limit
    creatorId: $creatorId
    groupId: $groupId
    interestId: $interestId
    postId: $postId
  ) {
    items {
      __typename
      id
      content
      postPicture
      creator {
        id
        username
        firstName
        lastName
        profilePictureUrl
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
      myReaction
      commentsCount
      createdAt
      updatedAt
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

export const GetPostReactionsDocument = /*#__PURE__*/ `
    query GetPostReactions($postId: String!) {
  getPosts(limit: 1, page: 1, postId: $postId) {
    items {
      reactions {
        like
        dislike
        smile
        angry
        sad
        love
      }
    }
  }
}
    `;

export const useGetPostReactionsQuery = <
      TData = GetPostReactionsQuery,
      TError = GraphQLResponse
    >(
      variables: GetPostReactionsQueryVariables,
      options?: Omit<UseQueryOptions<GetPostReactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostReactionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostReactionsQuery, TError, TData>(
      {
    queryKey: ['GetPostReactions', variables],
    queryFn: fetcher<GetPostReactionsQuery, GetPostReactionsQueryVariables>(GetPostReactionsDocument, variables),
    ...options
  }
    )};

useGetPostReactionsQuery.document = GetPostReactionsDocument;

useGetPostReactionsQuery.getKey = (variables: GetPostReactionsQueryVariables) => ['GetPostReactions', variables];

export const useInfiniteGetPostReactionsQuery = <
      TData = InfiniteData<GetPostReactionsQuery>,
      TError = GraphQLResponse
    >(
      variables: GetPostReactionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPostReactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPostReactionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPostReactionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetPostReactions.infinite', variables],
      queryFn: (metaData) => fetcher<GetPostReactionsQuery, GetPostReactionsQueryVariables>(GetPostReactionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPostReactionsQuery.getKey = (variables: GetPostReactionsQueryVariables) => ['GetPostReactions.infinite', variables];


useGetPostReactionsQuery.fetcher = (variables: GetPostReactionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetPostReactionsQuery, GetPostReactionsQueryVariables>(GetPostReactionsDocument, variables, options);

export const GetAdministrationPostsListDocument = /*#__PURE__*/ `
    query GetAdministrationPostsList($page: Int = 1, $limit: Int = 10, $creatorId: String, $groupId: String, $interestId: String, $postId: String) {
  getPosts(
    page: $page
    limit: $limit
    creatorId: $creatorId
    groupId: $groupId
    interestId: $interestId
    postId: $postId
  ) {
    items {
      id
      content
      postPicture
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

export const GetUserReactionsDocument = /*#__PURE__*/ `
    query GetUserReactions($userId: String!, $page: Int, $limit: Int) {
  getUserReactions(userId: $userId, page: $page, limit: $limit) {
    items {
      __typename
      ... on PostDetail {
        id
        content
        postPicture
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
        commentsCount
        createdAt
        updatedAt
      }
      ... on CommentDetail {
        id
        content
        postId
        creator {
          id
          username
          firstName
          lastName
        }
        reactions {
          like
          dislike
          smile
          angry
          sad
          love
        }
        createdAt
        updatedAt
      }
    }
    total
    page
    limit
  }
}
    `;

export const useGetUserReactionsQuery = <
      TData = GetUserReactionsQuery,
      TError = GraphQLResponse
    >(
      variables: GetUserReactionsQueryVariables,
      options?: Omit<UseQueryOptions<GetUserReactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserReactionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserReactionsQuery, TError, TData>(
      {
    queryKey: ['GetUserReactions', variables],
    queryFn: fetcher<GetUserReactionsQuery, GetUserReactionsQueryVariables>(GetUserReactionsDocument, variables),
    ...options
  }
    )};

useGetUserReactionsQuery.document = GetUserReactionsDocument;

useGetUserReactionsQuery.getKey = (variables: GetUserReactionsQueryVariables) => ['GetUserReactions', variables];

export const useInfiniteGetUserReactionsQuery = <
      TData = InfiniteData<GetUserReactionsQuery>,
      TError = GraphQLResponse
    >(
      variables: GetUserReactionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUserReactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUserReactionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUserReactionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetUserReactions.infinite', variables],
      queryFn: (metaData) => fetcher<GetUserReactionsQuery, GetUserReactionsQueryVariables>(GetUserReactionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUserReactionsQuery.getKey = (variables: GetUserReactionsQueryVariables) => ['GetUserReactions.infinite', variables];


useGetUserReactionsQuery.fetcher = (variables: GetUserReactionsQueryVariables, options?: RequestInit['headers']) => fetcher<GetUserReactionsQuery, GetUserReactionsQueryVariables>(GetUserReactionsDocument, variables, options);

export const CreateReportDocument = /*#__PURE__*/ `
    mutation CreateReport($input: ReportDto!) {
  CreateReport(createReportDto: $input) {
    message
  }
}
    `;

export const useCreateReportMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<CreateReportMutation, TError, CreateReportMutationVariables, TContext>) => {
    
    return useMutation<CreateReportMutation, TError, CreateReportMutationVariables, TContext>(
      {
    mutationKey: ['CreateReport'],
    mutationFn: (variables?: CreateReportMutationVariables) => fetcher<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument, variables)(),
    ...options
  }
    )};

useCreateReportMutation.getKey = () => ['CreateReport'];


useCreateReportMutation.fetcher = (variables: CreateReportMutationVariables, options?: RequestInit['headers']) => fetcher<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument, variables, options);

export const GetReportsDocument = /*#__PURE__*/ `
    query GetReports($userId: String!, $page: Int, $limit: Int) {
  GetReports(userId: $userId, page: $page, limit: $limit) {
    items {
      __typename
      id
      reportMessage
      resolutionMessage
      reportedUser
      reportedComment
      reportedPost
      reportStatus
      reportType
      createdAt
      updatedAt
    }
    total
    page
    limit
  }
}
    `;

export const useGetReportsQuery = <
      TData = GetReportsQuery,
      TError = GraphQLResponse
    >(
      variables: GetReportsQueryVariables,
      options?: Omit<UseQueryOptions<GetReportsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetReportsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetReportsQuery, TError, TData>(
      {
    queryKey: ['GetReports', variables],
    queryFn: fetcher<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, variables),
    ...options
  }
    )};

useGetReportsQuery.document = GetReportsDocument;

useGetReportsQuery.getKey = (variables: GetReportsQueryVariables) => ['GetReports', variables];

export const useInfiniteGetReportsQuery = <
      TData = InfiniteData<GetReportsQuery>,
      TError = GraphQLResponse
    >(
      variables: GetReportsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetReportsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetReportsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetReportsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetReports.infinite', variables],
      queryFn: (metaData) => fetcher<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetReportsQuery.getKey = (variables: GetReportsQueryVariables) => ['GetReports.infinite', variables];


useGetReportsQuery.fetcher = (variables: GetReportsQueryVariables, options?: RequestInit['headers']) => fetcher<GetReportsQuery, GetReportsQueryVariables>(GetReportsDocument, variables, options);

export const GetReportsAdministrationDocument = /*#__PURE__*/ `
    query GetReportsAdministration($userId: String!, $page: Int, $limit: Int) {
  GetReports(userId: $userId, page: $page, limit: $limit) {
    items {
      __typename
      id
      reporter {
        id
        firstName
        lastName
        profilePictureUrl
        username
      }
      reportStatus
      reportMessage
      resolutionMessage
      createdAt
      updatedAt
      reportedUser
      reportedComment
      reportedPost
    }
    total
    page
    limit
  }
}
    `;

export const useGetReportsAdministrationQuery = <
      TData = GetReportsAdministrationQuery,
      TError = GraphQLResponse
    >(
      variables: GetReportsAdministrationQueryVariables,
      options?: Omit<UseQueryOptions<GetReportsAdministrationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetReportsAdministrationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetReportsAdministrationQuery, TError, TData>(
      {
    queryKey: ['GetReportsAdministration', variables],
    queryFn: fetcher<GetReportsAdministrationQuery, GetReportsAdministrationQueryVariables>(GetReportsAdministrationDocument, variables),
    ...options
  }
    )};

useGetReportsAdministrationQuery.document = GetReportsAdministrationDocument;

useGetReportsAdministrationQuery.getKey = (variables: GetReportsAdministrationQueryVariables) => ['GetReportsAdministration', variables];

export const useInfiniteGetReportsAdministrationQuery = <
      TData = InfiniteData<GetReportsAdministrationQuery>,
      TError = GraphQLResponse
    >(
      variables: GetReportsAdministrationQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetReportsAdministrationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetReportsAdministrationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetReportsAdministrationQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetReportsAdministration.infinite', variables],
      queryFn: (metaData) => fetcher<GetReportsAdministrationQuery, GetReportsAdministrationQueryVariables>(GetReportsAdministrationDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetReportsAdministrationQuery.getKey = (variables: GetReportsAdministrationQueryVariables) => ['GetReportsAdministration.infinite', variables];


useGetReportsAdministrationQuery.fetcher = (variables: GetReportsAdministrationQueryVariables, options?: RequestInit['headers']) => fetcher<GetReportsAdministrationQuery, GetReportsAdministrationQueryVariables>(GetReportsAdministrationDocument, variables, options);

export const SendFriendRequestDocument = /*#__PURE__*/ `
    mutation SendFriendRequest($dto: NotificationDto!) {
  AddFriendRequest(addFriendDto: $dto) {
    message
  }
}
    `;

export const useSendFriendRequestMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<SendFriendRequestMutation, TError, SendFriendRequestMutationVariables, TContext>) => {
    
    return useMutation<SendFriendRequestMutation, TError, SendFriendRequestMutationVariables, TContext>(
      {
    mutationKey: ['SendFriendRequest'],
    mutationFn: (variables?: SendFriendRequestMutationVariables) => fetcher<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, variables)(),
    ...options
  }
    )};

useSendFriendRequestMutation.getKey = () => ['SendFriendRequest'];


useSendFriendRequestMutation.fetcher = (variables: SendFriendRequestMutationVariables, options?: RequestInit['headers']) => fetcher<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, variables, options);

export const UpdateFriendDocument = /*#__PURE__*/ `
    mutation UpdateFriend($userId: String!) {
  UpdateFriend(userId: $userId) {
    message
  }
}
    `;

export const useUpdateFriendMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateFriendMutation, TError, UpdateFriendMutationVariables, TContext>) => {
    
    return useMutation<UpdateFriendMutation, TError, UpdateFriendMutationVariables, TContext>(
      {
    mutationKey: ['UpdateFriend'],
    mutationFn: (variables?: UpdateFriendMutationVariables) => fetcher<UpdateFriendMutation, UpdateFriendMutationVariables>(UpdateFriendDocument, variables)(),
    ...options
  }
    )};

useUpdateFriendMutation.getKey = () => ['UpdateFriend'];


useUpdateFriendMutation.fetcher = (variables: UpdateFriendMutationVariables, options?: RequestInit['headers']) => fetcher<UpdateFriendMutation, UpdateFriendMutationVariables>(UpdateFriendDocument, variables, options);

export const UpdateUserConfigurationDocument = /*#__PURE__*/ `
    mutation UpdateUserConfiguration($updateDto: UpdateUserConfigurationDto!) {
  UpdateUserConfiguration(updateDto: $updateDto) {
    message
  }
}
    `;

export const useUpdateUserConfigurationMutation = <
      TError = GraphQLResponse,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserConfigurationMutation, TError, UpdateUserConfigurationMutationVariables, TContext>) => {
    
    return useMutation<UpdateUserConfigurationMutation, TError, UpdateUserConfigurationMutationVariables, TContext>(
      {
    mutationKey: ['UpdateUserConfiguration'],
    mutationFn: (variables?: UpdateUserConfigurationMutationVariables) => fetcher<UpdateUserConfigurationMutation, UpdateUserConfigurationMutationVariables>(UpdateUserConfigurationDocument, variables)(),
    ...options
  }
    )};

useUpdateUserConfigurationMutation.getKey = () => ['UpdateUserConfiguration'];


useUpdateUserConfigurationMutation.fetcher = (variables: UpdateUserConfigurationMutationVariables, options?: RequestInit['headers']) => fetcher<UpdateUserConfigurationMutation, UpdateUserConfigurationMutationVariables>(UpdateUserConfigurationDocument, variables, options);

export const GetFriendRequestDocument = /*#__PURE__*/ `
    query GetFriendRequest($userId: String!) {
  GetFriendRequest(userId: $userId) {
    id
    creator {
      id
    }
    notificationType
    createdAt
  }
}
    `;

export const useGetFriendRequestQuery = <
      TData = GetFriendRequestQuery,
      TError = GraphQLResponse
    >(
      variables: GetFriendRequestQueryVariables,
      options?: Omit<UseQueryOptions<GetFriendRequestQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetFriendRequestQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetFriendRequestQuery, TError, TData>(
      {
    queryKey: ['GetFriendRequest', variables],
    queryFn: fetcher<GetFriendRequestQuery, GetFriendRequestQueryVariables>(GetFriendRequestDocument, variables),
    ...options
  }
    )};

useGetFriendRequestQuery.document = GetFriendRequestDocument;

useGetFriendRequestQuery.getKey = (variables: GetFriendRequestQueryVariables) => ['GetFriendRequest', variables];

export const useInfiniteGetFriendRequestQuery = <
      TData = InfiniteData<GetFriendRequestQuery>,
      TError = GraphQLResponse
    >(
      variables: GetFriendRequestQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetFriendRequestQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetFriendRequestQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetFriendRequestQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetFriendRequest.infinite', variables],
      queryFn: (metaData) => fetcher<GetFriendRequestQuery, GetFriendRequestQueryVariables>(GetFriendRequestDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetFriendRequestQuery.getKey = (variables: GetFriendRequestQueryVariables) => ['GetFriendRequest.infinite', variables];


useGetFriendRequestQuery.fetcher = (variables: GetFriendRequestQueryVariables, options?: RequestInit['headers']) => fetcher<GetFriendRequestQuery, GetFriendRequestQueryVariables>(GetFriendRequestDocument, variables, options);

export const GetUserConfigurationDocument = /*#__PURE__*/ `
    query GetUserConfiguration($userId: String!) {
  GetUserConfiguration(userId: $userId) {
    id
    profileVisibility
    profileBackgroundColor1
    profileBackgroundColor2
    profileBackgroundLightAngle
    friendRequest_Email_Notification
    friendRequest_App_Notification
    postReactedTo_Email_Notification
    postReactedTo_App_Notification
    commentReactedTo_Email_Notification
    commentReactedTo_App_Notification
  }
}
    `;

export const useGetUserConfigurationQuery = <
      TData = GetUserConfigurationQuery,
      TError = GraphQLResponse
    >(
      variables: GetUserConfigurationQueryVariables,
      options?: Omit<UseQueryOptions<GetUserConfigurationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserConfigurationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserConfigurationQuery, TError, TData>(
      {
    queryKey: ['GetUserConfiguration', variables],
    queryFn: fetcher<GetUserConfigurationQuery, GetUserConfigurationQueryVariables>(GetUserConfigurationDocument, variables),
    ...options
  }
    )};

useGetUserConfigurationQuery.document = GetUserConfigurationDocument;

useGetUserConfigurationQuery.getKey = (variables: GetUserConfigurationQueryVariables) => ['GetUserConfiguration', variables];

export const useInfiniteGetUserConfigurationQuery = <
      TData = InfiniteData<GetUserConfigurationQuery>,
      TError = GraphQLResponse
    >(
      variables: GetUserConfigurationQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUserConfigurationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUserConfigurationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUserConfigurationQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetUserConfiguration.infinite', variables],
      queryFn: (metaData) => fetcher<GetUserConfigurationQuery, GetUserConfigurationQueryVariables>(GetUserConfigurationDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUserConfigurationQuery.getKey = (variables: GetUserConfigurationQueryVariables) => ['GetUserConfiguration.infinite', variables];


useGetUserConfigurationQuery.fetcher = (variables: GetUserConfigurationQueryVariables, options?: RequestInit['headers']) => fetcher<GetUserConfigurationQuery, GetUserConfigurationQueryVariables>(GetUserConfigurationDocument, variables, options);

export const GetUserIsFriendDocument = /*#__PURE__*/ `
    query GetUserIsFriend($userId: String!) {
  GetUserIsFriend(userId: $userId) {
    result
  }
}
    `;

export const useGetUserIsFriendQuery = <
      TData = GetUserIsFriendQuery,
      TError = GraphQLResponse
    >(
      variables: GetUserIsFriendQueryVariables,
      options?: Omit<UseQueryOptions<GetUserIsFriendQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserIsFriendQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserIsFriendQuery, TError, TData>(
      {
    queryKey: ['GetUserIsFriend', variables],
    queryFn: fetcher<GetUserIsFriendQuery, GetUserIsFriendQueryVariables>(GetUserIsFriendDocument, variables),
    ...options
  }
    )};

useGetUserIsFriendQuery.document = GetUserIsFriendDocument;

useGetUserIsFriendQuery.getKey = (variables: GetUserIsFriendQueryVariables) => ['GetUserIsFriend', variables];

export const useInfiniteGetUserIsFriendQuery = <
      TData = InfiniteData<GetUserIsFriendQuery>,
      TError = GraphQLResponse
    >(
      variables: GetUserIsFriendQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUserIsFriendQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUserIsFriendQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUserIsFriendQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetUserIsFriend.infinite', variables],
      queryFn: (metaData) => fetcher<GetUserIsFriendQuery, GetUserIsFriendQueryVariables>(GetUserIsFriendDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUserIsFriendQuery.getKey = (variables: GetUserIsFriendQueryVariables) => ['GetUserIsFriend.infinite', variables];


useGetUserIsFriendQuery.fetcher = (variables: GetUserIsFriendQueryVariables, options?: RequestInit['headers']) => fetcher<GetUserIsFriendQuery, GetUserIsFriendQueryVariables>(GetUserIsFriendDocument, variables, options);

export const GetUsersListDocument = /*#__PURE__*/ `
    query GetUsersList($page: Int = 1, $limit: Int = 10, $search: String) {
  getUsers(page: $page, limit: $limit, search: $search) {
    items {
      __typename
      id
      email
      firstName
      lastName
      username
      profilePictureUrl
      friendsCount
      joinedGroupsCount
      postsCount
      userConfiguration {
        __typename
        id
        profileBackgroundColor1
        profileBackgroundColor2
      }
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
      __typename
      id
      username
      firstName
      lastName
      email
      profilePictureUrl
      friendsCount
      createdAt
      updatedAt
      joinedGroupsCount
      reactions {
        like
        dislike
        smile
        angry
        sad
        love
      }
      userConfiguration {
        id
        profileBackgroundColor1
        profileBackgroundColor2
        profileVisibility
        profileBackgroundLightAngle
      }
      commentsCount
      createdAt
      updatedAt
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

export const GetFriendsDocument = /*#__PURE__*/ `
    query GetFriends($page: Int = 1, $limit: Int = 10, $friendOf: String) {
  getUsers(page: $page, limit: $limit, friendOf: $friendOf) {
    items {
      id
      username
      firstName
      lastName
      profilePictureUrl
    }
    total
    page
    limit
  }
}
    `;

export const useGetFriendsQuery = <
      TData = GetFriendsQuery,
      TError = GraphQLResponse
    >(
      variables?: GetFriendsQueryVariables,
      options?: Omit<UseQueryOptions<GetFriendsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetFriendsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetFriendsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetFriends'] : ['GetFriends', variables],
    queryFn: fetcher<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, variables),
    ...options
  }
    )};

useGetFriendsQuery.document = GetFriendsDocument;

useGetFriendsQuery.getKey = (variables?: GetFriendsQueryVariables) => variables === undefined ? ['GetFriends'] : ['GetFriends', variables];

export const useInfiniteGetFriendsQuery = <
      TData = InfiniteData<GetFriendsQuery>,
      TError = GraphQLResponse
    >(
      variables: GetFriendsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetFriendsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetFriendsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetFriendsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetFriends.infinite'] : ['GetFriends.infinite', variables],
      queryFn: (metaData) => fetcher<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetFriendsQuery.getKey = (variables?: GetFriendsQueryVariables) => variables === undefined ? ['GetFriends.infinite'] : ['GetFriends.infinite', variables];


useGetFriendsQuery.fetcher = (variables?: GetFriendsQueryVariables, options?: RequestInit['headers']) => fetcher<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, variables, options);

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
      reactions {
        like
        dislike
        smile
        angry
        sad
        love
      }
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

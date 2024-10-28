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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Different types of roles available */
export enum AdminRole {
  Administrator = 'ADMINISTRATOR',
  Moderator = 'MODERATOR',
  Supervisor = 'SUPERVISOR'
}

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
  action?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
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
  signIn: SignInCredentialsDto;
};


export type MutationSignInUserArgs = {
  signInUser: SignInCredentialsDto;
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
  action?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<CommentDto>>;
  limit?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedUsersResponse = {
  __typename?: 'PaginatedUsersResponse';
  action?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<UserListItemDto>>;
  limit?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PostDetailDto = {
  __typename?: 'PostDetailDto';
  commentsCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  reactions: ReactionsCountDto;
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  GetComments: PaginatedCommentsResponse;
  GetPostDetail: PostDetailDto;
  getUsers: PaginatedUsersResponse;
  hello: Scalars['String']['output'];
  user: UserListItemDto;
};


export type QueryGetCommentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  postId: Scalars['String']['input'];
};


export type QueryGetPostDetailArgs = {
  postId: Scalars['String']['input'];
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

export type ReactionsCountDto = {
  __typename?: 'ReactionsCountDto';
  angry: Scalars['Int']['output'];
  dislike: Scalars['Int']['output'];
  like: Scalars['Int']['output'];
  love: Scalars['Int']['output'];
  sad: Scalars['Int']['output'];
  smile: Scalars['Int']['output'];
};

export type SignInCredentialsDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordRepeat: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  accessToken: Scalars['String']['output'];
  action?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  refreshToken: Scalars['String']['output'];
};

export type UserListItemDto = {
  __typename?: 'UserListItemDto';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  username: Scalars['String']['output'];
};



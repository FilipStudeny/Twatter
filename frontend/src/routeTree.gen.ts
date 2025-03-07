/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SettingsImport } from './routes/settings'
import { Route as SearchImport } from './routes/search'
import { Route as IndexImport } from './routes/index'
import { Route as UsersIndexImport } from './routes/users/index'
import { Route as SettingsProfileImport } from './routes/settings/profile'
import { Route as SettingsAccountImport } from './routes/settings/account'
import { Route as PostCreateImport } from './routes/post/create'
import { Route as PostIdImport } from './routes/post/$id'
import { Route as AuthenticationSignUpImport } from './routes/_authentication/sign-up'
import { Route as AuthenticationSignInImport } from './routes/_authentication/sign-in'
import { Route as AuthenticationForgottenPasswordImport } from './routes/_authentication/forgotten-password'
import { Route as UsersIdIndexImport } from './routes/users/$id/index'
import { Route as UsersIdReportsImport } from './routes/users/$id/reports'

// Create/Update Routes

const SettingsRoute = SettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const SearchRoute = SearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIndexRoute = UsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsProfileRoute = SettingsProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => SettingsRoute,
} as any)

const SettingsAccountRoute = SettingsAccountImport.update({
  id: '/account',
  path: '/account',
  getParentRoute: () => SettingsRoute,
} as any)

const PostCreateRoute = PostCreateImport.update({
  id: '/post/create',
  path: '/post/create',
  getParentRoute: () => rootRoute,
} as any)

const PostIdRoute = PostIdImport.update({
  id: '/post/$id',
  path: '/post/$id',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationSignUpRoute = AuthenticationSignUpImport.update({
  id: '/_authentication/sign-up',
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationSignInRoute = AuthenticationSignInImport.update({
  id: '/_authentication/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationForgottenPasswordRoute =
  AuthenticationForgottenPasswordImport.update({
    id: '/_authentication/forgotten-password',
    path: '/forgotten-password',
    getParentRoute: () => rootRoute,
  } as any)

const UsersIdIndexRoute = UsersIdIndexImport.update({
  id: '/users/$id/',
  path: '/users/$id/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIdReportsRoute = UsersIdReportsImport.update({
  id: '/users/$id/reports',
  path: '/users/$id/reports',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/_authentication/forgotten-password': {
      id: '/_authentication/forgotten-password'
      path: '/forgotten-password'
      fullPath: '/forgotten-password'
      preLoaderRoute: typeof AuthenticationForgottenPasswordImport
      parentRoute: typeof rootRoute
    }
    '/_authentication/sign-in': {
      id: '/_authentication/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof AuthenticationSignInImport
      parentRoute: typeof rootRoute
    }
    '/_authentication/sign-up': {
      id: '/_authentication/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthenticationSignUpImport
      parentRoute: typeof rootRoute
    }
    '/post/$id': {
      id: '/post/$id'
      path: '/post/$id'
      fullPath: '/post/$id'
      preLoaderRoute: typeof PostIdImport
      parentRoute: typeof rootRoute
    }
    '/post/create': {
      id: '/post/create'
      path: '/post/create'
      fullPath: '/post/create'
      preLoaderRoute: typeof PostCreateImport
      parentRoute: typeof rootRoute
    }
    '/settings/account': {
      id: '/settings/account'
      path: '/account'
      fullPath: '/settings/account'
      preLoaderRoute: typeof SettingsAccountImport
      parentRoute: typeof SettingsImport
    }
    '/settings/profile': {
      id: '/settings/profile'
      path: '/profile'
      fullPath: '/settings/profile'
      preLoaderRoute: typeof SettingsProfileImport
      parentRoute: typeof SettingsImport
    }
    '/users/': {
      id: '/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof UsersIndexImport
      parentRoute: typeof rootRoute
    }
    '/users/$id/reports': {
      id: '/users/$id/reports'
      path: '/users/$id/reports'
      fullPath: '/users/$id/reports'
      preLoaderRoute: typeof UsersIdReportsImport
      parentRoute: typeof rootRoute
    }
    '/users/$id/': {
      id: '/users/$id/'
      path: '/users/$id'
      fullPath: '/users/$id'
      preLoaderRoute: typeof UsersIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface SettingsRouteChildren {
  SettingsAccountRoute: typeof SettingsAccountRoute
  SettingsProfileRoute: typeof SettingsProfileRoute
}

const SettingsRouteChildren: SettingsRouteChildren = {
  SettingsAccountRoute: SettingsAccountRoute,
  SettingsProfileRoute: SettingsProfileRoute,
}

const SettingsRouteWithChildren = SettingsRoute._addFileChildren(
  SettingsRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/search': typeof SearchRoute
  '/settings': typeof SettingsRouteWithChildren
  '/forgotten-password': typeof AuthenticationForgottenPasswordRoute
  '/sign-in': typeof AuthenticationSignInRoute
  '/sign-up': typeof AuthenticationSignUpRoute
  '/post/$id': typeof PostIdRoute
  '/post/create': typeof PostCreateRoute
  '/settings/account': typeof SettingsAccountRoute
  '/settings/profile': typeof SettingsProfileRoute
  '/users': typeof UsersIndexRoute
  '/users/$id/reports': typeof UsersIdReportsRoute
  '/users/$id': typeof UsersIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/search': typeof SearchRoute
  '/settings': typeof SettingsRouteWithChildren
  '/forgotten-password': typeof AuthenticationForgottenPasswordRoute
  '/sign-in': typeof AuthenticationSignInRoute
  '/sign-up': typeof AuthenticationSignUpRoute
  '/post/$id': typeof PostIdRoute
  '/post/create': typeof PostCreateRoute
  '/settings/account': typeof SettingsAccountRoute
  '/settings/profile': typeof SettingsProfileRoute
  '/users': typeof UsersIndexRoute
  '/users/$id/reports': typeof UsersIdReportsRoute
  '/users/$id': typeof UsersIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/search': typeof SearchRoute
  '/settings': typeof SettingsRouteWithChildren
  '/_authentication/forgotten-password': typeof AuthenticationForgottenPasswordRoute
  '/_authentication/sign-in': typeof AuthenticationSignInRoute
  '/_authentication/sign-up': typeof AuthenticationSignUpRoute
  '/post/$id': typeof PostIdRoute
  '/post/create': typeof PostCreateRoute
  '/settings/account': typeof SettingsAccountRoute
  '/settings/profile': typeof SettingsProfileRoute
  '/users/': typeof UsersIndexRoute
  '/users/$id/reports': typeof UsersIdReportsRoute
  '/users/$id/': typeof UsersIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/search'
    | '/settings'
    | '/forgotten-password'
    | '/sign-in'
    | '/sign-up'
    | '/post/$id'
    | '/post/create'
    | '/settings/account'
    | '/settings/profile'
    | '/users'
    | '/users/$id/reports'
    | '/users/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/search'
    | '/settings'
    | '/forgotten-password'
    | '/sign-in'
    | '/sign-up'
    | '/post/$id'
    | '/post/create'
    | '/settings/account'
    | '/settings/profile'
    | '/users'
    | '/users/$id/reports'
    | '/users/$id'
  id:
    | '__root__'
    | '/'
    | '/search'
    | '/settings'
    | '/_authentication/forgotten-password'
    | '/_authentication/sign-in'
    | '/_authentication/sign-up'
    | '/post/$id'
    | '/post/create'
    | '/settings/account'
    | '/settings/profile'
    | '/users/'
    | '/users/$id/reports'
    | '/users/$id/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SearchRoute: typeof SearchRoute
  SettingsRoute: typeof SettingsRouteWithChildren
  AuthenticationForgottenPasswordRoute: typeof AuthenticationForgottenPasswordRoute
  AuthenticationSignInRoute: typeof AuthenticationSignInRoute
  AuthenticationSignUpRoute: typeof AuthenticationSignUpRoute
  PostIdRoute: typeof PostIdRoute
  PostCreateRoute: typeof PostCreateRoute
  UsersIndexRoute: typeof UsersIndexRoute
  UsersIdReportsRoute: typeof UsersIdReportsRoute
  UsersIdIndexRoute: typeof UsersIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SearchRoute: SearchRoute,
  SettingsRoute: SettingsRouteWithChildren,
  AuthenticationForgottenPasswordRoute: AuthenticationForgottenPasswordRoute,
  AuthenticationSignInRoute: AuthenticationSignInRoute,
  AuthenticationSignUpRoute: AuthenticationSignUpRoute,
  PostIdRoute: PostIdRoute,
  PostCreateRoute: PostCreateRoute,
  UsersIndexRoute: UsersIndexRoute,
  UsersIdReportsRoute: UsersIdReportsRoute,
  UsersIdIndexRoute: UsersIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/search",
        "/settings",
        "/_authentication/forgotten-password",
        "/_authentication/sign-in",
        "/_authentication/sign-up",
        "/post/$id",
        "/post/create",
        "/users/",
        "/users/$id/reports",
        "/users/$id/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/search": {
      "filePath": "search.tsx"
    },
    "/settings": {
      "filePath": "settings.tsx",
      "children": [
        "/settings/account",
        "/settings/profile"
      ]
    },
    "/_authentication/forgotten-password": {
      "filePath": "_authentication/forgotten-password.tsx"
    },
    "/_authentication/sign-in": {
      "filePath": "_authentication/sign-in.tsx"
    },
    "/_authentication/sign-up": {
      "filePath": "_authentication/sign-up.tsx"
    },
    "/post/$id": {
      "filePath": "post/$id.tsx"
    },
    "/post/create": {
      "filePath": "post/create.tsx"
    },
    "/settings/account": {
      "filePath": "settings/account.tsx",
      "parent": "/settings"
    },
    "/settings/profile": {
      "filePath": "settings/profile.tsx",
      "parent": "/settings"
    },
    "/users/": {
      "filePath": "users/index.tsx"
    },
    "/users/$id/reports": {
      "filePath": "users/$id/reports.tsx"
    },
    "/users/$id/": {
      "filePath": "users/$id/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

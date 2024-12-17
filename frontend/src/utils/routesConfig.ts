export const AppRoutes = {
    HOME: {
        _: "/home",
        INTEREST: "/interest",
        GROUP: "/interest/group",
    },
    PROFILE: "/profile",
    CHAT: {
        MESSAGES: "/messages",
        REPORTED_MESSAGES: "/messages/reported",
    },
    AUTH: {
        SIGN_UP: "/sign-up",
        SIGN_IN: "/sign-in",
        SIGN_OUT: "/terminate",
    },
    SETTINGS: {
        _: "/settings",
        NOTIFICATIONS: "/settings/notifications",
    },
    DASHBOARD: {
        _: "/dashboard",
        ADMIN: { PROFILE: "/dashboard/profile/:id" },
        USERS: {
            _: "/dashboard/users",
            USER_DETAIL: {
                _: "/dashboard/users/user/:id",
                POST_DETAIL: { _: "/dashboard/users/user/:id/post/:postId" },
                COMMENT_DETAIL: { _: "/dashboard/users/user/:id/comment/:commentId" },
            },
        },
        POSTS: {
            _: "/dashboard/posts",
            POST_DETAIL: {
                _: "/dashboard/posts/post/:id",
                REPORTS: "/dashboard/posts/post/:id/reports",
            },
        },
    },
} as const;

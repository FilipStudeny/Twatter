// routes.js
export const AppRoutes = {
	SignIn: {
		path: "/sign-in",
	},
	DashBoard: {
		path: "/dashboard",
		Admin: {
			AdminProfile: "/dashboard/profile/:id",
		},
		Users: {
			path: "/dashboard/users",
			UserDetail: {
				path: "/dashboard/users/user/:id",
				UserPostDetail: {
					path: "/dashboard/users/user/:id/post/:postId",
				},
				UserCommentDetail: {
					path: "/dashboard/users/user/:id/comment/:commentId",
				},
			},
		},
		Posts: {
			path: "/dashboard/posts",
			PostDetail: {
				path: "/dashboard/posts/post/:id",
				PostReports: {
					path: "/dashboard/posts/post/:id/reports",
				},
			},
		},
	},
};

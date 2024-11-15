import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Typography, Card, message } from "antd";

import request from "graphql-request";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;

interface LoginFormValues {
	email: string;
	password: string;
	remember: boolean;
}

const SignIn: React.FC = () => {
	const navigate = useNavigate();

	const { } = useQuery('', () => {
		request()
	})

	const onFinish = (values: LoginFormValues) => {
		const { email, password } = values;
		// Simulate authentication
		if (email === "admin@example.com" && password === "password") {
			message.success("Login successful!");
			navigate("/");
		} else {
			message.error("Invalid email or password.");
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#f0f2f5",
				padding: "0 16px",
			}}
		>
			<Card style={{ maxWidth: 400, width: "100%" }}>
				<div style={{ textAlign: "center", marginBottom: 24 }}>
					<Title level={2}>Sign In</Title>
					<Text type='secondary'>Welcome back! Please log in to your account.</Text>
				</div>
				<Form name='sign_in' initialValues={{ remember: true }} onFinish={onFinish} layout='vertical'>
					<Form.Item
						name='email'
						label='Email'
						rules={[
							{ required: true, message: "Please input your Email!" },
							{ type: "email", message: "Please enter a valid email!" },
						]}
					>
						<Input prefix={<UserOutlined />} placeholder='Email' size='large' />
					</Form.Item>

					<Form.Item
						name='password'
						label='Password'
						rules={[{ required: true, message: "Please input your Password!" }]}
					>
						<Input.Password prefix={<LockOutlined />} placeholder='Password' size='large' />
					</Form.Item>

					<Form.Item>
						<div
							style={{
								display: "flex",
								justifyContent: "end",
								alignItems: "center",
							}}
						>
							<Link href='/forgot-password'>Forgot password?</Link>
						</div>
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' size='large' style={{ width: "100%" }}>
							Sign In
						</Button>
					</Form.Item>

					<div style={{ textAlign: "center" }}>
						<Text>Don't have an account? </Text>
						<Link href='/register'>Sign up now</Link>
					</div>
				</Form>
			</Card>
		</div>
	);
};

export default SignIn;

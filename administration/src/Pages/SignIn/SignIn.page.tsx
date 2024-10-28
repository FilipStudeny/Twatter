import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Typography, Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface LoginFormValues {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const navigate = useNavigate();

	const onFinish = (values: LoginFormValues) => {
		const { email, password } = values;
		if (email && password) {
			navigate("/dashboard");
		} else {
			alert("Please enter valid credentials");
		}
	};

	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#f0f2f5",
			}}
		>
			<Card style={{ width: 400 }}>
				<div style={{ textAlign: "center", marginBottom: 24 }}>
					<Title level={2}>Admin Login</Title>
				</div>
				<Form name='admin_login' initialValues={{ remember: true }} onFinish={onFinish}>
					<Form.Item
						name='email'
						rules={[
							{ required: true, message: "Please input your Email!" },
							{ type: "email", message: "Please enter a valid email!" },
						]}
					>
						<Input prefix={<UserOutlined />} placeholder='Email' size='large' />
					</Form.Item>

					<Form.Item name='password' rules={[{ required: true, message: "Please input your Password!" }]}>
						<Input.Password prefix={<LockOutlined />} placeholder='Password' size='large' />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' size='large' style={{ width: "100%" }}>
							Sign In
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default SignIn;

import {
	AppstoreOutlined,
	BarChartOutlined,
	CloudOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ShopOutlined,
	TeamOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
	CloseOutlined, // Import the CloseOutlined icon
} from "@ant-design/icons";
import { Button, Layout as PreLayout, Menu, theme, MenuProps, Drawer, Grid } from "antd";
import React, { useState } from "react";

const { Header, Sider, Content } = PreLayout;
const { useBreakpoint } = Grid;

const siderStyle: React.CSSProperties = {
	overflow: "auto",
	height: "100vh",
	position: "fixed",
	insetInlineStart: 0,
	top: 0,
	bottom: 0,
	scrollbarWidth: "thin",
	scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	BarChartOutlined,
	CloudOutlined,
	AppstoreOutlined,
	TeamOutlined,
	ShopOutlined,
].map((icon, index) => ({
	key: String(index + 1),
	icon: React.createElement(icon),
	label: `nav ${index + 1}`,
}));

const Layout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const screens = useBreakpoint();

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const isMobile = !screens.md;

	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};

	return (
		<>
			{isMobile && (
				<>
					<Button
						type='primary'
						onClick={toggleDrawer}
						style={{
							position: "fixed",
							top: 16,
							left: 16,
							zIndex: 1000,
						}}
					>
						{drawerVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
					</Button>
					<Drawer
						placement='left'
						closable
						onClose={toggleDrawer}
						open={drawerVisible}
						bodyStyle={{ padding: 0 }}
						getContainer={false}
						style={{ position: "fixed" }}
						// Set the header style to match the dark theme
						headerStyle={{ backgroundColor: "#001529", color: "white" }}
						// Customize the close icon color
						closeIcon={<CloseOutlined style={{ color: "white" }} />}
					>
						<Menu
							theme='dark'
							mode='inline'
							defaultSelectedKeys={["1"]}
							items={items}
							style={{ width: "100%", height: "100%", paddingTop: "10px" }}
						/>
					</Drawer>
				</>
			)}
			<PreLayout style={{ minHeight: "100vh" }}>
				{!isMobile && (
					<Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={siderStyle} width={200}>
						<Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]} items={items} />
					</Sider>
				)}
				<PreLayout
					style={{
						marginLeft: isMobile ? 0 : collapsed ? 80 : 200,
						transition: "margin 0.2s",
					}}
				>
					<Header style={{ padding: 0, background: colorBgContainer }}>
						{!isMobile && (
							<Button
								type='text'
								icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
								onClick={() => setCollapsed(!collapsed)}
								style={{
									fontSize: "16px",
									width: 64,
									height: 64,
								}}
							/>
						)}
					</Header>
					<Content
						style={{
							margin: "24px 16px",
							padding: 24,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						Content
						{
							// indicates very long content
							Array.from({ length: 100 }, (_, index) => (
								<React.Fragment key={index}>
									{index % 20 === 0 && index ? "more" : "..."}
									<br />
								</React.Fragment>
							))
						}
					</Content>
				</PreLayout>
			</PreLayout>
		</>
	);
};

export default Layout;

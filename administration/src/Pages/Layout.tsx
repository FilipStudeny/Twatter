import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Descriptions } from "antd";

const content = (
	<Descriptions size='small' column={2}>
		<Descriptions.Item label='创建人'>张三</Descriptions.Item>
		<Descriptions.Item label='联系方式'>
			<a>421421</a>
		</Descriptions.Item>
		<Descriptions.Item label='创建时间'>2017-01-10</Descriptions.Item>
		<Descriptions.Item label='更新时间'>2017-10-10</Descriptions.Item>
		<Descriptions.Item label='备注'>中国浙江省杭州市西湖区古翠路</Descriptions.Item>
	</Descriptions>
);

const Layout = () => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	return (
		<ProLayout
			menuDataRender={() => [
				{
					path: "/item1",
					name: "Nav Item 1",
				},
				{
					path: "/item2",
					name: "Nav Item 2",
				},
				{
					path: "/item3",
					name: "Nav Item 3",
				},
			]}
		>
			<PageContainer fixedHeader content={content}>
				<ProCard
					direction='column'
					ghost
					gutter={[0, 16]}
					style={{
						height: "200vh",
					}}
				>
					<ProCard style={{ height: 200 }} />
					<ProCard gutter={16} ghost style={{ height: 200 }}>
						<ProCard colSpan={16} />
						<ProCard colSpan={8} />
					</ProCard>
				</ProCard>
			</PageContainer>
		</ProLayout>
	);
};

export default Layout;

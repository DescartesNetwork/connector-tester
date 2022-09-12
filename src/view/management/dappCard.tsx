import { useSelector } from 'react-redux'

import { Avatar, Card, Col, Row, Space, Typography } from 'antd'

import { AppState } from 'model'

export type DAppCardProps = { appId: string }

const DAppCard = ({ appId }: DAppCardProps) => {
  const { name, description } = useSelector(
    (state: AppState) => state.dapp[appId],
  )

  return (
    <Card bodyStyle={{ padding: 24 }}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Space>
            <Avatar size={48} />
            <Space direction="vertical">
              <Typography.Title level={5}>{name}</Typography.Title>
              <Typography.Text>{description}</Typography.Text>
            </Space>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default DAppCard

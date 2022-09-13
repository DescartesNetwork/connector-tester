import { useSelector } from 'react-redux'

import { Card, Col, Row, Space, Typography } from 'antd'

import { AppState } from 'model'
import AppIcon from 'components/appIcon'

export type DAppCardProps = { appId: string }

const DAppCard = ({ appId }: DAppCardProps) => {
  const { name, description } = useSelector(
    (state: AppState) => state.dapp[appId],
  )

  return (
    <Card bodyStyle={{ padding: 24 }}>
      <Row gutter={[12, 12]} wrap={false} align="middle">
        <Col>
          <AppIcon appId={appId} name={false} />
        </Col>
        <Col flex="auto">
          <Space direction="vertical">
            <Typography.Title level={5}>{name}</Typography.Title>
            <Typography.Text>{description}</Typography.Text>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default DAppCard

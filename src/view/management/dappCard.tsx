import { useDispatch, useSelector } from 'react-redux'

import { useCallback, useState } from 'react'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import AppIcon from 'components/appIcon'
import IonIcon from '@sentre/antd-ionicon'

import { AppDispatch, AppState } from 'model'
import { deleteDApp } from 'model/dapp.controller'

export type DAppCardProps = { appId: string }

const DAppCard = ({ appId }: DAppCardProps) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { name, description } = useSelector(
    (state: AppState) => state.dapp[appId],
  )

  const onDelete = useCallback(async () => {
    try {
      setLoading(true)
      await dispatch(deleteDApp(appId)).unwrap()
      return window.notify({ type: 'success', description: `Delist ${name}!` })
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      return setLoading(false)
    }
  }, [dispatch, appId, name])

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
        <Col>
          <Button
            type="text"
            icon={<IonIcon name="trash-outline" />}
            onClick={onDelete}
            loading={loading}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default DAppCard

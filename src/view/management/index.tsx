import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row, Typography } from 'antd'
import DAppCard from './dappCard'

import { AppDispatch, AppState } from 'model'
import { getDApps } from 'model/dapp.controller'

const Management = () => {
  const dispatch = useDispatch<AppDispatch>()
  const dapps = useSelector((state: AppState) => state.dapp)

  useEffect(() => {
    dispatch(getDApps())
  }, [dispatch])

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Typography.Title level={4}>My DApps</Typography.Title>
      </Col>
      {Object.keys(dapps).map((appId) => (
        <Col key={appId} span={24}>
          <DAppCard appId={appId} />
        </Col>
      ))}
    </Row>
  )
}

export default Management

import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Empty, Row, Typography } from 'antd'
import DAppCard from 'components/dappCard'

import { AppDispatch, AppState } from 'model'
import { getDApps } from 'model/dapp.controller'

const Management = () => {
  const dispatch = useDispatch<AppDispatch>()
  const dapps = useSelector((state: AppState) => state.dapp)
  const dappIds = useMemo(() => Object.keys(dapps), [dapps])

  useEffect(() => {
    dispatch(getDApps())
  }, [dispatch])

  return (
    <Row gutter={[12, 12]} justify="center">
      <Col span={24}>
        <Typography.Title
          level={4}
        >{`My DApps (${dappIds.length})`}</Typography.Title>
      </Col>
      {!dappIds.length ? (
        <Col>
          <Empty />
        </Col>
      ) : (
        dappIds.map((appId) => (
          <Col key={appId} span={24}>
            <DAppCard appId={appId} />
          </Col>
        ))
      )}
    </Row>
  )
}

export default Management

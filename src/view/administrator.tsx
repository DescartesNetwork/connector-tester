import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Empty, Row, Typography } from 'antd'
import DAppCard from 'components/dappCard'

import { AppDispatch, AppState } from 'model'
import { getAllDApps } from 'model/admin.controller'

const Administrator = () => {
  const dispatch = useDispatch<AppDispatch>()
  const dapps = useSelector((state: AppState) => state.admin)
  const dappIds = useMemo(() => Object.keys(dapps), [dapps])

  useEffect(() => {
    dispatch(getAllDApps())
  }, [dispatch])

  return (
    <Row gutter={[12, 12]} justify="center">
      <Col xs={24} md={18}>
        <Row gutter={[12, 12]} justify="center">
          <Col span={24}>
            <Typography.Title
              level={4}
            >{`All DApps (${dappIds.length})`}</Typography.Title>
          </Col>
          {!dappIds.length ? (
            <Col>
              <Empty />
            </Col>
          ) : (
            dappIds.map((appId) => (
              <Col key={appId} span={24}>
                <DAppCard appId={appId} isAdmin />
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default Administrator

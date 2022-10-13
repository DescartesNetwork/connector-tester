import { useState, useEffect, useCallback, useMemo } from 'react'
import { Gateway } from '@sentre/connector'

import { Button, Card, Col, Input, Row } from 'antd'

const Tester = () => {
  const [tmpSrc, setTmpSrc] = useState('')
  const [src, setSrc] = useState('https://sentre.io/')
  const [appId, setAppId] = useState('')

  const frameId = useMemo(() => appId + '-iframe', [appId])
  const onSrc = useCallback(() => setSrc(tmpSrc), [tmpSrc])
  const onRefresh = useCallback(() => {
    const iframe = document.getElementById(frameId) as HTMLIFrameElement | null
    if (iframe) iframe.src += ''
  }, [frameId])

  useEffect(() => {
    const gateway = new Gateway(window.sentre.solana)
    return gateway.terminate
  }, [])

  return (
    <Row gutter={[12, 12]}>
      <Col span={8}>
        <Input
          value={appId}
          onChange={(e) => setAppId(e.target.value || '')}
          placeholder="my_app_id"
        />
      </Col>
      <Col span={16}>
        <Input
          value={tmpSrc}
          onChange={(e) => setTmpSrc(e.target.value || '')}
          placeholder="http://localhost:3000"
          suffix={
            <Button
              type="text"
              size="small"
              onClick={tmpSrc === src ? onRefresh : onSrc}
              disabled={!tmpSrc}
              style={{ marginRight: -7 }}
            >
              {tmpSrc === src ? 'Refresh' : 'Save'}
            </Button>
          }
        />
      </Col>
      <Col span={24}>
        <Card bodyStyle={{ padding: 16, height: 'calc(100vh - 128px)' }}>
          <iframe
            id={frameId}
            src={src}
            title="Senhub Connector Tester."
            style={{
              height: '100%',
              width: '100%',
              border: 'none',
              borderRadius: 8,
            }}
            loading="lazy"
            allowFullScreen
          />
        </Card>
      </Col>
    </Row>
  )
}

export default Tester

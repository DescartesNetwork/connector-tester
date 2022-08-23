import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Col, Row, Space, Typography, Upload } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppDispatch } from 'model'
import { getDApps, submitDApp } from 'model/dapp.controller'

const Submission = () => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File>()
  const dispatch = useDispatch<AppDispatch>()

  const onUpload = (file: File) => {
    setFile(file)
    return false
  }
  const onRemove = () => {
    setFile(undefined)
    return true
  }
  const onSubmit = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      try {
        e.stopPropagation()
        setLoading(true)
        await dispatch(submitDApp(undefined as any))
      } catch (er: any) {
        return window.notify({ type: 'error', description: er.message })
      } finally {
        return setLoading(false)
      }
    },
    [dispatch],
  )

  useEffect(() => {
    dispatch(getDApps())
  }, [dispatch])

  return (
    <Row gutter={[12, 12]} justify="center">
      <Col xs={24} md={18}>
        <Upload.Dragger
          accept=".json"
          beforeUpload={onUpload}
          onRemove={onRemove}
          maxCount={1}
        >
          <Space direction="vertical" size="large" align="center">
            <Typography.Title level={3}>
              Click or Drop file to upload the Manifest
            </Typography.Title>
            <Typography.Text>
              The accepted file type is only <code>.json</code>.
            </Typography.Text>
            <Space>
              <Button icon={<IonIcon name="cloud-upload-outline" />}>
                Upload
              </Button>
              {file && (
                <Button
                  type="primary"
                  icon={<IonIcon name="paper-plane-outline" />}
                  onClick={onSubmit}
                  loading={loading}
                >
                  Submit
                </Button>
              )}
            </Space>
          </Space>
        </Upload.Dragger>
      </Col>
    </Row>
  )
}

export default Submission

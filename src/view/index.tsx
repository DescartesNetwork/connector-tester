import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppRoute } from '@sentre/senhub'

import { Col, Row, Segmented } from 'antd'
import Tester from './tester'
import Submission from './submission'

export enum Category {
  Tester = 'connector-tester',
  Submission = 'dapp-submission',
}

setInterval(() => {
  console.log('run in background')
}, 3000)

const SubApp = ({ type = Category.Tester }: { type?: Category }) => {
  if (type === Category.Submission) return <Submission />
  return <Tester />
}

const View = () => {
  const { to } = useAppRoute()
  const { search } = useLocation()
  const tab = useMemo(() => {
    const params = new URLSearchParams(search)
    const value = params.get('tab') as Category
    if (!Object.values(Category).includes(value)) return Category.Tester
    return value
  }, [search])

  const setTab = useCallback((value: Category) => to(`?tab=${value}`), [to])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[24, 24]} justify="center">
          <Col>
            <Segmented
              options={[
                { label: 'Connector Tester', value: Category.Tester },
                { label: 'DApp Submission', value: Category.Submission },
              ]}
              value={tab}
              onChange={(e) => setTab(e as Category)}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <SubApp type={tab} />
      </Col>
    </Row>
  )
}

export default View

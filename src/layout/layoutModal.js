import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { modalHide } from '../reducer'
import { Modal } from 'antd'

const LayoutModal = props => {
  //   const dispatch = useDispatch()
  // const modal = useSelector(Api.selectLayoutModalReducer)
  const Config = {
    title: '公告',
    footer: null,
    onCancel: () => {
      // dispatch(modalHide())
    }
  }
  return (
    <Modal {...Config} getContainer={true} visible={modal.visible}>
      <div className="notice-warpper">
        <Row className="notice-header">
          <Col span={8}>版本：6.0</Col>
          <Col span={12}>发布时间：2019-12-13</Col>
        </Row>
        <div className="notice-content">
          -- 新功能、体验改进和修复 -- <br />
          【6.0界面交互升级】
          <br />
          1. 炫酷科技感数仓视觉，报表全局可视化，数据展示更直观~
          <br />
          <br />
          近期更新：
          <br />
          【实验指标配置化】
          <br />
          1. 基础指标无需提供取数规则，提升用户实验接入体验、效率
          <br />
          2. 快速接入实验，指标自动化配置，即配即用
          <br />
          *叮~叮~浏览器缓存清空后，刷新界面，体验更佳噢~
        </div>
      </div>
    </Modal>
  )
}

export default LayoutModal

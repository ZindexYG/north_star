import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// UI Component
import { Layout, Dropdown, Menu } from 'antd'
// style
import HaedaerStyle from './Header.module.less'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchLogOut } from '@/redux/authSlice'
// type
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import type { MenuInfo } from 'rc-menu/lib/interface'
// node_modules/
const { Header: HeaderLayout } = Layout

const Header = () => {
  const items: ItemType[] = [
    {
      label: <div className={HaedaerStyle.Item}>Info</div>,
      key: 1,
    },
    {
      key: 0,
      label: <div className={HaedaerStyle.Item}>LogOut</div>,
    },
  ]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onClick = async ({ key }: MenuInfo) => {
    switch (key) {
      case '1':
        navigate('/Main/User')
        break
      case '0':
        dispatch(fetchLogOut())
        break
      default:
        break
    }
  }
  const status = useSelector(state => state.authSlice.status)
  useEffect(() => {
    if (status === 'logOut_succeeded') {
      navigate('/Login')
    }
  }, [status])
  return (
    <HeaderLayout className={HaedaerStyle['container']}>
      <Dropdown overlay={<Menu onClick={onClick} items={items} />}>
        <div className={HaedaerStyle.user}>User</div>
      </Dropdown>
    </HeaderLayout>
  )
}

export default Header

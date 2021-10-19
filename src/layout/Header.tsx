import { Button } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

import AjaibLogo from '../assets/Images/logo.png'

export default function Header() {
    return (
        <div className='mainLayout__header'>
            <img src={AjaibLogo} alt="" />
            <Button type='text' size='small' icon={<MoreOutlined />}></Button>
        </div>
    )
}

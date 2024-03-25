import React from 'react'
import { CustomDrawer } from '../../components/CustomDrawer/CustomDrawer'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

const Homepage = () => {
    const icons = [AccountBoxIcon,JoinInnerIcon,ContactSupportIcon,InfoIcon,LogoutIcon]
  return (
    <>
    <CustomDrawer items={['Profile', 'Matches','Support','About Us', 'Logout']} icons = {icons}/>
    </>
  )
}

export default Homepage
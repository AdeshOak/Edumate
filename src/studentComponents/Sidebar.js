import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  left: ${({ sidebar }) => (sidebar ? '200' : '-100%')};
  transition: left 1.5s ease-in-out;
  z-index: 10;
`

const SidebarWrap = styled.div`
  width: 100%;
`

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false)

  const [selectedItem, setSelectedItem] = useState(SidebarData[0])

  const showSidebar = () => setSidebar(!sidebar)
  if (selectedItem.title) console.log(selectedItem.title)
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} setSelectedItem={setSelectedItem} />
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar

import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  
  {
    component: CNavGroup,
    name: 'users',
    to: '/users',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All User',
        to: '/users/all-users',
      },
      {
        component: CNavItem,
        name: 'Add New User',
        to: '/users/add-new-user',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'WorkersProfile',
    to: '/workers',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Workers',
        to: '/workers/all-workers',
      },
      {
        component: CNavItem,
        name: 'Add New Worker',
        to: '/workers/add-new-worker',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'PendingWorkersProfile',
    to: '/workers',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Pendind Workers',
        to: '/pendingworkers/all-pending-workers',
      },
      // {
      //   component: CNavItem,
      //   name: 'Add New Worker',
      //   to: '/workers/add-new-worker',
      // },
    ],
  },
  
]

export default _nav

import { ReactNode } from 'react';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Dashboard',
        link: '/dashboard',
        icon: DesignServicesTwoToneIcon
      }
    ]
  },
  {
    heading: 'App',
    items: [
      {
        name: 'Access Keys',
        icon: SupervisedUserCircleIcon,
        link: '/management/clients'
      }
    ]
  }
];

export default menuItems;

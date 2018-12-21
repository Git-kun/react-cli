import * as React from "react";
import {
  TabBar,
  TabBarItem,
  Icon
} from "react-weui";

import history from "../history";



export function Navigation() {

  const BottomMenu = [
    {
      label: 'Tab1',
      icon: (<Icon value="success"></Icon>),
      action: true,
      onClick: () => {
        history.push('/')
      }
    },
    {
      label: 'Tab2',
      icon: (<Icon value="success"></Icon>),
      action: true,
      onClick: () => {
        history.push('/msg')
      }
    },
    {
      label: 'Tab3',
      icon: (<Icon value="success"></Icon>),
      action: true,
      onClick: () => {
        history.push('/login')
      }
    }
  ]

  return (
    <TabBar>
      {
        BottomMenu.map((item, key) => {
          return (
            <TabBarItem
              key={key + item.label}
              icon={item.icon}
              label={item.label}
              action={item.action}
              onClick={item.onClick}
            >
            </TabBarItem>
          );
        })
      }
    </TabBar>
  );
}
import { ReactNode } from 'react';
import '../styles/login.scss';
import Sidebar from './sidebar';

interface IDashboardItem {
    item: ReactNode
}


export default function DashboardItem({item}: IDashboardItem) {

  return (
    <div>
        <Sidebar/>
        <div className="sidebar-margin">
            {item}
        </div>
    </div>    
  );
}

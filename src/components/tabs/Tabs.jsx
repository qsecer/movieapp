import React from 'react';
import { Tabs } from 'antd';

const items = [
    {
        key: '1',
        label: 'Search',
    },
    {
        key: '2',
        label: 'Raited',
    }
];

const MyTabs = ({setTab, tab}) => <Tabs defaultActiveKey={tab} items={items} onChange={(key) => {setTab(key)}}
/>;
export default MyTabs;

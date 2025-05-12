import React from 'react';
import { Tabs } from 'antd';

const onChange = (key) => {
    console.log(key);
};

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


const MyTabs = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default MyTabs;

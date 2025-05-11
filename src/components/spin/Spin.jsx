import React from 'react';
import { Flex, Spin } from 'antd';
import './Spin.css'

const Spinner = () => (
    <Flex align="center" gap="large" >
        <Spin size="large" className='spinner'/>
    </Flex>
);

export default Spinner;
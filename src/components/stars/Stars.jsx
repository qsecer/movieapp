import React from 'react';
import { Rate } from 'antd';
import './stars.css';

const Stars = ({ value, onChange }) => {
    return (
        <Rate
            className='stars'
            allowHalf
            count={10}
            value={value}
            onChange={onChange}
        />
    );
};

export default Stars;

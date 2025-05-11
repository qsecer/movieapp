import React from 'react';
import { Pagination } from 'antd';

const Pag = ({ numberOfPage, setNumberOfPage, ref }) => (
    (<>
        <Pagination align="center" defaultCurrent={numberOfPage} total={50} ref={ref}onChange={(page)=>{setNumberOfPage(page)}}
        />
    </>)
);

export default Pag;
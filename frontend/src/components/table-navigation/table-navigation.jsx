import { Space, Button, message, Skeleton } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Table from '../table/table';
import TableColumn from '../table-column/table-column';
import PropTypes from 'prop-types';
import { useState } from 'react';

function TableNavigation() {
    const [navigation, setNavigation] = useState({to: "table"});

    const handleNavigation = (navigation) => {
        setNavigation(navigation);
    }
       
    const render = () => {
        switch(navigation.to) {
            case "table": return <Table handleNavigation={handleNavigation} />;
            case "column": return <TableColumn />

            default: return <></>
        }
    }

    return (
        <>{render()}</>        
    )
}

export default TableNavigation

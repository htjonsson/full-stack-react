
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

function BusinessEntityBreadcrumb({name}) { 

    return (
        <>
            <Breadcrumb items={[
                { title: <Link to={'/business-entity/'}><span>BUSINESS ENTITY</span></Link>},
                { title: <span>{name}</span> }
            ]} />
        </>
    )
}

BusinessEntityBreadcrumb.propTypes = {
    name: PropTypes.string
}

export default BusinessEntityBreadcrumb
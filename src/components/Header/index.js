import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';
import Button from "../Button";

const Header = ({title, showForm, showAddTask}) => {
    const location = useLocation();

    return (
        <header className='header' >
            <h1 >{title}</h1>
            {location.pathname === '/' && <Button color={showAddTask ? 'black' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={showForm}/>}
        </header>
    );
};

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// const headingStyle = {
//     color: 'red',
//     fontSize: '12px'
// }

export default Header;

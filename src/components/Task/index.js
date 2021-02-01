import PropTypes from 'prop-types';
import { FaTimes } from "react-icons/all";

const Task = ({data: {id, text, reminder, day,}, onDelete, onToggle}) => {
    return (
        <li className={`task ${reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(id)}>
            <h3>{text} <FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick={() => onDelete(id)} /></h3>
            <p>{day}</p>
        </li>
    );
};

Task.propTypes = {
    data: PropTypes.object
};

export default Task;

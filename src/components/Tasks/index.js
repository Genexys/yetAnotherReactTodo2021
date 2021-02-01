import PropTypes from 'prop-types';
import Task from "../Task";


const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        <ul>
            {tasks.map(task => <Task key={task.id} data={task} onDelete={onDelete} onToggle={onToggle} />)}
        </ul>
    );
};

Tasks.propTypes = {};

export default Tasks;

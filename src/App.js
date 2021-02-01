import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./pages/About";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
     const getTask = async () => {
         const tasksFromServer = await fetchTask();
         setTasks([...tasks, ...tasksFromServer]);
     }

        getTask();

    }, [])

    const fetchTask = async () => {
        const res = await fetch(`http://localhost:5000/tasks`)
        const data = await res.json();

        return data
    }

    const fetchTaskSingle = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json();

        return data
    }

    const showForm = () => {
        setShowAddTask(!showAddTask)
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        });

        setTasks(tasks.filter(task => task.id !== id));
    }

    const toggleReminder = async (id) => {

        const taskToToggle = await fetchTaskSingle(id);
        const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updateTask)
        })

        const data = await res.json();

        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task));
    }

    const addTask = async (task) => {
        const id = uuidv4();
        const newTask = {id, ...task}

        setTasks([
            ...tasks,
            newTask
        ])

        await fetch('http://localhost:5000/tasks/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newTask)
        })
    }

    return (
        <Router>
            <div className="container">
                <Header title='TaskTracker' showForm={showForm} showAddTask={showAddTask}/>

                <Route path='/' exact render={(props) => (
                    <>
                        {showAddTask && <AddTask onAdd={addTask}/>}
                        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks' }
                    </>
                )} />

                <Route path='/about' component={About}/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;

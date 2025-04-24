import { useState, useEffect } from 'react'
import './App.css'

/* 
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm run dev 
*/

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TaskTableComponentProps {
  filteredTaskList: Task[];
  handleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
}

type FilterOptions = "all" | "completed" | "not-completed";

const TaskTableComponent: React.FC<TaskTableComponentProps> = ({filteredTaskList, handleComplete, handleDelete}) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Completed</th>
            <th>Task Name</th>
            <th>Delete Task</th>
          </tr>

        </thead>
        <tbody>
        {filteredTaskList.map((task: Task) => (
          <tr key={task.id}>
            <td>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task.id)}
              />
            </td>
              <td>
            {task.name}
            </td>
            <td>
            <button onClick={() => handleDelete(task.id)} style={{padding: "2px"}}>Delete</button>
          </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

function App() {
  const [taskName, setTaskName] = useState<string>("")
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filteredTaskList, setFilteredTaskList] = useState<Task[]>([])
  const [filterOption, setFilterOption] = useState<FilterOptions>("all")

  const addTask = () => {
    // validate taskName
    if (!taskName.trim()) return

    // create new task
    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      completed: false
    }

    // add newTask to the taskList
    const updatedTaskList = [...taskList, newTask]

    // update taskList
    setTaskList(updatedTaskList)

    // clear taskName
    setTaskName("")
  }

  const completeTask = (id: number) => {
    // iterate tasks and toggle completed status if matching id
    const updatedTasks = taskList.map((task) => (
      task.id === id ? {...task, completed: !task.completed} : task
    ))
    setTaskList(updatedTasks);
  }

  const deleteTask = (id: number) => {
    const updatedTasks = taskList.filter((task) => (
      task.id !== id
    ))
    setTaskList(updatedTasks)
  }

  const handleComplete = (id: number) => () => completeTask(id);
  const handleDelete = (id: number) => () => deleteTask(id);

  useEffect(() => {
    if (filterOption === "all") {
      setFilteredTaskList(taskList);
    } else if (filterOption === "completed") {
      const filteredList = taskList.filter((task) => task.completed);
      setFilteredTaskList(filteredList);
    } else {
      const filteredList = taskList.filter((task) => !task.completed);
      setFilteredTaskList(filteredList);
    }
  }, [filterOption, taskList]);

  // Save taskList changes to Local Storage
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList))
  }, [taskList])

  // Load taskList from Local Storage
  useEffect(() => {
    const storedTasks = localStorage.getItem('taskList');
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, [])

  return (
    <>
      <h1>Task List App</h1>

      <h2>Add a New Task</h2>

      <label htmlFor="taskNameField">Task Name</label>
      <input 
        id="taskNameField"
        type="text"
        placeholder="Enter a Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={addTask} aria-label="Add Task">Add Task</button>

      <h2>Task List</h2>

      <h3>Filter Task List</h3>
      <button onClick={() => setFilterOption("all")}>All</button>
      <button onClick={() => setFilterOption("completed")}>Completed</button>
      <button onClick={() => setFilterOption("not-completed")}>Not Completed</button>

      <TaskTableComponent filteredTaskList={filteredTaskList} handleComplete={handleComplete} handleDelete={handleDelete}/>
    </>
  )
}

export default App

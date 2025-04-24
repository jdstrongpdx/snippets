// LOCAL STORAGE LOAD
const savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
  setTaskList(JSON.parse(savedTasks));
}

// LOCAL STORAGE SAVE
localStorage.setItem('tasks', JSON.stringify(taskList));

// SUBMIT
- VALIDATE -> NEW -> ADD -> RESET
setValue((prevValues) => [...prevValues, NewItem])

// DELETE BY ID
const handleDelete = (id: number) => {
setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
}

// COMPLETE TASK BY ID
  const handleComplete = (id: number) => {
    setTaskList((prevTasks) =>
    prevTasks.map((task) => task.id === id ? { ...task, isComplete: !task.isComplete } : task)
    );
  }

// REDUCE ACCUMULATOR
const calculateBalance = () => {
return transactions.reduce((total, transaction) => {
  if (transaction.type === Type.Income) {
    return total + transaction.amount;
  } else {
    return total - transaction.amount;
  }
}, 0);

// CATEGORY FILTER
foundProducts.filter((product) => product.category === categoryFilter);

// NAME FILTER
foundProducts.filter((product) => product.name.toLowerCase().includes(searchName.toLowerCase()));

// SORT
foundProducts.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price;

// REACT COMPONENT
const NewComponent: React.FC<{ item: string, onSort: (sortTerm: sring) => void}> = ({ item, onSort }) => {
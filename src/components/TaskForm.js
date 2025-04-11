import './TaskForm.css';

function TaskForm({handleSubmit,inputValue,setInputValue}) {
  
  return (
    <div>
    <form onSubmit={handleSubmit}>
      
      <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>

      <button type="submit">Add Task</button>
    </form>
    </div>
  );
}

export default TaskForm;


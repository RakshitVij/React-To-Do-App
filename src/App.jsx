import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-purple-600 min-h-[80vh] md:w-1/2">
        <h1 className="font-extrabold text-center text-xl">
          Task-O-Mania - Manage Your Todos At One Place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg p-2"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-yellow-500 hover:bg-orange-600 p-2 py-1 text-white font-semibold rounded-md disabled:bg-purple-300"
          >
            Add Task
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} />
        Show Finished!
        <h2 className="text-lg font-bold text-white text-center">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 font-extrabold text-3xl">
              No Todos To Do.
            </div>
          )}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
                <div className="flex gap-5 items-center">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-yellow-500 hover:bg-orange-600 p-2 py-1 text-white font-semibold rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-yellow-500 hover:bg-orange-600 p-2 py-1 text-white font-semibold rounded-md mx-1"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;


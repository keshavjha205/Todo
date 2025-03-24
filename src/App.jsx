import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./index.css";

function App() {
  const [allTodo, setAllTodo] = useState(() => {
    const savedTodo = localStorage.getItem("todo");
    return savedTodo ? JSON.parse(savedTodo) : [];
  });

  const [singleTodo, setSingleTodo] = useState({ title: "", desc: "", dueDate: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(allTodo));
  }, [allTodo]);

  function addOrUpdateTodo() {
    if (!singleTodo.title.trim() || !singleTodo.desc.trim()) {
      return;
    }

    if (editIndex !== null) {
      setAllTodo((prev) => prev.map((todo, index) => (index === editIndex ? singleTodo : todo)));
      setEditIndex(null);
    } else {
      setAllTodo((prev) => [...prev, singleTodo]);
    }
    
    setSingleTodo({ title: "", desc: "", dueDate: "" });
  }

  function deleteTodo(index) {
    setAllTodo((prev) => prev.filter((_, i) => i !== index));
  }

  function editTodo(index) {
    setSingleTodo(allTodo[index]);
    setEditIndex(index);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addOrUpdateTodo();
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 
      bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/7502500/pexels-photo-7502500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <div className="flex flex-col gap-4 bg-white/80 p-6 rounded-lg shadow-lg w-full max-w-md backdrop-blur-md">
        <input
          type="text"
          placeholder="Title"
          value={singleTodo.title}
          onChange={(e) =>
            setSingleTodo((prev) => ({ ...prev, title: e.target.value }))
          }
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={singleTodo.desc}
          onChange={(e) =>
            setSingleTodo((prev) => ({ ...prev, desc: e.target.value }))
          }
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={singleTodo.dueDate}
          onChange={(e) =>
            setSingleTodo((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addOrUpdateTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          {editIndex !== null ? "Update Todo" : "Add Todo"}
        </button>
      </div>

      <div className="mt-6 w-full max-w-md">
        {allTodo.map((data, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 border border-gray-300 bg-white/80 rounded-lg p-4 shadow-md mb-2 backdrop-blur-md"
          >
            <h1 className="text-lg font-semibold text-gray-800">{data.title}</h1>
            <p className="text-gray-600">{data.desc}</p>
            {data.dueDate && <p className="text-sm text-gray-500">Due: {data.dueDate}</p>}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => editTodo(i)}
                className="text-blue-600 hover:text-blue-800 transition-all"
              >
                <MdEdit className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteTodo(i)}
                className="text-red-600 hover:text-red-800 transition-all"
              >
                <MdDelete className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

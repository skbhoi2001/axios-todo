import axios from "axios";
import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";

const getTodos = () => {
  const config = {
    url: " url",
    method: "get"
  };
  return axios(config);
};

const createTodo = (title) => {
  const payload = {
    title,
    status: false
  };
  const config = {
    url: " url",
    method: "post",
    data: payload
  };
  return axios(config);
};

function Todos() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    handleGetTodos();
  }, []);

  const handleGetTodos = () => {
    return getTodos()
      .then((res) => {
        setTodos(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTodo = (id, status) => {
    return axios({
      url: ` url/${id}`,
      method: "patch",
      data: {
        status: status
      }
    });
  };
  const markEverythingAsComplete = async () => {
    try {
      const ids = todos.map((item) => item.id);

      for (let id of ids) {
        console.log(id);
        await updateTodo(id, true);
      }
      await handleGetTodos();
    } catch (err) {}
  };

  const handleToggle = async (id, status) => {
    updateTodo(id, status);
    await handleGetTodos();
  };

  const updateDelete = (id) => {
    return axios({
      url: ` url/${id}`,
      method: "delete"
    });
  };
  const handleDelete = async (id) => {
    updateDelete(id);
    await handleGetTodos();
  };
  const onSubmit = async (title) => {
    try {
      setIsLoading(true);
      await createTodo(title);
      await handleGetTodos();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      // manage your error with a state
    }
  };
  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <TodoInput onSubmit={onSubmit} />

      <div>
        {todos.map((item) => (
          <div key={item.id}>
            <span>{item.title}--</span>
            <span>{item.status === true ? "DONE" : "NOT DONE"}--</span>
            <button onClick={() => handleToggle(item.id, !item.status)}>
              Toggle
            </button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={markEverythingAsComplete}>MARK ALL COMPLETED</button>
      </div>
    </div>
  );
}

export default Todos;

import { Header } from "../common/Header";
import { useState, useEffect, createContext } from "react";
import { TodoContextType } from "../types/todo";
import { todoService } from "../services/ToDoService";
import { ToDo } from "../types/todo";
import { showDesc } from "../types/todo";
import { showEditForm } from "../types/todo";

export const ToDoContext = createContext<TodoContextType | null>(null);

const Pages = ({ children }) => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [archivedToDos, setArchivedToDos] = useState<ToDo[]>([]);
  const [showDesc, setShowDesc] = useState<showDesc>({
    todoId: "",
    show: false,
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<showEditForm>({
    todoId: "",
    show: false,
  });
  
  const handleShowEditForm = (id: string, title: string) => {
    if (showEditForm.show === true) {
      setShowEditForm({
        todoId: "",
        show: false,
      });
    } else if (showEditForm.show === false) {
      setShowEditForm({
        todoId: id,
        show: true,
      });
    }
  };

  const handleShowForm = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleShowDesc = (id: string) => {
    if (showDesc.show) {
      setShowDesc({
        todoId: "",
        show: false,
      });
    } else if (!showDesc.show) {
      setShowDesc({
        todoId: id,
        show: true,
      });
    }
  };

  const handleGetAllTodos = async () => {
    try {
      const response = await todoService.getTodos();
      let activeToDos: ToDo[] = [];
      let inactiveTodos: ToDo[] = [];
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].archived) {
          inactiveTodos.push(response.data[i]);
        } else {
          activeToDos.push(response.data[i]);
        }
      }
      activeToDos?.length > 0 && setTodos(activeToDos);
      inactiveTodos?.length > 0 && setArchivedToDos(inactiveTodos);
    } catch (e) {
      console.log(e);
    }
  };

  const handleArchiveTask = async (id: string) => {
    try {
      const response = await todoService.archiveTodo(id);
      if (response?.data?.archived === true) {
        const newTodos = todos.filter((todo) => todo._id !== id);
        setTodos(newTodos);
        setArchivedToDos([...archivedToDos, response?.data]);
      } else if (response?.data?.archived === false) {
        const newAToDos = archivedToDos.filter((todo) => todo._id !== id);
        setArchivedToDos(newAToDos);
        setTodos([...todos, response?.data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleTaskStatus = async (id: string) => {
    try {
      const response = await todoService.updateStatus(id);
      let result: ToDo[] = [];
      for (let i = 0; i < todos.length; i++) {
        if (todos[i]._id === response?.data?._id) {
          const updatedStatus = todos[i];
          updatedStatus.done = response?.data?.done;
          result.push(updatedStatus);
          continue;
        }
        result.push(todos[i]);
      }
      setTodos(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetAllTodos();
  }, []);

  return (
    <>
      <br />
      <div className="mx-5">
        <ToDoContext.Provider
          value={{
            todos,
            archivedToDos,
            showDesc,
            showForm,
            showEditForm,
            setTodos,
            setArchivedToDos,
            setShowDesc,
            setShowEditForm,
            handleArchiveTask,
            handleTaskStatus,
            handleShowDesc,
            handleShowForm,
            handleShowEditForm,
          }}
        >
          <Header />
          {children}
        </ToDoContext.Provider>
      </div>
    </>
  );
};

export default Pages;

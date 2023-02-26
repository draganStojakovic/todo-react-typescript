import { useContext, useState } from "react";
import { ToDoDetails } from "./components/ToDoDetails.component";
import { ToDoContext } from "../layout";
import { TodoContextType } from "../types/todo";
import { useEffect } from "react";
import { ToDoForm } from "./components/ToDoForm.component";
import { toDoFormType } from "../types/todo";
import { errorMsgType } from "../types/todo";
import { todoService } from "../services/ToDoService";

export const AllToDosPage = () => {
  const todosContext = useContext(ToDoContext) as TodoContextType;
  const [toDoForm, setToDoForm] = useState<toDoFormType>({
    title: "",
    desc: "",
    showDesc: false,
  });
  const [errorMsg, setErrorMsg] = useState<errorMsgType>({
    error: false,
    message: "The title is mandatory.",
  });
  const [todoId, setToDoId] = useState<string>("");

  const handleShowEditForm = (id: string, title: string, desc: string | null) => {
    if (todosContext?.showEditForm?.show === true) {
      todosContext?.setShowEditForm({
        todoId: "",
        show: false,
      });
      setToDoForm({
        title: "",
        desc: "",
        showDesc: false,
      });
      return;
    } else if (todosContext?.showEditForm?.show === false) {
      todosContext?.setShowEditForm({
        todoId: id,
        show: true,
      });
      if (desc) {
        setToDoForm({ title: title, desc: desc, showDesc: true });
        setToDoId(id);
      } else {
        setToDoForm({ title: title, desc: "", showDesc: false });
        setToDoId(id);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (todosContext?.showDesc.show) {
        todosContext.setShowDesc({ todoId: "", show: false });
      }
      if (todosContext?.showForm) {
        todosContext?.handleShowForm();
      }
    };
  }, [todosContext]);

  const handleSubmitToDo = async (e: any) => {
    e.preventDefault();
    if (!toDoForm.title) {
      setErrorMsg({ ...errorMsg, error: true });
      return;
    }
    try {
      const response = await todoService.postTodo({
        title: toDoForm.title,
        desc: toDoForm.desc || null,
      });
      todosContext?.setTodos([...todosContext.todos, response.data]);
      setToDoForm({
        title: "",
        desc: "",
        showDesc: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateToDo = async (e: any) => {
    e.preventDefault();
    if (!toDoForm.title) {
      setErrorMsg({ ...errorMsg, error: true });
      return;
    }
    try {
      if (toDoForm.desc !== "") {
        const response = await todoService.updateTodo(todoId, {
          title: toDoForm.title,
          desc: toDoForm.desc,
        });
        todosContext?.todos?.forEach((todo) => {
          if (todo._id === response.data._id) {
            todo.title = response.data.title;
            todo.updatedAt = response.data.updatedAt;
            if (response?.data.desc !== null) {
              todo.desc = response.data.desc;
            }
          }
        });
      } else {
        const response = await todoService.updateTodo(todoId, {
          title: toDoForm.title,
        });
        todosContext?.todos?.forEach((todo) => {
          if (todo._id === response.data._id) {
            todo.title = response.data.title;
            todo.updatedAt = response.data.updatedAt;
          }
        });
      }
      todosContext?.setShowEditForm({
        todoId: "",
        show: false,
      });
      setToDoForm({
        title: "",
        desc: "",
        showDesc: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {todosContext?.showForm && (
        <>
          <ToDoForm
            toDoForm={toDoForm}
            onChange={setToDoForm}
            handleToDo={handleSubmitToDo}
            errorMsg={errorMsg}
          />
          <br />
        </>
      )}
      {todosContext?.todos.length ? (
        todosContext?.todos?.map((todo, index) => (
          <div key={index}>
            <ToDoDetails
              todo={todo}
              archived={false}
              archiveTask={todosContext?.handleArchiveTask}
              taskStatus={todosContext?.handleTaskStatus}
              showDesc={todosContext?.showDesc}
              handleShowDesc={todosContext?.handleShowDesc}
              handleShowEditForm={handleShowEditForm}
            />
            {todosContext?.showEditForm.show && todosContext?.showEditForm.todoId === todo._id && (
              <>
                <ToDoForm
                  toDoForm={toDoForm}
                  onChange={setToDoForm}
                  handleToDo={handleUpdateToDo}
                  errorMsg={errorMsg}
                />
                <br />
              </>
            )}
          </div>
        ))
      ) : (
        <div className="d-flex justify-content-center">Empty</div>
      )}
    </>
  );
};

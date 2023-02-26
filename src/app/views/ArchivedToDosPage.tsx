import { useContext } from "react";
import { ToDoContext } from "../layout";
import { TodoContextType } from "../types/todo";
import { ToDoDetails } from "./components/ToDoDetails.component";
import { useEffect } from "react";
import { todoService } from "../services/ToDoService";

export const ArchivedToDosPage = () => {
  const todosContext = useContext(ToDoContext) as TodoContextType;

  useEffect(() => {
    return () => {
      if (todosContext?.showDesc.show) {
        todosContext.setShowDesc({ todoId: "", show: false });
      }
    };
  }, [todosContext]);

  const handleDeleteArchivedToDos = async () => {
    const yes = window.confirm("This action will delete all tasks. Proceed?");
    if (!yes) {
      return;
    }
    try {
      const response = await todoService.deleteAll();
      if (response?.data?.success) {
        todosContext?.setArchivedToDos([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {todosContext?.archivedToDos &&
        todosContext?.archivedToDos?.map((todo, index) => (
          <div key={index}>
            <ToDoDetails
              todo={todo}
              archived={true}
              archiveTask={todosContext?.handleArchiveTask}
              taskStatus={todosContext?.handleTaskStatus}
              showDesc={todosContext?.showDesc}
              handleShowDesc={todosContext?.handleShowDesc}
              handleShowEditForm={todosContext?.handleShowEditForm}
            />
          </div>
        ))}
      {todosContext?.archivedToDos.length ? (
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() => handleDeleteArchivedToDos()}
          >
            Clear Archive
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center">Empty</div>
      )}
    </>
  );
};

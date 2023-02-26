import { ToDo } from "../../types/todo";
import { showDesc } from "../../types/todo";

interface Props {
  todo: ToDo;
  archived: boolean;
  showDesc: showDesc;
  archiveTask: (id: string) => Promise<void>;
  taskStatus: (id: string) => Promise<void>;
  handleShowDesc: (id: string) => void;
  handleShowEditForm: (id: string, title: string, desc: string | null) => void;
}

export const ToDoDetails = ({
  todo,
  archived,
  showDesc,
  archiveTask,
  taskStatus,
  handleShowDesc,
  handleShowEditForm,
}: Props) => {
  return (
    <>
      <div className="d-block p-1 bg-light text-black">
        <div className="d-flex justify-content-start">
          <div style={{ color: "#f8f9fa" }}>_</div>
          <div>
            {archived ? (
              <>
                {!todo.done ? (
                  <button type="button" className="btn btn-light btn-sm" disabled>
                    ✅
                  </button>
                ) : (
                  <button type="button" className="btn btn-light btn-sm" disabled>
                    ❎
                  </button>
                )}
              </>
            ) : (
              <>
                {!todo.done ? (
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => taskStatus(todo._id)}
                  >
                    ✅
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => taskStatus(todo._id)}
                  >
                    ❎
                  </button>
                )}
              </>
            )}
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={() => archiveTask(todo._id)}
            >
              {archived ? "↪️" : "🗑"}
            </button>
            {todo.desc && (
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() => {
                  handleShowDesc(todo._id);
                }}
              >
                📃
              </button>
            )}
            {!archived && (
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={() => handleShowEditForm(todo._id, todo.title, todo.desc)}
              >
                📝
              </button>
            )}
          </div>
          <div style={{ color: "#f8f9fa" }}>_</div>
          {todo.done ? (
            <div className="col-md-2 text-nowrap lead">
              <del>{todo.title}</del>
            </div>
          ) : (
            <div className="col-md-2 text-nowrap lead">{todo.title}</div>
          )}
        </div>
      </div>
      <br />
      {showDesc.show && showDesc.todoId === todo._id && (
        <>
          <div className="d-block p-1 bg-light text-black">{todo.desc}</div>
          <br />
        </>
      )}
    </>
  );
};

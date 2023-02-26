import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { TodoContextType } from "../types/todo";
import { ToDoContext } from "../layout";

export const Header = () => {
  const history = useHistory();
  const todosContext = useContext(ToDoContext) as TodoContextType;

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="d-flex justify-content-start">
          <div style={{ color: "#f8f9fa" }}>_</div>
          <button type="button" className="btn btn-light btn-sm" onClick={() => history.push("/")}>
            ToDos
          </button>
          <div style={{ color: "#f8f9fa" }}>_</div>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() => history.push("/archived")}
          >
            Archived
          </button>
          <div style={{ color: "#f8f9fa" }}>_</div>
          <button
            type="button"
            className="btn btn-light btn-sm"
            onClick={() => {
              history.push("/todos");
              todosContext?.handleShowForm();
            }}
          >
            📝
          </button>
        </div>
      </nav>
      <br />
    </header>
  );
};

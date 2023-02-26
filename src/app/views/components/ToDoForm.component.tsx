import { toDoFormType } from "../../types/todo";
import { errorMsgType } from "../../types/todo";

interface Props {
  toDoForm: toDoFormType;
  onChange: React.Dispatch<React.SetStateAction<toDoFormType>>;
  handleToDo: (e: any) => Promise<void>;
  errorMsg: errorMsgType;
}

export const ToDoForm = ({ toDoForm, onChange, handleToDo, errorMsg }: Props) => {
  return (
    <form className="form-inline" onSubmit={handleToDo}>
      <div className="form-group mx-sm-3 mb-2">
        <input
          className="form-control"
          id="title"
          type="text"
          placeholder="Task"
          value={toDoForm.title}
          onChange={(e) => onChange({ ...toDoForm, title: e.target.value })}
        />
      </div>
      {errorMsg.error && <div className="alert alert-danger">{errorMsg.message}</div>}
      {toDoForm.showDesc && (
        <div className="form-group mx-sm-3 mb-2">
          <textarea
            className="form-control"
            id="description"
            value={toDoForm?.desc}
            rows={5}
            maxLength={256}
            placeholder="Enter your description"
            onChange={(e) => onChange({ ...toDoForm, desc: e.target.value })}
          />
        </div>
      )}
      <br />
      <div className="d-flex justify-content-start">
        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
        <div style={{ color: "#f8f9fa" }}>__</div>
        <button
          type="button"
          className="btn btn-light btn-sm"
          onClick={() => {
            if (toDoForm.showDesc) {
              onChange({ ...toDoForm, showDesc: false });
            } else {
              onChange({ ...toDoForm, showDesc: true });
            }
          }}
        >
          {toDoForm.showDesc ? "Hide Description" : "Add Description"}
        </button>
      </div>
    </form>
  );
};

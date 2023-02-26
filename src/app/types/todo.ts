export interface ToDo {
  archived: boolean;
  _id: string;
  done: boolean;
  title: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

export type showDesc = {
  todoId: string;
  show: boolean;
};

export type showEditForm = {
  todoId: string;
  show: boolean;
};

export type toDoFormType = {
  title: string;
  desc: string;
  showDesc: boolean;
};

export type errorMsgType = {
  error: boolean;
  message: string;
};

export type TodoContextType = {
  todos: ToDo[];
  archivedToDos: ToDo[];
  showDesc: showDesc;
  showForm: boolean;
  showEditForm: showEditForm;
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  setArchivedToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  handleShowForm: () => void;
  setShowDesc: React.Dispatch<React.SetStateAction<showDesc>>;
  handleArchiveTask: (id: string) => Promise<void>;
  handleTaskStatus: (id: string) => Promise<void>;
  handleShowDesc: (id: string) => void;
  handleShowEditForm: (id: string, title: string) => void;
  setShowEditForm: React.Dispatch<React.SetStateAction<showEditForm>>;
} | null;

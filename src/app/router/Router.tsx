import { Switch, Route, Redirect } from "react-router-dom";
import { AllToDosPage } from "../views/AllToDosPage";
import { ArchivedToDosPage } from "../views/ArchivedToDosPage";

const Router = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/todos" />;
        }}
      />
      <Route component={AllToDosPage} path="/todos" />;
      <Route component={ArchivedToDosPage} path="/archived" />
    </Switch>
  );
};

export default Router;

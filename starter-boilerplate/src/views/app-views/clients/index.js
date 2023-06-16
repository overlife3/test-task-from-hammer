import Loading from "components/shared-components/Loading";
import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Clients = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Redirect exact from={`${match.url}`} to={`${match.url}/client-list`} />
        <Route
          path={`${match.url}/client-list`}
          component={lazy(() => import(`./client-list`))}
        />
        <Route
          path={`${match.url}/:id/setting`}
          component={lazy(() => import(`./setting`))}
        />
      </Switch>
    </Suspense>
  );
};

export default Clients;

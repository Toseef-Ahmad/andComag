import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Components = React.lazy(() =>
  import(/* webpackChunkName: "forms-components" */ './components')
);
const Layouts = React.lazy(() =>
  import(/* webpackChunkName: "forms-layouts" */ './layouts')
);
const Pending = React.lazy(() =>
  import(/* webpackChunkName: "forms-validations" */ './pending')
);
const Wizard = React.lazy(() =>
  import(/* webpackChunkName: "forms-wizard" */ './wizard')
);
const NursingComplete = React.lazy(() =>
  import(/* webpackChunkName: "forms-wizard" */ './nursingcomplete')
);

const Forms = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/components`} />
      <Route
        path={`${match.url}/components`}
        render={(props) => <Components {...props} />}
      />
      <Route
        path={`${match.url}/layouts`}
        render={(props) => <Layouts {...props} />}
      />
      <Route
        path={`${match.url}/Pending`}
        render={(props) => <Pending {...props} />}
      />
      <Route
        path={`${match.url}/wizard`}
        render={(props) => <Wizard {...props} />}
      />
      <Route
        path={`${match.url}/nursingcomplete`}
        render={(props) => <NursingComplete {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Forms;

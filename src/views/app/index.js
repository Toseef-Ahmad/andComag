import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import KnowledgeBase from "./pages/miscellaneous/knowledge-base";
import Layouts from "./ui/forms/layouts";
import Pending from "./ui/forms/pending";
import NursingComplete from "./ui/forms/nursingcomplete";

const DataList = React.lazy(() =>
    import(/* webpackChunkName: "product-data-list" */ './pages/product/data-list')
);
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

// const Dashboards = React.lazy(() =>
//   import(/* webpackChunkName: "dashboards" */ './dashboards')
// );

const ContentDefault = React.lazy(() =>
    import(/* webpackChunkName: "dashboard-content" */ './dashboards/content')
);

const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);

const FunFacts = React.lazy(() =>
    import(
        /* webpackChunkName: "miscellaneous-knowledge-base" */ './pages/miscellaneous/fun-facts'
        )
);

const Components = React.lazy(() =>
    import(/* webpackChunkName: "forms-components" */ './ui/forms/components')
);

const Details = React.lazy(() =>
    import(/* webpackChunkName: "product-details" */ './pages/product/details')
);

const Portfolio = React.lazy(() =>
    import(/* webpackChunkName: "profile-portfolio" */ './pages/profile/portfolio')
);

const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
                path={`${match.url}/dashboards`}
                render={(props) => <ContentDefault {...props} />}
            />
            {/* Its all about Routing */}
            <Route
                exact
                path={`${match.url}/groups`}
                render={(props) => <KnowledgeBase {...props} />}
            />
            <Route
                path={`${match.url}/groups/details`}
                render={(props) => <Details {...props} />}
            />
            <Route
                exact
                path={`${match.url}/magazines/completed`}
                render={(props) => <Layouts {...props} />}
            />
            <Route
                exact
                path={`${match.url}/magazines/pending`}
                render={(props) => <Pending {...props} />}
            />
            <Route
                exact
                path={`${match.url}/magazines/pending/details`}
                render={(props) => <Details {...props} />}
            />
            <Route
                exact
                path={`${match.url}/magazines/completed/details`}
                render={(props) => <Details {...props} />}
            />
            <Route
              path={`${match.url}/magazines/nursing's/completed`}
              render={(props) => <NursingComplete {...props} />}
            />
            <Route
                exact
                path={`${match.url}/users`}
                render={(props) => <DataList {...props} />}
            />
            <Route
                path={`${match.url}/users/details`}
                render={(props) => <Portfolio {...props} />}
            />
            <Route
                path={`${match.url}/settings/admin`}
                render={(props) => <BlankPage {...props} />}
            />
            <Route
                path={`${match.url}/settings/fun-facts`}
                render={(props) => <FunFacts {...props} />}
            />
            <Route
                path={`${match.url}/settings/cover-page`}
                render={(props) => <Components {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));

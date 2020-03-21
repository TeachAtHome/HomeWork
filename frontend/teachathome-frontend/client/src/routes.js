import React from 'react';
import { Router, Route} from 'react-router';
import TeachAtHome from './TeachAtHome';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={TeachAtHome} />
  </Router>
);

export default Routes;

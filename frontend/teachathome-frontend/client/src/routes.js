import React from 'react';
import { Router, Route} from 'react-router';
import TeachAtHome from './routes/TeachAtHome';
import Classroom from './routes/Classroom';
import EditorRouting from './routes/EditorRouting';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={TeachAtHome} />
    <Route path="/editor" component={EditorRouting} />
    <Route path="/classroom" component={Classroom} />
  </Router>
);

export default Routes;

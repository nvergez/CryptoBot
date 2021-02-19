import './App.css';

import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import './Dashboard/Dashboard';
import Dashboard from './Dashboard/Dashboard';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PublicRoute path='/' exact={true}>
            <Register/>
          </PublicRoute>
          <PublicRoute path='/login' exact={true}>
            <Login />
          </PublicRoute>
          <PrivateRoute path='/dashboard'>
            <Dashboard/>
          </PrivateRoute>
          <PrivateRoute path='/orders'>
            <Dashboard/>
          </PrivateRoute>
          <PrivateRoute path='/balances'>
            <Dashboard/>
          </PrivateRoute>
          <PrivateRoute path='/bot'>
            <Dashboard/>
          </PrivateRoute>
          <PrivateRoute path='/buysell'>
            <Dashboard/>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

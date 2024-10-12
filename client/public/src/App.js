import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Events from './pages/Events';
import DataVisualization from './pages/DataVisualization';
import { AuthProvider } from './contexts/AuthContext';

const theme = createMuiTheme({
  // Customize your theme here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/resources" component={Resources} />
            <Route path="/events" component={Events} />
            <Route path="/data" component={DataVisualization} />
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
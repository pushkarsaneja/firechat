import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PrivateRoute from './customRoutes/PrivateRoute';
import PublicRoute from './customRoutes/PublicRoute';
import Theme from './themeProvider/Theme';

const App = () => {
  return (
    <Theme>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </Theme>
  );
};

export default App;

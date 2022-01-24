import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/registration/Registration';
import Home from './pages/home/Home';
import HomePageRoute from './customRoutes/HomePageRoute';
import PublicRoute from './customRoutes/PublicRoute';
import AlertProvider from './context/AlertProvider';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import VerifyEmailRoute from './customRoutes/VerifyEmailRoute';
import CreateProfileRoute from './customRoutes/CreateProfileRoute';
import CreateProfile from '../src/pages/createProfile/CreateProfile';
import CurrentUserProvider from './context/CurrentUserProvider';
import ThemeProvider from './context/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <AlertProvider>
        <CurrentUserProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePageRoute>
                    <Home />
                  </HomePageRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Registration />
                  </PublicRoute>
                }
              />
              <Route
                path="/verifyEmail"
                element={
                  <VerifyEmailRoute>
                    <VerifyEmail />
                  </VerifyEmailRoute>
                }
              />
              <Route
                path="/createProfile"
                element={
                  <CreateProfileRoute>
                    <CreateProfile />
                  </CreateProfileRoute>
                }
              />
            </Routes>
          </Router>
        </CurrentUserProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};

export default App;

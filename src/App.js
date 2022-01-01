import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import HomePageRoute from './customRoutes/HomePageRoute';
import PublicRoute from './customRoutes/PublicRoute';
import ThemeProvider from './context/ThemeProvider';
import AlertProvider from './context/AlertProvider';
import VerifyEmail from './pages/VerifyEmail';
import VerifyEmailRoute from './customRoutes/VerifyEmailRoute';
import CreateProfileRoute from './customRoutes/CreateProfileRoute';
import CreateProfile from '../src/pages/CreateProfile';
import CurrentUserProvider from './context/CurrentUserProvider';

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
                path="/signin"
                element={
                  <PublicRoute>
                    <SignIn />
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

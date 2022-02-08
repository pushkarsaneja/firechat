import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import CurrentRecipientProvider from './context/CurrentRecipientProvider';
import ThemeProvider from './context/ThemeProvider';
import CurrentSectionProvider from './context/CurrentSectionProvider';
import DbReferenceProvider from './context/DbReferenceProvider';

const App = () => {
  return (
    <AlertProvider>
      <ThemeProvider>
        <CurrentUserProvider>
          <CurrentRecipientProvider>
            <DbReferenceProvider>
              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <HomePageRoute>
                        <CurrentSectionProvider>
                          <Home />
                        </CurrentSectionProvider>
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
            </DbReferenceProvider>
          </CurrentRecipientProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </AlertProvider>
  );
};

export default App;

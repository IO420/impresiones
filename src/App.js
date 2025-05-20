import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Impressions } from './components/Impressions';
import { Login } from './components/Login';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { LoginRedirect } from './components/routes/LoginRedirect';

function App() {
  return (
    <div className="App">
      <div className="impressions-container">
        <h3 className="impressions-title lineSeparator">IMPRESIONES</h3>

        <BrowserRouter>
          <Routes>

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Impressions />
                </PrivateRoute>
              }
            >
            </Route>

            <Route
              path="/Login"
              element={
                <LoginRedirect>
                  <Login />
                </LoginRedirect>
              }
            >
            </Route>
          </Routes>
        </BrowserRouter>
        <div className="img"></div>
      </div>
    </div>
  );
}

export default App;

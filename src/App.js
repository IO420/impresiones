import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Impressions } from './components/Impressions';
import { Login } from './components/Login';

function App() {
  return (
    <div className="App">
      <div className="impressions-container">
        <h3 className="impressions-title lineSeparator">IMPRESIONES</h3>

        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Impressions />}>
            </Route>

            <Route path="/Login" element={<Login />}>
            </Route>
          </Routes>
        </BrowserRouter>
        <div className="img"></div>
      </div>
    </div>
  );
}

export default App;

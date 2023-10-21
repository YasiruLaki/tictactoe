import './App.css';
import Grid from './components/grid';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/tictac" element={<div className="App">
            <Grid />
          </div>} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

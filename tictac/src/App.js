import './App.css';
import Grid from './components/grid';
import bg from "./assets/bg.jpg"

function App() {
  return (
    <div>

      <div>
      <img src={bg} className='bg'></img>
      </div>

      <div className="App">
        <Grid />
      </div>

    </div>
  );
}

export default App;

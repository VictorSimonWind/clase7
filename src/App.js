import logo from './logo.svg';
import './App.css';
import FecthCalls from './components/FecthCalls';
import Apis from './components/Apis';
import PracticaFetch from './practica/PracticaFetch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <FecthCalls/> */}
        {/* <Apis/> */}
        <PracticaFetch/>
      </header>
    </div>
  );
}

export default App;

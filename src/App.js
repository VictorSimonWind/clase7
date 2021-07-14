import logo from './logo.svg';
import './App.css';
import FecthCalls from './components/FecthCalls';
import Apis from './components/Apis';
import PracticaFetch from './practica/PracticaFetch';
import PracticaAfter from './AfterClass/PracticaAfter';

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
        {/* <PracticaFetch/> */}
        <PracticaAfter/>
      </header>
    </div>
  );
}

export default App;

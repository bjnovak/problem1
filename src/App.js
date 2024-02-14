import './App.css';
import Transactions from './components/Transactions'

function App() {
  return (
    <div className="App">
      <h1>{'Transactions'}</h1>
      <h2>{'Past 90 Days'}</h2>
      <Transactions />
    </div>
  );
}

export default App;

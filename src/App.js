import './App.css';
import Aside from './components/Aside';
import Main from './components/Main';
import { MsgAppProvider } from './context/MsgAppContext';

export default function App() {
  return (
    <MsgAppProvider>
      <div className="App">
        <Aside />
        <Main />
      </div>
    </MsgAppProvider>
  );
}

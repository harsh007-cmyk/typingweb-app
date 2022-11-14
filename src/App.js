import logo from './logo.svg';
import './App.css';
import { GlobalStyles } from './Styles/global';
import TypingBox from './Component/TypingBox';
var randomwords=require('random-words');
function App() {
  const words=randomwords;
  return (
    <div className="canvas">
      <GlobalStyles/>
      <h1>Typing Test</h1>
      <TypingBox words={words}/>
      <h1>Footer</h1>
    </div>
  );
}

export default App;

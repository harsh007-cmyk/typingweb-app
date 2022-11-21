import logo from './logo.svg';
import { GlobalStyles } from './Styles/global';
import TypingBox from './Component/TypingBox';
import Set from './Component/Set';
var randomwords=require('random-words');
function App() {
  const words=randomwords(100);
  return (
    <div className="canvas">
      <GlobalStyles/>
      <h1 style={{"textAlign":'center'}}>Typing Test</h1>
      
      <TypingBox words={words}/>
      <h1 style={{"textAlign":'center'}}>Footer</h1>
    </div>
  );
}

export default App;

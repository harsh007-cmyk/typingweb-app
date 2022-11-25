import logo from './logo.svg';
import { GlobalStyles } from './Styles/global';
import TypingBox from './Component/TypingBox';
import Set from './Component/Set';

function App() {
  return (
    <div className="canvas">
      
      <GlobalStyles/>
      <h1 style={{"textAlign":'center'}}>Typing Test</h1>
      
      <TypingBox />
      <h1 style={{"textAlign":'center'}}>Footer</h1>
    </div>
  );
}

export default App;

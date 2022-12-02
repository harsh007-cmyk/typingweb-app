import logo from './logo.svg';
import { GlobalStyles } from './Styles/global';
import { ThemeProvider } from 'styled-components';
import TypingBox from './Component/TypingBox';
import Footer from './Component/Footer';
import {useTheme} from './Context/ThemeContext';
import { auth } from './firebaseConfig';
import Header from './Component/Header';
import HomePage from './Pages/HomePage';
import {Route,Routes} from 'react-router-dom';
import UserPage from './Pages/UserPage';
import Alert from './Component/Alert';
// import { auth } from './firebaseConfig';


function App() {
  
  const{theme}= useTheme();   
  return (
    <>
    <Alert/>
    <Routes>
       <Route path='/' element={<HomePage/>}></Route>
      <Route path='/user' element={<UserPage/>}></Route>
    </Routes>
    </>
  );
}

export default App;

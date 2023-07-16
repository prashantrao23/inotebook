import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from "./context/notes/NoteState";
import './App.css';
import Alerts from "./components/Alerts";
import Login from "./components/Login";
import Singup from "./components/Singup";
import { useState } from "react";


// TODO use context API for ALERT

function App() {

  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000)
  }

  return (
    //Now the state of NoteState will be available inside all of below components and all components which are available inside below components
    <NoteState showalert={showalert}>
      <BrowserRouter>

        <Navbar showalert={showalert}/>
        <div className="">
        <Alerts alert={alert} />
          <Routes>

            <Route exact path='/' element={<Home showalert={showalert} />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login showalert={showalert}/>} />
            <Route exact path='/singup' element={<Singup showalert={showalert}/>} />

          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;

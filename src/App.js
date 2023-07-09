import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from "./context/notes/NoteState";
import './App.css';
import Alerts from "./components/Alerts";

function App() {
  return (
    //Now the state of NoteState will be available inside all of below components and all components which are available inside below components
    <NoteState>
      <BrowserRouter>

        <Navbar />
        <Alerts message={"This is Alert"} />
        <div className="container">
          <Routes>

            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />

          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;

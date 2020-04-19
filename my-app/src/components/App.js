import React  from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import SignUp from '../RegistrarUsuario'
import RegistrarCultivo from '../RegistrarCultivo'
import SignIn from '../IniciarSesion'
import Mantenimiento from '../Mantenimiento'
import Graficos from './Inicio'
function App() {
  return (
  <div className="Appt">
            <Router>
            <Route path="/inicio" component={Graficos}/>
              <Route path="/registrar" component={SignUp}/>
              <Route path="/registrarcultivo" component={RegistrarCultivo}/>
              <Route path="/iniciarsesion" component={SignIn}/>
              <Route path="/mantenimiento" component={Mantenimiento}/>
      </Router>
      <ToastContainer />
    </div>
);
}

export default App;

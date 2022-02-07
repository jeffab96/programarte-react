import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from './componentes/Inicio';
import Fama from './componentes/Fama';
import Buscar from './componentes/Buscar';
import Filtrar from './componentes/Filtrar';
import Editar from './componentes/Editar';
import Crear from './componentes/Crear';
import About from './componentes/About';

function App() {
  return (
    <Router>
      <div className="containter" style={{ textAlign: "center" }}>
        <div className='btn-group'>
          <Link to="/" className="btn btn-dark">
            Home
          </Link>
        </div>
        <div className='btn-group'>
          <Link to="/salon_fama" className="btn btn-dark">
            Salón de la Fama
          </Link>
          <Link to="/buscar_jugador" className="btn btn-dark">
            Buscar Jugador
          </Link>
          <Link to="/filtrar_jugador" className="btn btn-dark">
            Filtrar Jugador
          </Link>
          <Link to="/editar_jugador" className="btn btn-dark">
            Editar Jugador
          </Link>
          <Link to="/crear_jugador" className="btn btn-dark">
            Crear Jugador
          </Link>
          <Link to="/about" className="btn btn-dark">
            About
          </Link>
          
        </div>
        <hr />
        <Routes>
          <Route exact path='/' element={<Inicio />} />
          <Route path="/salon_fama" element={<Fama />} />
          <Route path="/buscar_jugador" element={<Buscar />} />
          <Route path="/filtrar_jugador" element={<Filtrar />} />
          <Route path="/editar_jugador" element={<Editar />} />
          <Route path="/crear_jugador" element={<Crear />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

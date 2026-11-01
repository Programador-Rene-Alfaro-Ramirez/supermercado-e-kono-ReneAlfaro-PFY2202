import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function BottomMenu() {
return (
    <div className="bottom-menu">
    <Link to="/">Inicio (Inventario)</Link>
    <Link to="/quienes-somos">Quiénes Somos</Link>
    <Link to="/tiendas">Nuestras Tiendas</Link>
    </div>
);
}

export default BottomMenu;
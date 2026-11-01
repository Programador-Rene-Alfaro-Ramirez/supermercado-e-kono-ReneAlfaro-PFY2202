import React from 'react';
import './styles.css';

function Home() {
return (
    <div>
    <div className="header">e!kono - Tu super descuento</div>
    <div className="container">
        <h2>Gestión de Inventario</h2>
        <p>Bienvenido al sistema de inventario del supermercado.</p>
        <table border="1" style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
        <thead>
            <tr style={{backgroundColor: '#FFD100'}}>
            <th>ID</th>
            <th>Producto</th>
            <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>1</td><td>Arroz grado 1</td><td>150 un</td></tr>
            <tr><td>2</td><td>Aceite vegetal</td><td>85 un</td></tr>
            <tr><td>3</td><td>Fideos spaghetti</td><td>200 un</td></tr>
        </tbody>
        </table>
    </div>
    </div>
);
}

export default Home;
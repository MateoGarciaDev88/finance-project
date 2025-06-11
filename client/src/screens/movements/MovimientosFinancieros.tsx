import React from "react";

interface Movimiento {
id: string;
categoria: "Ingreso" | "Gasto" | "Ahorro" | "Inversión";
descripcion: string;
monto: number;
fecha: string;
persona: string;
}

interface Props {
movimientos: Movimiento[];
}

const MovimientosFinancieros: React.FC<Props> = ({ movimientos }) => {

const categorias = ["Ingreso", "Gasto", "Ahorro", "Inversión"];

return (
    <div className="movimientos-container">
    {categorias.map((categoria) => {
        const filtrados = movimientos.filter(
        (mov) => mov.categoria === categoria
        );
        return (
        <div className="categoria-bloque" key={categoria}>
            <h2 className="categoria-titulo">{categoria}</h2>
            {filtrados.length === 0 ? (
            <p className="sin-movimientos">No hay movimientos</p>
            ) : (
            filtrados.map((mov) => (
                <div className="movimiento" key={mov.id}>
                <p>
                    <strong>Descripción:</strong> {mov.descripcion}
                </p>
                <p>
                    <strong>Monto:</strong> ${mov.monto.toLocaleString()}
                </p>
                <p>
                    <strong>Fecha:</strong> {mov.fecha}
                </p>
                <p>
                    <strong>Persona:</strong> {mov.persona}
                </p>
                </div>
            ))
            )}
        </div>
        );
})}
    </div>
    );
};

export default MovimientosFinancieros;
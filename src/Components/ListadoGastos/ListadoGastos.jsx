import Gasto from "../Gasto/Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? "Gastos"
              : "No hay gastos en esta categoría"}
          </h2>

          {gastosFiltrados.map((gasto) => {
            return (
              <Gasto
                gasto={gasto}
                key={gasto.id}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      ) : (
        <>
          <h2>
            {gastosFiltrados.length ? "Gastos" : "No hay gastos resgistrados"}
          </h2>
          {gastos.map((gasto) => {
            return (
              <Gasto
                gasto={gasto}
                key={gasto.id}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;

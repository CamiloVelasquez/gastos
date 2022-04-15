import { useState } from "react";
import Mensaje from "../Mensaje/Mensaje";

const NuevoPresupuesto = ({ budget, setBudget, setIsValidBudget }) => {
  const [mensaje, setMensaje] = useState("");

  const handleBudget = (e) => {
    e.preventDefault();

    if (!budget || budget < 0) {
      setMensaje("no es un presupuesto valido");
      return;
    }
    setMensaje("");
    setIsValidBudget(true);
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handleBudget}>
        <div className="campo">
          <label htmlFor="budget">Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;

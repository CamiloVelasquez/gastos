import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import ListadoGastos from "./Components/ListadoGastos/ListadoGastos";
import Modal from "./Components/Modal/Modal";
import Filtros from "./Components/Filtros/Filtros";
import { generarId } from "./Helpers/Index";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [budget, setBudget] = useState(
    localStorage.getItem("presupuesto") ?? 0
  );
  const [isValidbudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 300);
    }
  }, [gastoEditar]);

  useEffect(() => {
    Number(localStorage.setItem("presupuesto", budget ?? 0));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria == filtro
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);
  useEffect(() => {
    const presupuestoLocalStorage =
      Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLocalStorage > 0) {
      setIsValidBudget(true);
    }
  }, []);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Actualizar gasto
      const gastosActulizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActulizados);
      setGastoEditar({});
    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActulizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActulizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        budget={budget}
        setBudget={setBudget}
        isValidbudget={isValidbudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidbudget && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;

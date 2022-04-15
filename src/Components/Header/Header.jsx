import NuevoPresupuesto from "../NuevoPresupuesto/NuevoPresupuesto";
import ControlPresupuesto from "../ControlPresupuesto/ControlPresupuesto";

const Header = ({
  gastos,
  setGastos,
  budget,
  setBudget,
  isValidbudget,
  setIsValidBudget,
}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>

      {isValidbudget ? (
        <ControlPresupuesto
          gastos={gastos}
          setGastos={setGastos}
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <NuevoPresupuesto
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
};

export default Header;

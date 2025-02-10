import MotorFinanceForm from "./components/MotorFinanceForm";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Car Finance Reclaim</h2>
        <MotorFinanceForm />
      </div>
    </div>
  );
}

export default App;

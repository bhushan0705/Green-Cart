import Navbar from "./components/Navbar";
import Routing from "./components/Routing";

const App = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <Navbar />
        <Routing></Routing>
      </div>
    </>
  );
};

export default App;

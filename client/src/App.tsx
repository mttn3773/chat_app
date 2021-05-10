import { Notify } from "./components/Notify/Notify";
import { Routes } from "./pages/Routes";
import { GlobalState } from "./store/GlobalState";
import "./styles/global.scss";
import "./utils/prototypes";
function App() {
  return (
    <GlobalState>
      <Notify />
      <Routes />
    </GlobalState>
  );
}

export default App;

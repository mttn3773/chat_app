import { Layout } from "./components/Layout/Layout";
import { Notify } from "./components/Notify/Notify";
import { Routes } from "./pages/Routes";
import { GlobalState } from "./store/GlobalState";
import "./styles/global.scss";
import "./utils/prototypes";
function App() {
  return (
    <GlobalState>
      <Layout>
        <Notify />
        <Routes />
      </Layout>
    </GlobalState>
  );
}

export default App;

import "./App.css";

import LatestBlocks from "./components/LatestBlocks/LatestBlocks";
import Sidebar from "./components/Sidebar/Sidebar";
import TransactionsTable from "./components/TransactionsTable/TransactionsTable";

function App() {
  return (
    <div className="app">
        <Sidebar />
        <div className="main-content">
            <LatestBlocks />
            <TransactionsTable />
        </div>
    </div>
  );
}

export default App;

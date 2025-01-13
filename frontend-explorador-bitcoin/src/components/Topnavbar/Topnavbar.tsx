import "./Topnavbar.css";

const Topnavbar = () => {
  return (
    <div className="topnavbar">
      <h1>BitScan</h1>
      <div className="actions">
        <input type="search" placeholder="Pesquise" />
      </div>
    </div>
  );
};

export default Topnavbar;

import "./LatestBlocks.css";

import { latestBlocks } from "../../mocks";

const LatestBlocks = () => {
  const blocks = latestBlocks;

  return (
    <div className="recent-blocks">
      <header>
        <h2>Últimos Blocos</h2>
        <div>
          <input placeholder=" Pesquise o Bloco aqui" />
        </div>
      </header>

      <div className="box-blocks">
        {blocks.map((block) => (
          <div className="block" key={block.id}>
            <div className="block-icon">
              <i className="bx bx-intersect"></i>
            </div>
            <div className="block-info">
              <span className="block-id">Bloco #{block.id}</span>
              <span className="block-time">
                {block.id} - {block.time}
              </span>
            </div>
            <div className="block-value">{block.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlocks;

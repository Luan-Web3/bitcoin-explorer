import "./LatestBlocks.css";

import React, { useEffect, useState } from "react";

import api from "../../api/api";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { formatTimestamp } from "../../utils/formatTimestamp";
import paths from '../../api/paths'

interface Block {
    hash: string;
    height: number;
    confirmations: number;
    time: number;
};


const LatestBlocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestBlocks();
  }, []);

  const fetchLatestBlocks = async () => {
    try {
      setLoading(true);
      const response = await api.get(paths["blocks"]);
      setBlocks(response.data);
    } catch (error) {
      console.error("Erro ao buscar blocos:", error);
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlockByNumber = async (blockNumber: number) => {
    try {
      setLoading(true);
      const response = await api.get(`${paths["blocks"]}/${blockNumber}`);
      setBlocks([response.data]);
    } catch (error) {
      console.error("Erro ao buscar bloco:", error);
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearch(searchText);

    if (searchText === "") {
      fetchLatestBlocks();
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search) {
      fetchBlockByNumber(parseInt(search));
    } else {
      fetchLatestBlocks();
    }
  };

  return (
    <div className="recent-blocks">
      <header>
        <h2>Últimos Blocos</h2>
        <form onSubmit={handleSearch}>
          <input
            disabled={loading}
            placeholder="Pesquise o Bloco aqui e clique enter"
            value={search}
            onChange={handleSearchChange}
          />
          <button type="submit" hidden>
            Pesquisar
          </button>
        </form>
      </header>

      <div className="box-blocks">
        {blocks.length === 0 && !loading && (
          <div className="no-results">Bloco não encontrado.</div>
        )}
        {blocks.map((block) => (
          <div className="block" key={block.hash}>
            <div className="block-icon">
              <i className="bx bx-intersect"></i>
            </div>
            <div className="block-info">
              <span className="block-id">Bloco #{block.height}</span>
              <span
                className={`block-hash ${
                  copiedHash === block.hash ? "copied" : ""
                }`}
                onClick={() => {
                  copyToClipboard(block.hash, () => setCopiedHash(block.hash));
                  setTimeout(() => setCopiedHash(null), 1500);
                }}
                title="Clique para copiar o hash"
              >
                Hash: {block.hash}
                <span className="copied-tooltip">
                  {copiedHash === block.hash ? (
                    <i className="bx bx-check-double"></i>
                  ) : (
                    <i className="bx bx-copy"></i>
                  )}
                </span>
              </span>
            </div>
            <div className="block-value">
              <div className="block-confirm">
                Confirmações: <span>{block.confirmations}</span>
              </div>
              <div className="block-date">
                Data: {formatTimestamp(block.time)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlocks;

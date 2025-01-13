import "./LatestBlocks.css";

import React, { useCallback, useEffect, useState } from "react";

import api from "../../api";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { formatTimestamp } from "../../utils/formatTimestamp";

interface Block {
  hash: string;
  confirmations: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: string;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash: string | null;
  strippedsize: number;
  size: number;
  weight: number;
  tx: string[];
}

const LatestBlocks = () => {
  const NUMBER_ONE = 1;
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    fetchBlocks(NUMBER_ONE);
  }, []);

  const fetchBlocks = async (blockNumber: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/block/${blockNumber}`);
      setBlocks([response.data]);
    } catch (error) {
      console.error("Erro ao buscar blocos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value;
      setSearch(searchText);

      const delayDebounceFn = setTimeout(() => {
        if (searchText) {
          fetchBlocks(parseInt(searchText));
        } else {
          fetchBlocks(NUMBER_ONE);
        }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    },
    []
  );

  const handleSearch = () => {
    fetchBlocks(parseInt(search));
  };

  return (
    <div className="recent-blocks">
      <header>
        <h2>Últimos Blocos</h2>
        <form onSubmit={handleSearch}>
          <input
            disabled={loading}
            placeholder=" Pesquise o Bloco aqui"
            value={search}
            onChange={handleSearchChange}
          />
        </form>
      </header>

      <div className="box-blocks">
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

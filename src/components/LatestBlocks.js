import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestBlocks = ({ blockNumber, alchemy }) => {
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    async function getLatestBlocks() {
      const latestBlocks = [];
      for (let i = 0; i < 6; i++) {
        const block = await alchemy.core.getBlockWithTransactions(
          blockNumber - i
        );
        latestBlocks.push(block);
      }
      setLatestBlocks(latestBlocks);
    }
    getLatestBlocks();
  }, [blockNumber]);

  return (
    <ul className="flex flex-col gap-4 w-full">
      {latestBlocks.map((block, index) => {
        return (
          <li
            key={index}
            className="flex justify-between shadow-sm shadow-blue-900 p-4  rounded-2xl"
          >
            <div className="flex flex-col w-full justify-start items-start">
              <h3>
                Block Nro:{" "}
                <Link to={`/block/${block.number}`}>
                  <span className="text-blue-500">{block.number}</span>
                </Link>
              </h3>
              <h4>{new Date(block.timestamp * 1000).toUTCString()}</h4>
            </div>
            <div className="flex flex-col w-full justify-start items-start">
              {/* <h4>
                Miner:{" "}
                <Link to={"/"}>
                  <span className="text-blue-500">{block.miner}</span>
                </Link>
              </h4> */}
              <h4 className="">
                Transactions:{" "}
                <Link to={`/block/${block.number}`}>
                  <span className="text-blue-500">
                    {block.transactions.length}
                  </span>
                </Link>
              </h4>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LatestBlocks;

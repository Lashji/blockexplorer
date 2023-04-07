import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Utils } from "alchemy-sdk";

const CurrentBlock = ({ alchemy, blockNumber, block }) => {
  const [burned, setBurned] = useState(0);

  useEffect(() => {
    async function getBurnedAmount() {
      if (!block || !block.baseFeePerGas) return 0;
      setBurned(
        Utils.formatEther(BigInt(block.baseFeePerGas._hex * block.gasUsed._hex))
      );
    }
    getBurnedAmount();
  }, [block]);

  return (
    <div className="flex flex-col gap-8 max-h-screen w-full items-start">
      <div className="bg-blue-950 shadow-md rounded-2xl w-full p-8">
        <h3 className="text-4xl text-white">
          Block Number:{" "}
          <Link to={`/block/${blockNumber}`}>
            <span className="text-blue-500">{blockNumber}</span>
          </Link>
        </h3>
        <h4 className="text-2xl text-white">
          Miner:{" "}
          <Link to={`/address/${block?.miner}`}>
            <span className="text-blue-500">{block?.miner}</span>
          </Link>
        </h4>
        <h4 className="text-2xl text-white">Burned: {burned} ETH</h4>
        <h4 className="text-2xl text-white">
          Time: {new Date(block?.timestamp * 1000).toUTCString()}
        </h4>
        <h4 className="text-2xl text-white">
          transactions:{" "}
          <Link to={`/transaction/${block?.hash}`}>
            <span className="text-blue-500 cursor-pointer">
              {block?.transactions.length} Transactions
            </span>
          </Link>
        </h4>
      </div>
      {/* <BlockTransactions alchemy={alchemy} blockNumber={blockNumber} /> */}
    </div>
  );
};

export default CurrentBlock;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CurrentBlock from "../currentBlock";
import LatestBlocks from "../LatestBlocks";
import AddressSearch from "../addressSearch";

const Home = ({ alchemy }) => {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  useEffect(() => {
    async function getBlock() {
      setBlock(
        await alchemy.core.getBlockWithTransactions(parseInt(blockNumber))
      );
    }

    getBlock();
  }, [blockNumber]);

  return (
    <div className="flex flex-col gap-8 justify-start items-start">
      <AddressSearch />
      <CurrentBlock alchemy={alchemy} blockNumber={blockNumber} block={block} />
      <div className="flex flex-col bg-blue-950 text-white rounded-2xl p-8 w-full">
        <h1 className="flex items-center   text-4xl mb-4 ">Latest Blocks</h1>
        <LatestBlocks blockNumber={blockNumber} alchemy={alchemy} />
      </div>
    </div>
  );
};

export default Home;

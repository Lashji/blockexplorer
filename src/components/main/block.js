import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentBlock from "../currentBlock";
import BlockTransactions from "../blockTransactions";

const Blocks = ({ alchemy }) => {
  const [block, setBlock] = useState();

  const { id } = useParams();

  useEffect(() => {
    async function getBlock() {
      setBlock(await alchemy.core.getBlockWithTransactions(parseInt(id)));
    }

    getBlock();
  }, [id]);

  return (
    <div className="flex flex-col gap-8 justify-start items-start">
      {block ? (
        <>
          <CurrentBlock alchemy={alchemy} blockNumber={id} block={block} />
          <BlockTransactions transactions={block.transactions} />
        </>
      ) : null}
    </div>
  );
};

export default Blocks;

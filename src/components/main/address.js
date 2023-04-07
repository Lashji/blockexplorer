import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Utils } from "alchemy-sdk";
import NFTItem from "../nftItem";

const Address = ({ alchemy }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [nfts, setNfts] = useState(0);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!Utils.isHexString(id)) {
      history.push("/");
    }
  }, [id, history]);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await alchemy.core.getBalance(id, "latest");
      setBalance(balance);
    };
    getBalance();
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await alchemy.core.getTransactionCount(id);
      setTransactions(transactions);
    };
    getTransactions();
  }, []);

  useEffect(() => {
    const getNFTs = async () => {
      const nftsForOwner = await alchemy.nft.getNftsForOwner(id);
      setNfts(nftsForOwner);
    };
    getNFTs();
  }, []);

  if (!balance)
    return <h1 className="text-5xl text-blue-500">Address not found</h1>;

  return (
    <div className="flex flex-col gap-8 text-white items-start ">
      <div className="bg-blue-950 shadow-md rounded-2xl w-full p-8">
        <h3>Address: {id}</h3>
        <h3>ETH Balance: {Utils.formatEther(balance)}</h3>
        <h3>Transactions: {transactions}</h3>
      </div>
      <div className="rounded-2xl bg-blue-950 p-8 w-full">
        <h3 className="text-4xl  flex justify-center">NFTs:</h3>
        <h5 className="flex justify-center mb-4">
          (Showing Address NFT's that have working images)
        </h5>
        <ul className="grid grid-cols-3 gap-4">
          {nfts ? (
            nfts.ownedNfts
              .filter((i) => (i.spamInfo ? !i.spamInfo.isSpam : true))
              .map((nft) => {
                return (
                  <NFTItem
                    key={`${nft.title}-${nft.tokenId}`}
                    nft={nft}
                    alchemy={alchemy}
                  />
                );
              })
          ) : (
            <h2>No NFTs found for this address</h2>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Address;

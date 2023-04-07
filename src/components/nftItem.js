import { useEffect, useState } from "react";

const NFTItem = ({ nft, alchemy }) => {
  const [floor, setFloor] = useState(0);

  useEffect(() => {
    const getFloor = async () => {
      const response = await alchemy.nft.getFloorPrice(nft.contract.address);
      if (response.openSea) {
        setFloor(response.openSea.floorPrice);
      }
    };
    getFloor();
  }, []);

  if (!nft) return null;
  if (!nft.contract) return null;
  if (nft.media.length === 0) return null;

  return (
    <div className="w-52 flex  flex-col gap-4">
      <h3 className="flex justify-center">{nft.contract.name ?? nft.title}</h3>
      {nft.media.length > 0 ? (
        <img src={nft.media[0].gateway} alt={nft.name} />
      ) : null}
      <h3 className="flex justify-center items-center">
        Floor: {floor ?? 0} ETH
      </h3>
    </div>
  );
};

export default NFTItem;

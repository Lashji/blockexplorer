import { useEffect } from "react";

const NFTItem = ({ nft, alchemy }) => {
  useEffect(() => {
    // const response = await alchemy.nft.getNftMetadata(nft.contract.address, nft.tokenId);
    const getNftMetadata = async () => {
      const response = await alchemy.nft.getNftMetadata(
        nft.contract.address,
        nft.tokenId
      );
      console.log("nftitem", response);
    };
    getNftMetadata();
  }, []);

  if (!nft) return null;
  if (!nft.contract) return null;
  if (nft.media.length === 0) return null;

  return (
    <div className="w-52 flex  flex-col gap-4">
      <h3 className="flex justify-center">{nft.contract.name ?? nft.title}</h3>
      {
        nft.media.length > 0 ? (
          <img src={nft.media[0].gateway} alt={nft.name} />
        ) : null
        // <img src={nft.tokenUri.raw} alt={nft.name} />
      }
    </div>
  );
};

export default NFTItem;

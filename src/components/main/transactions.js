import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Transactions = ({ alchemy }) => {
  const [transaction, setTransaction] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getTransaction() {
      setTransaction(await alchemy.core.getTransactionReceipt(id));
    }

    getTransaction();
  }, [id]);

  console.log("transaction", transaction, id);
  return (
    <div>
      {transaction ? (
        <div className="flex flex-col gap-8 text-white items-start">
          <div className="bg-blue-950 shadow-md rounded-2xl w-full p-8">
            <h3>Transaction: {transaction.transactionHash}</h3>
            <h3>
              Block Number:{" "}
              <Link to={`/block/${transaction.blockNumber}`}>
                <span className="text-blue-500">{transaction.blockNumber}</span>
              </Link>
            </h3>
            <h3>
              <Link to={`/address/${transaction.from}`}>
                From: <span className="text-blue-500">{transaction.from}</span>
              </Link>
            </h3>
            <h3>
              <Link to={`/address/${transaction.to}`}>
                To: <span className="text-blue-500">{transaction.to}</span>
              </Link>
            </h3>
            <h3>Type: {transaction.type}</h3>
            <h3>Confirmations {transaction.confirmations}</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Transactions;

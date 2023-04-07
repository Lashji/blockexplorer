import { Utils } from "alchemy-sdk";
import { Link } from "react-router-dom";

const TransactionItem = ({ transaction }) => {
  return (
    <li className="flex flex-col justify-between shadow-sm shadow-blue-900 p-4  rounded-2xl">
      <h3>
        Transaction:{" "}
        <Link to={`/transaction/${transaction.hash}`}>
          <span className="text-blue-500">{transaction.hash}</span>
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
      <h3>Value: {Utils.formatEther(transaction.value)} ETH</h3>
    </li>
  );
};

export default TransactionItem;

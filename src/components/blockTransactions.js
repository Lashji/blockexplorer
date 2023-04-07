import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";
import { Link } from "react-router-dom";
import TransactionItem from "./transactionItem";

const BlockTransactions = ({ transactions }) => {
  return (
    <div className="flex flex-col overflow-scroll flex-1 max-h-[42rem] w-full bg-blue-950 shadow-md p-4 rounded-lg">
      <ul className="text-white flex flex-col gap-4 w-full">
        {transactions
          ? transactions.map((tx) => {
              return (
                <TransactionItem
                  transaction={tx}
                  key={`transaction-${tx.hash}`}
                />
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default BlockTransactions;

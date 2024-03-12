import Transaction from "@/types/Transaction";
import { createContext } from "react";

const TransactionContext = createContext<Transaction | null>(null);

export default TransactionContext;

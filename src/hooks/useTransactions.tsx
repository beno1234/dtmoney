import { createContext, useEffect, useState, ReactNode, useContext } from "react"
import { api } from "../services/api";


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction:(transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;


// dentro de () ira passar o valor que ele precisa inicializar
//dentro do <> carregar uma lista de transactions dentro desse contexto
 const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

//children e para receber conteudo dentro dele no caso <TransactionsProvider>



export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    },[])

    async function createTransaction(transactionInput: TransactionInput){


    const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date(),
    })
    const { transaction } = response.data

    //adicionar uma nova informacao em um vetor eu faco desse jeito
    setTransactions([
        ...transactions,
        transaction
    ]);

}

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
} 


export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}
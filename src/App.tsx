import { Dashboard } from "./components/Dashboards";
import { Header } from "./components/Header/Header";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";


Modal.setAppElement('#root')


export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);



  //setar a informacao que o modal esta aberto
  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true);
  }
  //setar a informacao para fechar o modal
  function handleCloseNewTransactionModal(){
      setIsNewTransactionModalOpen(false);
  }


  return (
    //depois de declarar a interface ele entende que transactionsProvider recebe children - que e o conteudo
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>

      <Dashboard />

    <NewTransactionModal 
    isOpen={isNewTransactionModalOpen}
    onRequestClose={handleCloseNewTransactionModal}
    />

      <GlobalStyle />
    </TransactionsProvider>
  );
}


// contexto = compartilhamento de estados

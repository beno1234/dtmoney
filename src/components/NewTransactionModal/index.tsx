import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import incomeImg from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg';
import { FormEvent, useState} from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const {createTransaction} = useTransactions();

    const [title, setTitle] = useState('');
    //pegar oq for escrito
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    //selecionar os botoes e personaliza-los
    const [type, setType] = useState('deposit');


    async function handleCreateNewTransaction(event: FormEvent){
        //tirar o padrao do HTML do botao
        event.preventDefault()
        // createTransaction é da função que foi criada no contexto para pegar os dados
        //await somente para der certo (aguardar a createTransaction)
        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        onRequestClose();
    }
    

    return(
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >

            <button type='button' onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>
                <input 
                placeholder='Titulo' 
                value={title}
                //pegar o que for escrito em strings
                onChange={event => setTitle(event.target.value)}
                />

                <input 
                type="number" 
                placeholder='Valor' 
                value={amount}
                //pegar o que for escrito em numeros
                onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>

                    <RadioBox
                        type='button'

                        onClick={() => {
                            setType('deposit')
                        }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type='button'
                        onClick={() => {
                            setType('withdraw')
                        }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcome} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>


                </TransactionTypeContainer>


                <input 
                placeholder='Categoria' 
                value={category}
                //pegar o que for escrito
                onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
                
            </Container>
            
        </Modal>
    )
}
import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";




export function TransactionsTable(){
    const {transactions} = useTransactions();
    //estado armazena um array de transaction


    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transaction => ( 
                    <tr key={transaction.id}>
                    <td>{transaction.title}</td>
                    <td className={transaction.type}> 
                        {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(transaction.amount)}
                    </td>
                    <td>{transaction.category}</td>
                    <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

//adicionado o .format para conseguir renderizar e pegar dados da API com da DATA amount pois o numberFormat nao consegue fazer essa leitura de forma clara e objetiva
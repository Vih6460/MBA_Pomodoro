import { HistoryContainer, HistoryList, Status } from "./styles";

export function History(){
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="yellow">Em andamento</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="yellow">Em andamento</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="yellow">Em andamento</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statusColor="green">Concluído</Status></td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
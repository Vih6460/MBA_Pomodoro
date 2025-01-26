import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History(){
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <pre>
                {JSON.stringify(cycles, null, 2)}
            </pre>
            
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
                            <td><Status statuscolor="yellow">Em andamento</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="red">Interrompido</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="green">Concluído</Status></td>
                        </tr>
                        <tr>
                            <td>MBA Full-Stack</td>
                            <td>400 horas</td>
                            <td>Há 6 meses</td>
                            <td><Status statuscolor="green">Concluído</Status></td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
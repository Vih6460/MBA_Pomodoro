import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput 
                type="text" 
                id="task" 
                list="taskSuggestions" 
                placeholder="Dê um nome para seu projeto..."
                disabled={!!activeCycle}
                {...register('task')}
            />

            <label htmlFor="minutesAmount">Durante</label>
            <MinutesAmountInput 
                type="number" 
                id="minutesAmount" 
                step={5} min={5} max={60} 
                placeholder="0"
                {...register('minutesAmount', { valueAsNumber: true })}
                disabled={!!activeCycle}
            />

            <datalist id="taskSuggestions">
                <option value="Work" />
                <option value="Study" />
                <option value="Leisure" />
            </datalist>

            <span>minutos</span>
        </FormContainer>
    )
}
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

const newCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser no mínimo de 5 minutos')
        .max(60, 'O ciclo precisa ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchema>

export function Home(){
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCicleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 5,
        }
    })

    function handleCreateNewCicle(data: NewCycleFormData){
        console.log(data);
        reset();
    }

    const task = watch('task') 
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        type="text" 
                        id="task" 
                        list="taskSuggestions" 
                        placeholder="Dê um nome para seu projeto..."
                        {...register('task')}
                    />

                    <label htmlFor="minutesAmount">Durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        step={5} min={5} max={60} 
                        placeholder="5"
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <datalist id="taskSuggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Projeto 4" />
                    </datalist>

                    <span>minutos</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}
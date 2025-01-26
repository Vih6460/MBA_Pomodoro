import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, StopCountDownButton, TaskInput } from "./styles";
import { useEffect, useState } from "react";

import { differenceInSeconds } from "date-fns";

const newCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser no mínimo de 5 minutos')
        .max(60, 'O ciclo precisa ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCicleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: undefined,
        }
    })

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    
    useEffect(() => {
        let interval: number;

        if(activeCycle){
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if(secondsDifference >= totalSeconds){
                    setCycles(state => state.map(cycle => {
                        if (cycle.id === activeCycleId){
                            return {...cycle, finishedDate: new Date()}
                        } else {
                            return cycle
                        }
                    }))

                    setAmountSecondsPassed(totalSeconds)

                    clearInterval(interval)
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }

            }, 1000)
        }

        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, activeCycleId, totalSeconds])

    function handleCreateNewCicle(data: NewCycleFormData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
    }

    function handleInterruptCycle(){
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId){
                return {...cycle, interruptedDate: new Date()}
            } else {
                return cycle
            }
        }))

        setActiveCycleId(null)

        reset()
    }

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsamount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsamount).padStart(2, '0')

    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

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

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                { !activeCycle ? (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={22} />
                        Começar
                    </StartCountDownButton>
                ) : (
                    <StopCountDownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}
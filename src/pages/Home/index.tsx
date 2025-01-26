import { HandPalm, Play } from "phosphor-react";

import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { createContext, useState } from "react";
import * as zod from 'zod'
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType)

const newCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser no mínimo de 5 minutos')
        .max(60, 'O ciclo precisa ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchema>

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCicleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: undefined,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished(){
        setCycles(state => state.map(cycle => {
            if (cycle.id === activeCycleId){
                return {...cycle, finishedDate: new Date()}
            } else {
                return cycle
            }
        }))
    }

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

    const task = watch('task') 
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
                <CyclesContext.Provider value={{ activeCycle, activeCycleId, amountSecondsPassed, markCurrentCycleAsFinished, setSecondsPassed }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

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
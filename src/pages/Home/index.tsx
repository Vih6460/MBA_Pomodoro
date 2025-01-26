import { HandPalm, Play } from "phosphor-react";

import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import * as zod from 'zod'
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";



const newCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser no mínimo de 5 minutos')
        .max(60, 'O ciclo precisa ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchema>

export function Home(){
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCicleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: undefined,
        }
    })

    const { handleSubmit, watch, /*reset*/ } = newCycleForm

    const task = watch('task') 
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)} action="">
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />

                { !activeCycle ? (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={22} />
                        Começar
                    </StartCountDownButton>
                ) : (
                    <StopCountDownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}
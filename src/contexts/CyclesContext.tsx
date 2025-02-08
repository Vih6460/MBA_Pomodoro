import { createContext, ReactNode, useState, useReducer } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleFinishedAction } from "../reducers/cycles/actions";

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider( {children}:CyclesContextProviderProps ) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    })

    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

    const { cycles, activeCycleId } = cyclesState;

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished(){
        // setCycles(state => state.map(cycle => {
        //     if (cycle.id === activeCycleId){
        //         return {...cycle, finishedDate: new Date()}
        //     } else {
        //         return cycle
        //     }
        // }))
        dispatch(markCurrentCycleFinishedAction())
    }

    function createNewCycle(data: CreateCycleData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        // setCycles((state) => [...state, newCycle]);
        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle(){
        // setCycles(state => state.map(cycle => {
        //     if (cycle.id === activeCycleId){
        //         return {...cycle, interruptedDate: new Date()}
        //     } else {
        //         return cycle
        //     }
        // }))
        dispatch(interruptCurrentCycleAction())
    }

    return (

        <CyclesContext.Provider value={{ 
            cycles, activeCycle, activeCycleId, amountSecondsPassed, 
            markCurrentCycleAsFinished, setSecondsPassed, createNewCycle, interruptCurrentCycle 
        }}>
            {children}
        </CyclesContext.Provider>
    )
}
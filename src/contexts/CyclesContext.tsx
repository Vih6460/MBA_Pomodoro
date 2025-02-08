/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useState, useReducer } from "react";

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

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

interface CyclesState {
    cycles: Cycle[],
    activeCycleId: string | null
}

export function CyclesContextProvider( {children}:CyclesContextProviderProps ) {
    const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
        if (action.type === 'ADD_NEW_CYCLE') {
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id
            }
        }

        if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
            return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if (cycle.id === state.activeCycleId){
                        return {...cycle, interruptedDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeCycleId: null
            }
        }
        
        return state;
    }, {
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
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId
            }
        })
    }

    function createNewCycle(data: CreateCycleData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        // setCycles((state) => [...state, newCycle]);
        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle,
            }
        })
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
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId
            }
        })
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
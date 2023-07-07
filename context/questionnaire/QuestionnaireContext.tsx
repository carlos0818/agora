import { createContext } from 'react'

interface ContextProps {
    percentage: number
    totalQuestions: number
    hide: number
    answeredQuestions: string[]
    updatePercentage: (total: number) => void
    updateTotalQuestions: (total: number) => void
    updateHide: (total: number) => void
    updateAnsweredQuestions: (id: string) => void
    updateAllAnsweredQuestions: (array: string[]) => void
    deleteAnsweredQuestions: (id: string) => void
}

export const QuestionnaireContext = createContext({} as ContextProps)

import React, { FC, useReducer } from 'react'

import { QuestionnaireContext, questionnaireReducer } from './'

export interface QuestionnaireState {
    percentage: number
    totalQuestions: number
    hide: number
    answeredQuestions: string[]
}

const QUESTIONNAIRE_INITIAL_STATE: QuestionnaireState = {
    percentage: 0,
    totalQuestions: 0,
    hide: 0,
    answeredQuestions: []
}

interface Props {
   children: JSX.Element
}

export const QuestionnaireProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(questionnaireReducer, QUESTIONNAIRE_INITIAL_STATE)

    const updatePercentage = (total: number) => {
        dispatch({ type: '[Questionnaire] - Percentage', payload: total })
    }

    const updateTotalQuestions = (total: number) => {
        dispatch({ type: '[Questionnaire] - Total Questions', payload: total })
    }

    const updateHide = (total: number) => {
        dispatch({ type: '[Questionnaire] - Hide', payload: total })
    }

    const updateAnsweredQuestions = (id: string) => {
        dispatch({ type: '[Questionnaire] - AnsweredQuestions', payload: id })
    }

    const updateAllAnsweredQuestions = (array: string[]) => {
        dispatch({ type: '[Questionnaire] - AllAnsweredQuestions', payload: array })
    }

    const deleteAnsweredQuestions = (id: string) => {
        dispatch({ type: '[Questionnaire] - DeleteAnsweredQuestions', payload: id })
    }

    return (
        <QuestionnaireContext.Provider value={{
            ...state,
            updatePercentage,
            updateTotalQuestions,
            updateHide,
            updateAnsweredQuestions,
            updateAllAnsweredQuestions,
            deleteAnsweredQuestions
        }}>
            { children }
        </QuestionnaireContext.Provider>
    )
}

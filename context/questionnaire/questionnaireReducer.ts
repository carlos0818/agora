import { QuestionnaireState } from './'

type AuthActionType =
    | { type: '[Questionnaire] - Percentage', payload: number }
    | { type: '[Questionnaire] - Total Questions', payload: number }
    | { type: '[Questionnaire] - Hide', payload: number }
    | { type: '[Questionnaire] - MasterHide', payload: string[] }
    | { type: '[Questionnaire] - New MasterHide', payload: string[] }
    | { type: '[Questionnaire] - Remove MasterHide', payload: string[] }
    | { type: '[Questionnaire] - AnsweredQuestions', payload: string }
    | { type: '[Questionnaire] - AllAnsweredQuestions', payload: string[] }
    | { type: '[Questionnaire] - DeleteAnsweredQuestions', payload: string }

export const questionnaireReducer = (state: QuestionnaireState, action: AuthActionType): QuestionnaireState => {
    switch (action.type) {
        case '[Questionnaire] - MasterHide':
            return {
                ...state,
                masterHide: [...state.masterHide, ...action.payload]
            }
        case '[Questionnaire] - New MasterHide':
            return {
                ...state,
                masterHide: action.payload
            }
        case '[Questionnaire] - Remove MasterHide':
            return {
                ...state,
                masterHide: state.masterHide.filter(master => action.payload.indexOf(master) < 0)
            }
        case '[Questionnaire] - Percentage':
            return {
                ...state,
                percentage: action.payload
            }
        case '[Questionnaire] - Total Questions':
            return {
                ...state,
                totalQuestions: action.payload
            }
        case '[Questionnaire] - Hide':
            return {
                ...state,
                hide: action.payload
            }
        case '[Questionnaire] - AnsweredQuestions':
            return {
                ...state,
                answeredQuestions: [...state.answeredQuestions, action.payload]
            }
        case '[Questionnaire] - AllAnsweredQuestions':
            return {
                ...state,
                answeredQuestions: action.payload
            }
        case '[Questionnaire] - DeleteAnsweredQuestions':
            return {
                ...state,
                answeredQuestions: state.answeredQuestions.filter(answered => answered !== action.payload)
            }
        default:
            return state
    }
}
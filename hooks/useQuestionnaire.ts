import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { agoraApi } from '@/api'
import countriesList from '@/db/countries'

import { AuthContext } from '@/context/auth'
import { QuestionnaireContext } from '@/context/questionnaire'
import { useLoadQuestions } from './useLoadQuestions'

export const useQuestionnaire = (isMyAccountServer: boolean) => {
    const { user } = useContext(AuthContext)
    const { masterHide } = useContext(QuestionnaireContext)

    const router = useRouter()

    const { validJSON, data, loadQuestions, getUserAnswers } = useLoadQuestions()

    const [loading, setLoading] = useState(false)
    const [years, setYears] = useState<number[]>([])
    const [showQuestionnaire, setShowQuestionnaire] = useState(false)
    const [selectBox, setSelectBox] = useState<string | null>(null)

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)

    const { countries } = countriesList

    useEffect(() => {
        const $page = document.querySelector(`#wrapper-${ start + 1 }`)
        const $wrapperPage = document.querySelectorAll(`.wrapper-page`)
        for (let i=0; i<$wrapperPage.length; i++) {
            $wrapperPage[i].classList.add('wrapper-hide')
        }
        $page?.classList.remove('wrapper-hide')
    })

    useEffect(() => {
        loadQuestions()
    }, [])

    useEffect(() => {
        loadYears()
    }, [])

    useEffect(() => {
        detectOrientation()

        return () => {
            let landscape = window.matchMedia("(orientation: landscape)")
            landscape.removeEventListener('change', detectOrientation)
        }
    }, [])

    useEffect(() => {
        if (user) {
            setLoading(true)
            if(!localStorage.getItem('questionnaire') || !validJSON) {
                Promise.all([
                    loadQuestions(),
                    getUserAnswers(),
                    validateCompleteQuestionnaire(isMyAccountServer)
                ]).then(() => {
                    setLoading(false)
                })
            } else {
                Promise.all([
                    loadQuestions(),
                    validateCompleteQuestionnaire(isMyAccountServer)
                ]).then(() => {
                    setLoading(false)
                })
            }
        }
    }, [user])

    useEffect(() => {
        if (user) {
            Promise.all([
                loadQuestions(),
                getUserAnswers(),
                validateCompleteQuestionnaire(isMyAccountServer)
            ])
        }
    }, [selectBox])

    useEffect(() => {
        const $containerClass = document.querySelectorAll(`.container`)
        for (let i=0; i<$containerClass.length; i++) {
            $containerClass[i]?.classList.remove('wrapper-hide')
        }

        masterHide.map(hide => {
            const $container = document.querySelector(`#container-${ hide }`)
            $container?.classList.add('wrapper-hide')
        })
    }, [masterHide, selectBox])

    const validateCompleteQuestionnaire = async(isMyAccountServer: boolean) => {
        try {
            await agoraApi.get(`/question/validate-complete-questionnaire-by-email?email=${ user?.email }`)
        } catch (error) {
            if (isMyAccountServer)
                router.replace(`/profile/${ user?.id }`)
        }
    }    

    const loadYears = () => {
        const date = new Date()
        let year = date.getFullYear()
        const arrYears = []
        for (let i=102; i>1; i--) {
            arrYears.push(year)
            year = year - 1
        }
        setYears(arrYears)
    }

    const detectOrientation = () => {
        let landscape = window.matchMedia("(orientation: landscape)")

        if (landscape.matches) {
            setShowQuestionnaire(true)
        } else {
            setShowQuestionnaire(false)
        }

        landscape.addEventListener('change', function (e) {
            if (e.matches) {
                setShowQuestionnaire(true)
                location.reload()
            } else {
                setShowQuestionnaire(false)
            }
        })
    }

    

    return {
        loading,
        data,
        countries,
        years,
        showQuestionnaire,
        validJSON,
        selectBox,
        setStart,
        setEnd,
        setSelectBox,
    }
}
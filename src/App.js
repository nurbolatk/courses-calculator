import React, { useReducer, useEffect } from 'react'
import './App.css'
import SemesterForm from './components/SemesterForm'
import SemesterDisplay from './components/SemesterDisplay'
import { useState } from 'react'
import CoursesTypeResult from './components/CoursesTypeResult'

const requirements = {
    natural: 4,
    shss: 4,
    technical: 4,
    kaz: 2,
    hok: 1,
    credits: 240,
}

const initialUcheba = []

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_SEMESTER':
            return state.concat([action.payload])
        case 'SWAP_STORE':
            return action.payload
        default:
            return state
    }
}

function App() {
    const [ucheba, dispatch] = useReducer(reducer, initialUcheba)
    const [isFormOpen, setIsFormOpen] = useState(false)

    useEffect(() => {
        const cache = localStorage.getItem('ucheba')
        if (cache) {
            dispatch({
                type: 'SWAP_STORE',
                payload: JSON.parse(cache),
            })
        }
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('ucheba', JSON.stringify(ucheba))
    }, [ucheba])

    const courses = ucheba.flatMap(semester => semester.courses)
    const byType = courses.reduce((acc, cur) => {
        acc.has(cur.type)
            ? acc.set(cur.type, [...acc.get(cur.type), cur])
            : acc.set(cur.type, [cur])
        return acc
    }, new Map())

    const addSemester = values => {
        dispatch({
            type: 'ADD_SEMESTER',
            payload: values,
        })
        setIsFormOpen(false)
    }

    const showSemesterForm = () => {
        setIsFormOpen(!isFormOpen)
    }

    return (
        <div className="App">
            <div>
                {isFormOpen && <SemesterForm addSemester={addSemester} />}
                {ucheba.map(semester => (
                    <SemesterDisplay semester={semester} key={semester.name} />
                ))}
                <button onClick={showSemesterForm}>
                    {!isFormOpen ? 'Add semester' : 'Cancel'}
                </button>
            </div>
            <div>
                <CoursesTypeResult
                    byType={byType}
                    requirements={requirements.core}
                    type="core"
                />
                <CoursesTypeResult
                    byType={byType}
                    requirements={requirements.natural}
                    type="natural"
                />
                <CoursesTypeResult
                    byType={byType}
                    requirements={requirements.shss}
                    type="shss"
                />
                <CoursesTypeResult
                    byType={byType}
                    requirements={requirements.kaz}
                    type="kaz"
                />
                <CoursesTypeResult
                    byType={byType}
                    requirements={requirements.hok}
                    type="hok"
                />
                <CoursesTypeResult
                    byType={byType}
                    requirements={requirements.free}
                    type="free"
                />
            </div>
        </div>
    )
}

export default App

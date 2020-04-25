import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button`
    background: #fff;
    border-radius: 3px;
    color: palevioletred;
    border: 2px solid palevioletred;
    // margin: 0 1rem;
    padding: 0.25rem 1rem;

    ${props =>
        props.primary &&
        css`
            background: palevioletred;
            color: white;
        `}
`

const CourseForm = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    margin: 2rem 0;

    input {
        font-size: inherit;
        padding: 0.8rem 1.4rem;
    }
`

const SemesterForm = ({ addSemester }) => {
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
    })
    const [index, setIndex] = useState(4)

    const saveSemester = values => {
        addSemester(values)
    }

    const addCourse = () => {
        setIndex(index + 1)
    }

    const removeCourse = () => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    return (
        <form onSubmit={handleSubmit(saveSemester)}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                }}
            >
                <label htmlFor="name">Semester name</label>
                <input id="name" type="text" name="name" ref={register} />
            </div>
            <p>Courses</p>
            {[...Array(index + 1)].map((_, i) => (
                <CourseForm key={i}>
                    <input
                        type="text"
                        name={`courses[${i}].name`}
                        ref={register}
                    />
                    <select name={`courses[${i}].type`} ref={register}>
                        <option value="core">Core</option>
                        <option value="natural">Natural elective</option>
                        <option value="technical">Technical elective</option>
                        <option value="shss">SHSS elective</option>
                        <option value="kaz">Kaz</option>
                        <option value="free">Free</option>
                    </select>
                    <input
                        type="number"
                        name={`courses[${i}].credits`}
                        ref={register}
                    />
                </CourseForm>
            ))}
            <Button type="button" onClick={addCourse}>
                Add new course
            </Button>
            <Button type="button" onClick={removeCourse}>
                Remove new course
            </Button>
            {errors.name && <p>{errors.name.message}</p>}
            <Button primary type="submit">
                Save
            </Button>
        </form>
    )
}

export default SemesterForm

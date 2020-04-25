import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const SemesterForm = ({ addSemester }) => {
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
    })
    const [index, setIndex] = useState(0)

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
                <div key={i}>
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
                        <option value="hok">HoK</option>
                        <option value="free">Free</option>
                    </select>
                    <input
                        type="number"
                        name={`courses[${i}].credits`}
                        ref={register}
                    />
                </div>
            ))}
            <button type="button" onClick={addCourse}>
                Add new course
            </button>
            <button type="button" onClick={removeCourse}>
                Remove new course
            </button>
            {errors.name && <p>{errors.name.message}</p>}
            <button type="submit">Save</button>
        </form>
    )
}

export default SemesterForm

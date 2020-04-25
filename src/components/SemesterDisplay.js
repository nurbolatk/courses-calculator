import React from 'react'
import Course from './Course'

const SemesterDisplay = ({ semester }) => {
    return (
        <div>
            <h3>{semester.name}</h3>
            {semester.courses.map(course => (
                <Course course={course} key={course.name} />
            ))}
        </div>
    )
}

export default SemesterDisplay

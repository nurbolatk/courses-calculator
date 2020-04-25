import React from 'react'

const Course = ({ course }) => {
    return (
        <div key={course.name}>
            <span>{course.name}</span>
            <span>{course.credits}</span>
            {/* <span>{course.name}</span> */}
        </div>
    )
}

export default Course

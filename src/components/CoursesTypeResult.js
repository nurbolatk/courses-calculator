import React from 'react'
import Course from './Course'

const CoursesTypeResult = ({ byType, type, requirements }) => {
    console.log('err', byType.has(type) ? 1 : 0)
    const len = byType.has(type) ? byType.get(type).size : 0
    return (
        <div>
            <p>{type.toUpperCase()}</p>
            {byType.has(type) && (
                <>
                    {byType.get(type).map(course => (
                        <Course course={course} key={course.name} />
                    ))}
                </>
            )}
            {requirements && <p>Remaining: {requirements - len}</p>}
        </div>
    )
}

export default CoursesTypeResult

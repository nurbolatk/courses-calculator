import React from 'react'
import styled from 'styled-components'

const StyledCourse = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    margin: 5px 0;
`

const Course = ({ course }) => {
    return (
        <StyledCourse key={course.name}>
            <span>{course.name}</span>
            <span>{course.credits} cr.</span>
            {/* <span>{course.name}</span> */}
        </StyledCourse>
    )
}

export default Course

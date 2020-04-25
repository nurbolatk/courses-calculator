import React from 'react'
import Course from './Course'
import styled from 'styled-components'

const TypeResult = styled.div`
    color: white;
    background-color: ${props => {
        switch (props.type) {
            case 'natural':
                return 'mediumseagreen'
            case 'shss':
                return 'deeppink'
            case 'kaz':
                return 'darkcyan'
            case 'core':
                return 'slateblue'
            case 'technical':
                return 'darkmagenta'
            default:
                return 'tomato'
        }
    }};
    padding: 2rem;
    border-radius: 3px;
`

const Header = styled.h3`
    margin-bottom: 2rem;
`

const Remaining = styled.p`
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    padding-top: 1rem;
    font-size: 1.8rem;
`

const CoursesTypeResult = ({ byType, type, requirements }) => {
    const len = byType.has(type) ? byType.get(type).length : 0
    const remaining = requirements && requirements - len
    return (
        <TypeResult type={type}>
            <Header>&#8227; {type.toUpperCase()}</Header>
            {byType.has(type) && (
                <>
                    {byType.get(type).map(course => (
                        <Course course={course} key={course.name} />
                    ))}
                </>
            )}

            {requirements && remaining ? (
                <Remaining>
                    <span>Remaining:</span>
                    <strong>{remaining}</strong>
                </Remaining>
            ) : null}
        </TypeResult>
    )
}

export default CoursesTypeResult

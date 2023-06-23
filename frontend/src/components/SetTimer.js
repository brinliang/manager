import React, { useState } from 'react'
import CumulativeHoursPerDay from './CumulativeHoursPerDay'
import HoursPerDay from './HoursPerDay'
import styled from 'styled-components'

const SetSession = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float: left;
    width: 30%;
    height: 100%;
`

const SetClock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 20%;
`

const SetNumber = styled.input`
    width: 45%;
    height: 100%;
    font-size: 80px;
`

const SetNotes = styled.textarea`
    margin-top: 5%;
    width: 80%;
    height: 40%;
    font-size: 20px;
    padding: 10px;
    font-family: 'Montserrat', sans-serif;
`

const StartButton = styled.button`
    margin-top: 5%;
    width: 60%;
    height: 10%;
    font-size: 40px;
    background-color: white;
    
`

const Visual = styled.div`
    width: 70%;
    height: 100%;
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    font-size: 20px;
`

const SetTimer = ({ notes, setNotes, setStartTime, setEndTime, changeMode }) => {
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')

    const reset = () => {
        setStartTime(Date.now())
        setEndTime(Date.now() + hours * 1000 * 60 * 60 + minutes * 1000 * 60)
        changeMode('time')
    }

    return (
        <>
            <SetSession>
                <SetClock>
                    <SetNumber type='number' value={hours} onChange={e => setHours(e.target.value)} />
                    <SetNumber type='number' step={15} value={minutes} onChange={e => setMinutes(e.target.value)} />
                </SetClock>
                <SetNotes value={notes} onChange={e => setNotes(e.target.value)}></SetNotes>
                <StartButton onClick={reset}> ▶ </StartButton>
            </SetSession>
            <Visual>
                <Title> Hours </Title>
                <HoursPerDay width={700} height={350} />
                <Title> Cumulative Hours </Title>
                <CumulativeHoursPerDay width={700} height={350} />
            </Visual>
        </>
    )
}

export default SetTimer
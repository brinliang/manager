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
    width: 45%;
    height: 20%;
`

const SetNumber = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    height: 100%;
`

const InputNumber = styled.input`
    width: 100px;
    height: 50%;
    font-size: 70px;
    text-align: center;
`

const IncrementNumber = styled.button`
    width: 100px;
    height: 20%;
    background-color: white;
    stroke: black;
`

const SetNotes = styled.textarea`
    margin-top: 5%;
    width: 300px;
    height: 30%;
    font-size: 20px;
    padding: 10px;
    font-family: 'Montserrat', sans-serif;
`

const StartButton = styled.button`
    margin-top: 5%;
    width: 200px;
    height: 10%;
    font-size: 40px;
    background-color: white;
    stroke: black;
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
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [average, setAverage] = useState(0)
    const [cumulative, setCumulative] = useState(0)


    const reset = () => {
        setStartTime(Date.now())
        setEndTime(Date.now() + hours * 1000 * 60 * 60 + minutes * 1000 * 60)
        changeMode('time')
    }

    return (
        <>
            <SetSession>
                <SetClock>
                    <SetNumber>
                        <IncrementNumber onClick={e => setHours(hours + 1)}>▲</IncrementNumber>
                        <InputNumber inputmode='numeric' pattern='[0-9]*' type='number' value={hours} onChange={e => setHours(e.target.value)} />
                        <IncrementNumber onClick={e => setHours(hours - 1)}>▼</IncrementNumber>
                    </SetNumber>
                    <SetNumber>
                        <IncrementNumber onClick={e => setMinutes(minutes + 15)}>▲</IncrementNumber>
                        <InputNumber inputmode='numeric' pattern='[0-9]*' type='number' step={15} value={minutes} onChange={e => setMinutes(e.target.value)} />
                        <IncrementNumber onClick={e => setMinutes(minutes - 15)}>▼</IncrementNumber>
                    </SetNumber>
                </SetClock>
                <SetNotes value={notes} onChange={e => setNotes(e.target.value)}></SetNotes>
                <StartButton onClick={reset}> ▶ </StartButton>
            </SetSession>
            <Visual>
                <Title> Average Hours: {average} </Title>
                <HoursPerDay setAverage={setAverage} width={500} height={250} />
                <Title> Cumulative Hours: {cumulative} </Title>
                <CumulativeHoursPerDay setCumulative={setCumulative} width={500} height={250} />
            </Visual>
        </>
    )
}

export default SetTimer
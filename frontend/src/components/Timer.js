import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Clock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float: right;
    width: 50%;
    height: 100%

`

const ClockNumber = styled.div`
    width: 50%;
    font-size: 280px;
`

const Notes = styled.div`
    width: 40%;
    font-size: 70px;
    float: left;
    padding: 50px;
    white-space: pre;
`

const Timer = ({ notes, startTime, endTime, changeMode }) => {
    const [time, setTime] = useState(endTime - Date.now())
    const [wake, setWake] = useState(true)

    const logs = {
        notes: notes,
        startTime: startTime
    }

    const stopTimer = () => {
        logs.endTime = Date.now()
        axios
            .post(BACKEND_URL + '/add', logs)
        changeMode('set')
    }

    useEffect(() => {
        const interval = setInterval(() => setTime(endTime - Date.now()), 1000)
        if (wake && time <= 5 * 60 * 1000) {
            axios
                .get(BACKEND_URL + '/healthcheck')
            setWake(false)
        }
        if (time <= 0) {
            stopTimer()
        }
        return () => clearInterval(interval)
    })

    return (
        <>
            <Notes>
                {notes}
                {/* <button onClick={stopTimer}> stop </button> */}
            </Notes>
            <Clock>
                <ClockNumber> {`${Math.floor((time / (1000 * 60 * 60)))}`.padStart(2, '0')} </ClockNumber>
                <ClockNumber> {`${Math.floor((time / (1000 * 60)) % 60)}`.padStart(2, '0')} </ClockNumber>
            </Clock>
        </>
    )
}

export default Timer
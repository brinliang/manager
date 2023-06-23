import React, { useState } from 'react'
import SetTimer from './components/SetTimer'
import Timer from './components/Timer'

const App = () => {
    const [mode, setMode] = useState('set')
    const [startTime, setStartTime] = useState(Date.now())
    const [endTime, setEndTime] = useState(3000000 + Date.now())
    const [notes, setNotes] = useState('')

    const changeMode = (newMode) => {
        setMode(newMode)
    }

    return (
        <>
            {mode == 'time' && <Timer notes={notes} startTime={startTime} endTime={endTime} changeMode={changeMode} />}
            {mode == 'set' && <SetTimer notes={notes} setNotes={setNotes} setStartTime={setStartTime} setEndTime={setEndTime} changeMode={changeMode} />}
        </>
    )
}

export default App
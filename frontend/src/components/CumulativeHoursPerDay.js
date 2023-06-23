import React, { useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import * as d3 from 'd3'

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 }

const CumulativeHoursPerDay = ({ setCumulative, width, height }) => {
    const [data, setData] = useState([{ x: 0, y: 0 }])

    const axesRef = useRef(null);
    const boundsWidth = width - MARGIN.right - MARGIN.left
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
    const parseTime = d3.timeParse('%m/%d/%Y')

    useEffect(() => {
        axios
            .get(BACKEND_URL + '/cumulative-hours-per-day')
            .then(response => {
                setData(response.data.data.map((i) => ({ 'x': parseTime(i[0]), 'y': i[1] })))
                setCumulative(response.data.cumulative)
            })

    }, [])

    const [min, max] = d3.extent(data, (d) => d.y)
    const yScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, max || 0])
            .range([boundsHeight, 0])
    }, [data, height])

    const [xMin, xMax] = d3.extent(data, (d) => d.x)
    const xScale = useMemo(() => {
        return d3
            .scaleTime()
            .domain([xMin, xMax])
            .range([0, boundsWidth])
    }, [data, width])

    useEffect(() => {
        const svgElement = d3.select(axesRef.current)
        svgElement.selectAll('*').remove()
        svgElement
            .append('g')
            .attr('transform', 'translate(0,' + boundsHeight + ')')
            .call(d3.axisBottom(xScale).ticks(5))

        const yAxisGenerator = d3.axisLeft(yScale)
        svgElement.append('g').call(yAxisGenerator)
    }, [xScale, yScale, boundsHeight])

    const lineBuilder = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));
    const linePath = lineBuilder(data)
    if (!linePath) {
        return null
    }

    return (
        <>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
                >
                    <path
                        d={linePath}
                        opacity={1}
                        stroke='#000000'
                        fill='none'
                        strokeWidth={2}
                    />
                </g>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    ref={axesRef}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
                />
            </svg>
        </>
    )
}

export default CumulativeHoursPerDay
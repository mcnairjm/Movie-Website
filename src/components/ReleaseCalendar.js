import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths } from 'date-fns';

function ReleaseCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);

    useEffect(() => {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        setDays(eachDayOfInterval({ start, end }));
    }, [currentDate]);

    const handlePreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '20px' }}>
                <button onClick={handlePreviousMonth}>&lt;</button>
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat (7, 1fr)', gap: '10px', width: '100%', padding: '10px'}}>
                {days.map((day) => (
                    <div key={day} style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <span>{format(day, 'd')}</span>
                        {/*Placeholder for movie titles*/}
                        <div style={{ fontSize: '12px', color: '#555'}}>
                            {/*Example: Movie Title*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReleaseCalendar;
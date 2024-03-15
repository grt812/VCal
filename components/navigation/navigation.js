"use client";

export default function Navigation({currentDate, prevMonth, nextMonth}) {
    return(
        <div id="navigation" className="flex header">
            <button className="arrow-button" onClick={prevMonth}>&lt;</button>
            <span className="grow text-center">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <button className="arrow-button" onClick={nextMonth}>&gt;</button>
        </div>
    );

}
"use client";
// import Calendar from "../calendar/calendar";

export default function Navigation({currentDate, prevMonth, nextMonth}) {

    return(
        <div id="navigation" className="flex header">
            <button onClick={prevMonth}>&lt;</button>
            <span class="grow text-center">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <button onClick={nextMonth}>&gt;</button>
        </div>
    );

}
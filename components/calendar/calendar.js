"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import Navigation from '../navigation/navigation';


export default function Calendar() {
  // Get current date
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);

  // Function to get the number of days in a month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  // Function to get the first day of the month
  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Function to handle previous month button click
  const goToPrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  // Function to handle next month button click
  const goToNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const handleKeyDown = (event) => {
    const { key } = event;

  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [date]);

  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = getFirstDayOfMonth(date);

  // Create an array of days in the month
  const monthDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  // Create an array to represent blank cells before the first day of the month
  const blankCells = Array.from({ length: firstDayOfMonth }, (_, index) => index);

  return (
    <div id="calendar-container">
      <Navigation id="navigation-menu" currentDate={date} prevMonth={goToPrevMonth} nextMonth={goToNextMonth} ></Navigation>
      <div id="calendar">
        <div className="days">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="day">{day}</div>
          ))}
        </div>
        <div className="dates">
          {blankCells.map((cell, index) => (
            <div key={index} className="date empty"></div>
          ))}
          {monthDays.map(day => (
            <div key={day} className="date">{day}</div>
          ))}
        </div>
      </div>
    </div>
  );
};



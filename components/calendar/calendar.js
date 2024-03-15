"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import Navigation from '../navigation/navigation';


export default function Calendar() {
  // Get current date
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const [selectedCell, setSelectedCell] = useState(0);

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

  //Add event listener for keydown to switch between cells
  const handleKeyDown = (event) => {
    const { keyCode } = event;

    if(keyCode == 37){
      moveSelectedLeft();
    } else if(keyCode == 39){
      moveSelectedRight();
    } else if(keyCode == 38){
      moveSelectedUp();
    } else if(keyCode == 40){
      moveSelectedDown();
    }
  };

  const moveSelectedRight = () => {
    setSelectedCell((current)=>{
      current = current+1 % monthDays.length;
      if(current != current % monthDays.length ){
        current = current % monthDays.length;
      }
      console.log(current);
      return current;
    });
  }

  const moveSelectedLeft = () => {
    setSelectedCell((current)=>{
      current = current-1 % monthDays.length;
      if(current != current % monthDays.length ){
        current = current % monthDays.length;
      }
      console.log(current);
      return current;
    });
  }

  const moveSelectedUp = () => {
    setSelectedCell((current)=>{
      current = current-7 % monthDays.length;
      if(current != current % monthDays.length ){
        current = current % monthDays.length;
      }
      console.log(current);
      return current;
    });
  }
  
  const moveSelectedDown = () => {
    setSelectedCell((current)=>{
      current = current+7 % monthDays.length;
      if(current != current % monthDays.length ){
        current = current % monthDays.length;
      }
      console.log(current);
      return current;
    });
  }



  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [date]);

  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = getFirstDayOfMonth(date);
  const monthDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const blankCells = Array.from({ length: firstDayOfMonth }, (_, index) => index);

  const AddEvent = (eventData) => {
    setEvents([...events, eventData]); 
  };

  const EditEvent = (index, updatedEvent) => {
    const updatedEvents = [...events];
    updatedEvents[index] = updatedEvent;
    setEvents(updatedEvents);
  };

  const DeleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  return (
    <div id="calendar-container">
      <Navigation id="navigation-menu" currentDate={date} prevMonth={goToPrevMonth} nextMonth={goToNextMonth} ></Navigation>
      <div id="calendar">
        <div className="days">
          {console.log(selectedCell)}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className={"day"}>{day}</div>
          ))}
        </div>
        <div className="dates">
          {blankCells.map((cell, index) => (
            <div key={index} className="date empty"></div>
          ))}
          {monthDays.map((day, index) => (
            <div key={day} className={"date "+ (index == selectedCell ? "selected" : "")}>{day}</div>
          ))}
        </div>
      </div>
    </div>
  );
};



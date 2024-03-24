"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import Navigation from '../navigation/navigation';
import Modal from '../modal/modal';


export default function Calendar() {
  // Get current date
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const [prevDate, setPrevDate] = useState(currentDate);
  const [showModal, setShowModal] = useState(false);
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
    const newPrevDate = new Date(date); 
    newDate.setMonth(newDate.getMonth() - 1);
    newPrevDate.setMonth(newPrevDate.getMonth() - 2);
    setDate(newDate);
    setDate(prevDate);
  };

  // Function to handle next month button click
  const goToNextMonth = () => {
    const newDate = new Date(date);
    const newPrevDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
    setDate(newPrevDate);
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
    } else if(keyCode == 13){
      setShowModal(true);
    }
  };

  const moveSelectedRight = () => {
    setSelectedCell((current)=>{
      current = mod(current+1,monthDays.length);
      if(current != mod(current, monthDays.length)){
        current = mod(current, monthDays.length);
      } else {
        console.log("current cell:" + current);
      }
      console.log(current);
      return current;
    });
  }

  const moveSelectedLeft = () => {
    setSelectedCell((current)=>{
      current = mod(current-1,monthDays.length);
      if(current != mod(current, monthDays.length)){
        current = mod(current, monthDays.length);
      } else {
        console.log("current cell:" + current);
      }
      console.log(current);
      return current;
    });
  }

  const moveSelectedUp = () => {
    setSelectedCell((current)=>{
      current = mod(current-7, monthDays.length);
      if(current != mod(current, monthDays.length)){
        current = mod(current, monthDays.length);
      } else {
        console.log("current cell:" + current);
      }
      console.log(current);
      return current;
    });
  }
  
  const moveSelectedDown = () => {
    setSelectedCell((current)=>{
      current = mod(current+7,monthDays.length);
      if(current != mod(current, monthDays.length)){
        current = mod(current, monthDays.length);
      } else {
        console.log("current cell:" + current);
      }
      console.log(current);
      return current;
    });
  }

  function mod(n, m) {
    return ((n % m) + m) % m;
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
    setShowModal(false);
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
      <Navigation
        id="navigation-menu"
        currentDate={date}
        prevMonth={goToPrevMonth}
        nextMonth={goToNextMonth}
      />
      <div id="calendar">
        <div className="days">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} className="day">
              {day}
            </div>
          ))}
        </div>
        <div className="dates">
          {blankCells.map((_, index) => (
            <div key={`blank-${index}`} className="date empty"></div>
          ))}
          {monthDays.map((day, index) => (
            <div
              key={day}
              className={`date ${index === selectedCell ? 'selected' : ''}`}
              onClick={() => {
                setSelectedCell(index);
              }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={(eventData) => {
            // Handle event data submission here
            console.log(eventData);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );  

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

  return (
    <div id="calendar-container">
      <Navigation id="navigation-menu" currentDate={date} prevMonth={goToPrevMonth} nextMonth={goToNextMonth}></Navigation>
      <div id="calendar">
        {/* ... */}
      </div>
      {modal && <Modal onClose={() => setModal(false)} onSubmit={addEvent} />}
    </div>
  );
};



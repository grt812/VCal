"use client";

import React, { useState } from 'react';

export default function Calendar() {

  return (
    <div className="calendar">
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
  );
};



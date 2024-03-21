import React, { useState } from 'react';

const Modal = ({ onClose, onSubmit }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
    onClose();
    setEventData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
    });
  };

  //TODO: START AND END TIME BLANK NO ENTIRES
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            placeholder="Event Title"
          />
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            placeholder="Event Description"
          ></textarea>
          <input
            type="datetime-local"
            name="startTime"
            value={eventData.startTime}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="endTime"
            value={eventData.endTime}
            onChange={handleInputChange}
          />
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
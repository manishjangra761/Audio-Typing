import React from 'react'
import '../styles/ContactArea.css'
import { MdLocationPin, MdCall } from "react-icons/md";

const ContactArea = () => {
  return (
    <div className='contact-container'>
      <div className='contact-description'>
        <p className="contact-text">
          If you have any questions or feedback, please don't hesitate to contact us.
        </p>

        <div className="contact-item">
          <MdLocationPin className="contact-icon" />
          <span>ABC XYZ ROAD, CITY, Haryana, INDIA</span>
        </div>

        <div className="contact-item">
          <MdCall className="contact-icon" />
          <span>+91 9876543212</span>
        </div>
      </div>

      <div className='contact-form'>
        contact form
      </div>
    </div>
  )
}

export default ContactArea

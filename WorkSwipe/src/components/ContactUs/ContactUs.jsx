import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./ContactUs.css"
import BasicButtons from '../BasicButtons/BasicButtons';
import CustomLinkNavigate from '../CustomLinkNavigate/CustomLinkNavigate';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_rcc05w9', 'template_lekb5ci', form.current, {
        publicKey: 'D-2sK0MWtosEh9H0q',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form className='contactUs' ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};
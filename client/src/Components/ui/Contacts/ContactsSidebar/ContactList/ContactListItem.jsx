import React from 'react'
import { useParams } from 'react-router-dom';
import ContactInfo from './ContactInfo';
import ContactPic from './ContactPic';

export default function ContactListItem({ contact, ref }) {
  let { id } = useParams();

  return (
    <div
      ref={ref}
      className={
        "w-full py-3 hover:bg-sidebar px-3 flex gap-3 items-center rounded-md cursor-pointer" +
        (contact.id === +id ? " bg-sidebar" : "")
      }
    >
      <ContactPic contact={contact} />
      <ContactInfo contact={contact} />
    </div>
  );
}

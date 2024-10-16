import React, { useState, useEffect } from 'react';
import { fetchContacts, addContact, deleteContact, updateContact } from './contactService.js';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    first_name: '',
    last_name: '',
    preferred_pronouns: '',
    email: '',
    birthday: '',
  });
  const [editContact, setEditContact] = useState(null); //for the contact being edited
  const [errorMessage, setErrorMessage] = useState('');
  const [detailsVisible, setDetailsVisible] = useState(null); //to manage visibility of details

  useEffect(() => {
    const getContacts = async () => {
      const contacts = await fetchContacts();
      setContacts(contacts);
    };
    getContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      if (editContact) {
        // If we're editing a contact
        const updatedContact = await updateContact(editContact.id, newContact);
        setContacts(contacts.map(contact => (contact.id === updatedContact.id ? updatedContact : contact)));
        setEditContact(null); // Reset edit state
      } else {
        // If we're adding a new contact
        const addedContact = await addContact(newContact);
        setContacts([...contacts, addedContact]);
      }
      setNewContact({
        first_name: '',
        last_name: '',
        preferred_pronouns: '',
        email: '',
        birthday: '',
      });
      setDetailsVisible(null); //reset details visibility when adding/updating
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setNewContact({
      first_name: contact.first_name,
      last_name: contact.last_name,
      preferred_pronouns: contact.preferred_pronouns,
      email: contact.email,
      birthday: contact.birthday,
    });
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const toggleDetails = (id) => {
    setDetailsVisible(detailsVisible === id ? null : id); //toggle visibility
  };

  return (
    <div>
      <h1>Contact List</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={newContact.first_name}
          onChange={(e) => setNewContact({ ...newContact, first_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newContact.last_name}
          onChange={(e) => setNewContact({ ...newContact, last_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Preferred Pronouns"
          value={newContact.preferred_pronouns}
          onChange={(e) => setNewContact({ ...newContact, preferred_pronouns: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Birthday (MMDD)"
          value={newContact.birthday}
          onChange={(e) => setNewContact({ ...newContact, birthday: e.target.value })}
        />
        <button type="submit">{editContact ? 'Update Contact' : 'Add Contact'}</button>
      </form>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <span>{contact.first_name} {contact.last_name}</span>
            <button onClick={() => toggleDetails(contact.id)}>
              {detailsVisible === contact.id ? 'Hide Details' : 'Details'}
            </button>

            {detailsVisible === contact.id && (
              <div>
                <p>Preferred Pronouns: {contact.preferred_pronouns}</p>
                <p>Email: {contact.email}</p>
                <p>Birthday: {contact.birthday}</p>
                <button onClick={() => handleEdit(contact)}>Edit</button>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;



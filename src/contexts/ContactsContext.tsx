import React, { useState, createContext } from 'react';
import { Contact } from '../interfaces/Contact';

export const ContactsContext = createContext(null);
export const ContactsProvider = props => {
	const [contacts, setContacts] = useState<Array<Contact>>([]);
	const [filteredContacts, setFilteredContacts] = useState<Array<Contact>>(contacts);
	function addContact(contact: Contact) {
		setContacts([...contacts, contact]);
	}
	function editContact(contact: Contact, index: number) {
		let newContacts = [...contacts];
		newContacts[index] = contact;
		setContacts(newContacts);
	}
	function removeContact(contactIndex: number) {
		const newContacts = contacts.filter((_, index) => index !== contactIndex);
		setContacts(newContacts);
		setContacts(newContacts);
	}
	return (
		<ContactsContext.Provider
			value={{
				contacts,
				setContacts,
				addContact,
				editContact,
				removeContact,
				filteredContacts,
				setFilteredContacts,
			}}
		>
			{props.children}
		</ContactsContext.Provider>
	);
};

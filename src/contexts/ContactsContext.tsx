import React, { useState, createContext } from 'react';
import { Contact } from '../interfaces/Contact';

export const ContactsContext = createContext(null);
export const ContactsProvider = props => {
	const [contacts, setContacts] = useState<Array<Contact>>([]);
	return (
		<ContactsContext.Provider value={{ contacts, setContacts }}>
			{props.children}
		</ContactsContext.Provider>
	);
};

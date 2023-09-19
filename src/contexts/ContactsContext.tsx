import React, { useState, createContext, useEffect } from 'react';
import { Contact } from '../interfaces/Contact';

export const ContactsContext = createContext(null);

const useLocalStorage = (key: string, initialValue: Array<Contact>) => {
	const [contacts, setStoredContacts] = useState<any>(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});
	const setContacts = (value: any) => {
		try {
			setStoredContacts(value);

			if (typeof window !== 'undefined') {
				localStorage.setItem(key, JSON.stringify(value));
				console.log(JSON.stringify(value));
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};
	return [contacts, setContacts];
};

export const ContactsProvider = props => {
	const [contacts, setContacts] = useLocalStorage('contacts', []);
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
			}}
		>
			{props.children}
		</ContactsContext.Provider>
	);
};

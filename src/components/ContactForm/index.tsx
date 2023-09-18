import { Inter } from 'next/font/google';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { ContactsContext } from '@root/src/contexts/ContactsContext';
import { useContext, useEffect, useState } from 'react';
import { Contact } from '@root/src/interfaces/Contact';
import { ethers } from 'ethers';

// If loading a variable font, you don't need to specify the font weight
const boldInter = Inter({
	weight: '600',
	subsets: ['latin'],
	display: 'swap',
});
const regularInter = Inter({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
});
export default function ContactForm(props: {
	onClose: () => void;
	isEditing: boolean;
	selectedContactIndex?: number;
}): JSX.Element {
	const { onClose, selectedContactIndex } = props;
	const { contacts, setContacts } = useContext(ContactsContext);
	const [contact, setContact] = useState<{
		name: string;
		email?: string;
		wallet?: string;
	}>(
		props.isEditing
			? contacts[selectedContactIndex]
			: {
					name: '',
					email: '',
					walletAddress: '',
					walletENS: '',
			  }
	);

	useEffect(() => {
		if (props.isEditing) {
			console.log(selectedContactIndex);
			setContact({
				name: contacts[selectedContactIndex].name,
				email: contacts[selectedContactIndex].email,
				wallet: contacts[selectedContactIndex].walletENS
					? contacts[selectedContactIndex].walletENS
					: contacts[selectedContactIndex].walletAddress,
			});
		}
	}, [contacts, props.isEditing, selectedContactIndex]);

	const handleAddContact = async () => {
		if (ethers.isAddress(contact.wallet)) {
			setContacts([
				...contacts,
				{
					name: contact.name,
					email: contact.email,
					walletAddress: contact.wallet,
					walletENS: undefined,
				},
			]);
		} else {
			let provider;
			if (window.ethereum == null) {
				provider = ethers.getDefaultProvider('Ethereum');
			} else {
				provider = new ethers.BrowserProvider(window.ethereum);
				const address = await provider.resolveName(contact.wallet);
				if (address != null) {
					setContacts([
						...contacts,
						{
							name: contact.name,
							email: contact.email,
							walletAddress: address,
							walletENS: contact.wallet,
						},
					]);
				}
			}
		}
		onClose();
	};

	const handleEditContact = async () => {
		console.log('Editing contact');
		if (ethers.isAddress(contact.wallet)) {
			let newContacts = contacts;
			newContacts[selectedContactIndex] = {
				name: contact.name,
				email: contact.email,
				walletAddress: contact.wallet,
				walletENS: undefined,
			};
			setContacts(newContacts);
		} else {
			let provider;
			if (window.ethereum == null) {
				provider = ethers.getDefaultProvider('Ethereum');
			} else {
				provider = new ethers.BrowserProvider(window.ethereum);
				const address = await provider.resolveName(contact.wallet);
				if (address != null) {
					let newContacts = contacts;
					newContacts[selectedContactIndex] = {
						name: contact.name,
						email: contact.email,
						walletAddress: address,
						walletENS: contact.wallet,
					};
					setContacts(newContacts);
				} else {
					// HANDLE ENS ERROR
				}
			}
		}
		onClose();
	};
	return (
		<>
			<Box py="0.5rem">
				<Text fontSize={'0.875rem'} pb="0.5rem" className={boldInter.className}>
					Wallet address or ENS
				</Text>
				<Input
					variant="filled"
					placeholder="0x..."
					value={contact.wallet}
					onChange={e => {
						setContact({
							...contact,
							wallet: e.target.value,
						});
					}}
				/>
			</Box>
			<Box py="0.5rem">
				<Flex
					fontSize={'0.875rem'}
					pb="0.5rem"
					direction="row"
					justifyContent={'space-between'}
				>
					<Text className={boldInter.className}>Email</Text>
					<Text color={'gray'} className={regularInter.className}>
						Optional
					</Text>
				</Flex>
				<Input
					variant="filled"
					placeholder="Email"
					value={contact.email}
					onChange={e => {
						setContact({
							...contact,
							email: e.target.value,
						});
					}}
				/>
			</Box>
			<Box py="0.5rem">
				<Text fontSize={'0.875rem'} pb="0.5rem" className={boldInter.className}>
					Contact name
				</Text>
				<Input
					variant="filled"
					placeholder="John Doe"
					value={contact.name}
					onChange={e => {
						setContact({
							...contact,
							name: e.target.value,
						});
					}}
				/>
			</Box>
			<Box py="1rem">
				<Button
					width="100%"
					colorScheme="purple"
					className={boldInter.className}
					onClick={() => (props.isEditing ? handleEditContact() : handleAddContact())}
				>
					{props.isEditing ? 'Save Edits' : 'Add Contact'}
				</Button>
			</Box>
		</>
	);
}

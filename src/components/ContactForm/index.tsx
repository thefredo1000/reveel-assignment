import { Inter } from 'next/font/google';
import { Box, Button, Center, Flex, Input, Spinner, Text } from '@chakra-ui/react';
import { ContactsContext } from '@root/src/contexts/ContactsContext';
import { useContext, useEffect, useRef, useState } from 'react';
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
	const { contacts, addContact, editContact } = useContext(ContactsContext);
	const isFirstRender = useRef(true);
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
	const [isWalletValid, setIsWalletValid] = useState<boolean>(true);
	const [isENSValid, setIsENSValid] = useState<boolean>(true);
	const [isNameValid, setIsNameValid] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (props.isEditing) {
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
		setLoading(true);
		if (contact.name === '' || contact.name === undefined) {
			setIsNameValid(false);
			setLoading(false);
			return;
		} else {
			setIsNameValid(true);
		}
		if (contact.wallet === '' || contact.wallet === undefined) {
			setIsWalletValid(false);
			setLoading(false);
			return;
		} else {
			setIsWalletValid(true);
		}

		if (ethers.isAddress(contact.wallet)) {
			setIsWalletValid(true);
			addContact({
				name: contact.name,
				email: contact.email,
				walletAddress: contact.wallet,
				walletENS: undefined,
			});
		} else {
			let provider;
			if (window.ethereum == null) {
				provider = ethers.getDefaultProvider('https://eth.rpc.blxrbdn.com');
				const address = await provider.resolveName(contact.wallet);
				if (address != null) {
					setIsENSValid(true);
					addContact({
						name: contact.name,
						email: contact.email,
						walletAddress: address,
						walletENS: contact.wallet,
					});
				} else {
					// HANDLE ENS ERROR
					setIsENSValid(false);
					setLoading(false);
					return;
				}
			} else {
				provider = new ethers.BrowserProvider(window.ethereum);
				const address = await provider.resolveName(contact.wallet);
				if (address != null) {
					setIsENSValid(true);
					addContact({
						name: contact.name,
						email: contact.email,
						walletAddress: address,
						walletENS: contact.wallet,
					});
				} else {
					setIsENSValid(false);
					setLoading(false);
					return;
				}
			}
		}
		onClose();
	};

	const handleEditContact = async () => {
		setLoading(true);
		if (contact.name === '' || contact.name === undefined) {
			setIsNameValid(false);
			setLoading(false);
			return;
		} else {
			setIsNameValid(true);
		}
		if (contact.wallet === '' || contact.wallet === undefined) {
			setIsWalletValid(false);
			setLoading(false);
			return;
		} else {
			setIsWalletValid(true);
		}

		if (ethers.isAddress(contact.wallet)) {
			setIsWalletValid(true);
			editContact(
				{
					name: contact.name,
					email: contact.email,
					walletAddress: contact.wallet,
					walletENS: undefined,
				},
				selectedContactIndex
			);
		} else {
			let provider;
			if (window.ethereum == null) {
				provider = ethers.getDefaultProvider('https://eth.rpc.blxrbdn.com');
				const address = await provider.resolveName(contact.wallet);
				if (address != null) {
					setIsENSValid(true);
					editContact(
						{
							name: contact.name,
							email: contact.email,
							walletAddress: address,
							walletENS: contact.wallet,
						},
						selectedContactIndex
					);
				} else {
					// HANDLE ENS ERROR
					setIsENSValid(false);
					setLoading(false);
					return;
				}
			} else {
				provider = new ethers.BrowserProvider(window.ethereum);
				const address = await provider.resolveName(contact.wallet);
				if (address != null) {
					setIsENSValid(true);
					editContact(
						{
							name: contact.name,
							email: contact.email,
							walletAddress: address,
							walletENS: contact.wallet,
						},
						selectedContactIndex
					);
				} else {
					setIsENSValid(false);
					setLoading(false);
					return;
				}
			}
		}
		onClose();
	};
	return loading ? (
		<Center height="20rem">
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="purple.500"
				size="xl"
			/>
		</Center>
	) : (
		<div style={{ minHeight: '20rem' }}>
			<Box py="0.5rem">
				<Text fontSize={'0.875rem'} pb="0.5rem" className={boldInter.className}>
					Wallet address or ENS
				</Text>
				<Input
					variant="filled"
					placeholder="0x..."
					value={contact.wallet}
					isInvalid={!isWalletValid || !isENSValid}
					onChange={e => {
						setContact({
							...contact,
							wallet: e.target.value,
						});
					}}
				/>
				{!isWalletValid ? (
					<Text color="red" fontSize="sm" pt="0.5rem">
						Invalid wallet address
					</Text>
				) : !isENSValid ? (
					<Text color="red" fontSize="sm" pt="0.5rem">
						Invalid ENS
					</Text>
				) : null}
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
					isInvalid={!isNameValid}
					onChange={e => {
						setContact({
							...contact,
							name: e.target.value,
						});
					}}
				/>
				{!isNameValid ? (
					<Text color="red" fontSize="sm" pt="0.5rem">
						Invalid name
					</Text>
				) : null}
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
		</div>
	);
}

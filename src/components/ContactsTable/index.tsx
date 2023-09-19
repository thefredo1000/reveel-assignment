import { useContext, useState } from 'react';
import { Inter } from 'next/font/google';
import {
	Box,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tr,
	VStack,
	useMediaQuery,
	createIcon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
	Tooltip,
} from '@chakra-ui/react';

import { Contact } from '@interfaces/Contact';
import truncateEthAddress from 'truncate-eth-address';
import ContactRemove from '../ContactRemove';
import { ContactsContext } from '@root/src/contexts/ContactsContext';
import SearchContacts from '../SearchContacts';

const ThreeDotsSvgrepoCom = createIcon({
	displayName: 'ThreeDotsSvgrepoCom',
	viewBox: '0 0 32.055 32.055',
	d: 'M3.968 12.061A3.965 3.965 0 000 16.027a3.965 3.965 0 003.968 3.967 3.966 3.966 0 100-7.933zm12.265 0a3.967 3.967 0 00-3.968 3.965c0 2.192 1.778 3.967 3.968 3.967s3.97-1.772 3.97-3.967a3.97 3.97 0 00-3.97-3.965zm11.857 0a3.967 3.967 0 10-.005 7.933 3.967 3.967 0 00.005-7.933z',
});

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

const TableRow = (props: {
	contact: Contact;
	handleEditContactClick: () => void;
	handleEraseContactClick: () => void;
	setSelectedContactIndex: React.Dispatch<React.SetStateAction<number>>;
	index: number;
	setSelectedRemoveIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const {
		contact,
		handleEditContactClick,
		handleEraseContactClick,
		setSelectedContactIndex,
		index,
		setSelectedRemoveIndex,
	} = props;
	const {
		isOpen: isTooltipOpen,
		onOpen: onTooltipOpen,
		onClose: onTooltipClose,
	} = useDisclosure();

	return (
		<Tr key={contact.walletAddress}>
			<Td p="0" py="0.5rem">
				<VStack alignItems="flex-start" spacing="2px">
					<Text fontSize="14px" className={boldInter.className} m={0}>
						{contact.name}
					</Text>
					<Text fontSize="12px" className={regularInter.className} color="gray.500">
						{truncateEthAddress(contact.walletAddress)}
					</Text>
				</VStack>
			</Td>
			<Td p="0">
				<Flex justifyContent="flex-end">
					<Menu isLazy placement="bottom-end">
						<MenuButton>
							<Tooltip
								className={regularInter.className}
								label="Address Copied"
								placement="top-end"
								closeDelay={500}
								isOpen={isTooltipOpen}
								hasArrow
								arrowSize={10}
								p="0.5rem"
							>
								<Box>
									<ThreeDotsSvgrepoCom color="grey.200" />
								</Box>
							</Tooltip>
						</MenuButton>
						<MenuList className={boldInter.className} fontSize="0.875rem">
							<MenuItem
								onClick={() => {
									navigator.clipboard.writeText(contact.walletAddress);
									onTooltipOpen();
									setTimeout(() => {
										onTooltipClose();
									}, 2000);
								}}
							>
								Copy Address
							</MenuItem>
							<MenuItem
								onClick={() => {
									setSelectedContactIndex(index);
									handleEditContactClick();
								}}
							>
								Edit Contact
							</MenuItem>
							<MenuItem
								onClick={() => {
									setSelectedRemoveIndex(index);
									handleEraseContactClick();
								}}
								color="red"
							>
								Remove Contact
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Td>
		</Tr>
	);
};

export default function ContactsTable(props: {
	onOpen: () => void;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedContactIndex: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
	const { onOpen: onModalOpen, setIsEditing, setSelectedContactIndex } = props;
	const [isMobile] = useMediaQuery('(max-width: 610px)');
	const { contacts } = useContext(ContactsContext);
	const [selectedRemoveIndex, setSelectedRemoveIndex] = useState<number>();
	const [searchInput, setSearchInput] = useState<string>('');

	const {
		isOpen: isRemoveOpen,
		onOpen: onRemoveOpen,
		onClose: onRemoveClose,
	} = useDisclosure();

	const handleEditContactClick = () => {
		onModalOpen();
		setIsEditing(true);
	};

	const handleEraseContactClick = () => {
		console.log('Erase contact');
		onRemoveOpen();
	};

	return (
		<>
			<SearchContacts setSearchInput={setSearchInput} />
			<Box minH={'40vh'} overflowY="auto">
				<Box py="1.5rem" className={boldInter.className}>
					<Text>All Contacts ({contacts.length})</Text>
				</Box>
				<TableContainer overflowY="scroll" maxHeight={isMobile ? 'auto' : '20rem'}>
					<Table variant="unstyled">
						<Tbody>
							{contacts.map((contact, index) => {
								const contactProperties = [
									contact.name.toLowerCase(),
									contact.walletAddress.toLowerCase(),
									contact.email.toLowerCase(),
									contact.walletENS?.toLowerCase(),
								];
								const searchInputLower = searchInput.toLowerCase();

								if (!contactProperties.some(prop => prop.includes(searchInputLower))) {
									return null;
								}
								return (
									<TableRow
										contact={contact}
										handleEditContactClick={handleEditContactClick}
										handleEraseContactClick={handleEraseContactClick}
										key={index}
										setSelectedContactIndex={setSelectedContactIndex}
										index={index}
										setSelectedRemoveIndex={setSelectedRemoveIndex}
									/>
								);
							})}
						</Tbody>
					</Table>
					<ContactRemove
						isOpen={isRemoveOpen}
						onClose={onRemoveClose}
						selectedContactIndex={selectedRemoveIndex}
					/>
				</TableContainer>
			</Box>
		</>
	);
}

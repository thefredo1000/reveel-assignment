import { Inter } from 'next/font/google';
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import ContactForm from '../ContactForm';

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
export default function ContactModal(props: {
	onClose: () => void;
	isOpen: boolean;
	isEditing: boolean;
}): JSX.Element {
	const { onClose, isOpen, isEditing } = props;
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader className={boldInter.className}>
					{isEditing ? 'Edit Contact' : 'New Contact'}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<ContactForm onClose={onClose} isEditing={isEditing} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

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
export default function ContactDrawer(props: {
	onClose: () => void;
	isOpen: boolean;
	isEditing: boolean;
	selectedContactIndex?: number;
}): JSX.Element {
	const { onClose, isOpen, isEditing, selectedContactIndex } = props;
	return (
		<Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader className={boldInter.className}>
					{isEditing ? 'Edit Contact' : 'New Contact'}
				</DrawerHeader>
				<DrawerBody>
					<ContactForm
						onClose={onClose}
						isEditing={isEditing}
						selectedContactIndex={selectedContactIndex}
					/>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

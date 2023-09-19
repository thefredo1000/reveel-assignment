import { Inter } from 'next/font/google';
import {
	Box,
	Button,
	Center,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	IconButton,
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
	useMediaQuery,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { ContactsContext } from '@root/src/contexts/ContactsContext';
import { useContext } from 'react';

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
export default function ContactRemove(props: {
	onClose: () => void;
	isOpen: boolean;
	selectedContactIndex: number;
}): JSX.Element {
	const { onClose, isOpen, selectedContactIndex } = props;
	const { removeContact } = useContext(ContactsContext);
	const [isMobile] = useMediaQuery('(max-width: 610px)');

	const handleCancel = () => {
		onClose();
	};

	const handleOk = () => {
		removeContact(selectedContactIndex);
		onClose();
	};
	return isMobile ? (
		<Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader pb={0}>
					<Flex direction={'row-reverse'}>
						<IconButton
							onClick={handleCancel}
							aria-label="Close"
							variant={'ghost'}
							icon={<CloseIcon />}
						/>
					</Flex>
				</DrawerHeader>
				<DrawerBody>
					<Box pt="2rem" pb="1rem" alignContent={'center'}>
						<Center textAlign={'center'} pb={'2rem'} px={'1rem'} width={'100%'}>
							<Text fontSize="1.25rem" className={boldInter.className}>
								Are you sure you want to remove this contact?
							</Text>
						</Center>
						<Button
							width="100%"
							colorScheme="red"
							variant={'outline'}
							className={boldInter.className}
							onClick={handleOk}
							py={'1rem'}
						>
							Yes, Remove Contact
						</Button>
					</Box>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	) : (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				<ModalBody>
					<Flex py="1rem" flexDirection={'column'} alignItems={'center'}>
						<Center textAlign={'center'} py={'1rem'} px={'1rem'} width={'18rem'}>
							<Text fontSize="1.25rem" className={boldInter.className}>
								Are you sure you want to remove this contact?
							</Text>
						</Center>
						<Button
							width="100%"
							colorScheme="red"
							variant={'outline'}
							className={boldInter.className}
							onClick={handleOk}
							py={'1rem'}
						>
							Yes, Remove Contact
						</Button>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

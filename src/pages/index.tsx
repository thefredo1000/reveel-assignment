import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { NextSeo } from 'next-seo';

// --- Chakra-UI ---
import {
	Box,
	Button,
	Center,
	Flex,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';

// --- Motion Components ---
import MotionContainer from '@components/Motion/MotionContainer';

// -- Animations --
import { slide } from '@animations';
import Header from '../components/Header';
import SearchContacts from '../components/SearchContacts';
import ContactsTable from '../components/ContactsTable';
import ContactDrawer from '../components/ContactDrawer';
import Footer from '../components/Footer';
import { useState, createContext, use, useEffect } from 'react';
import MobileContainer from '../components/MobileContainer';
import ContactModal from '../components/ContactModal ';
import { ContactsProvider } from '../contexts/ContactsContext';
import { ethers } from 'ethers';

function ContactFormWrapper(props: {
	isMobile: boolean;
	onClose: () => void;
	isOpen: boolean;
	isEditing: boolean;
	selectedContactIndex?: number;
}) {
	const { isMobile, onClose, isOpen, isEditing, selectedContactIndex } = props;
	return isMobile ? (
		<ContactDrawer
			isOpen={isOpen}
			onClose={onClose}
			isEditing={isEditing}
			selectedContactIndex={selectedContactIndex}
		/>
	) : (
		<ContactModal
			isOpen={isOpen}
			onClose={onClose}
			isEditing={isEditing}
			selectedContactIndex={selectedContactIndex}
		/>
	);
}

export default function HomePage() {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [selectedContactIndex, setSelectedContactIndex] = useState<number>();
	const [isMobile] = useMediaQuery('(max-width: 610px)');
	return (
		<>
			<NextSeo
				title="Search"
				description="🦸‍♀️ A super template for Next.js with a pack of incredible tools"
			/>

			<MotionContainer
				w="full"
				h="100vh"
				initial="initial"
				animate="animate"
				exit="exit"
				variants={slide}
			>
				<ContactsProvider>
					<MobileContainer>
						<Header />
						<Box py="1rem" px="0.5rem">
							<ContactsTable
								onOpen={onOpen}
								setIsEditing={setIsEditing}
								setSelectedContactIndex={setSelectedContactIndex}
							/>
						</Box>
						<Footer onOpen={onOpen} setIsEditing={setIsEditing} />
						<ContactFormWrapper
							isOpen={isOpen}
							onClose={onClose}
							isEditing={isEditing}
							selectedContactIndex={selectedContactIndex}
							isMobile={isMobile}
						/>
					</MobileContainer>
				</ContactsProvider>
			</MotionContainer>
		</>
	);
}

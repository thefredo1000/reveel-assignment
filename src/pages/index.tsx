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

// --- Components ---
const SearchComponent = dynamic(() => import('@root/src/components/SearchGH'));

// --- Motion Components ---
import MotionContainer from '@components/Motion/MotionContainer';

// -- Animations --
import { slide } from '@animations';
import Header from '../components/Header';
import SearchContacts from '../components/SearchContacts';
import ContactsTable from '../components/ContactsTable';
import ContactDrawer from '../components/ContactDrawer';
import Footer from '../components/Footer';
import { useState } from 'react';
import MobileContainer from '../components/MobileContainer';
import ContactModal from '../components/ContactModal ';

export default function HomePage() {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isEditing, setIsEditing] = useState<boolean>(false);
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
				<MobileContainer>
					<Header />
					<Box py="1rem" px="0.5rem">
						<SearchContacts />
						<ContactsTable />
					</Box>
					<Footer onOpen={onOpen} />
					{isMobile ? (
						<ContactDrawer isOpen={isOpen} onClose={onClose} isEditing={isEditing} />
					) : (
						<ContactModal isOpen={isOpen} onClose={onClose} isEditing={isEditing} />
					)}
				</MobileContainer>
			</MotionContainer>
		</>
	);
}

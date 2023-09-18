import { useState } from 'react';
import { Inter } from 'next/font/google';
import {
	Box,
	Flex,
	Icon,
	Stack,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	VStack,
	useMediaQuery,
	createIcon,
	Button,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';

import { Contact } from '@interfaces/Contact';
import truncateEthAddress from 'truncate-eth-address';

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
export default function ContactsTable(): JSX.Element {
	const [isMobile] = useMediaQuery('(max-width: 610px)');
	const [contacts, setContacts] = useState<Array<Contact>>([
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Rodrigo Casale',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
		{
			name: 'Cobo',
			walletAddress: '0x29FFeBCa51ecD940cb37EF91ff83cD739553b93e',
		},
	]);
	return (
		<Box minH={'40vh'} overflowY="auto">
			<Box py="1.5rem" className={boldInter.className}>
				<Text>All Contacts ({contacts.length})</Text>
			</Box>
			<TableContainer overflowY="scroll" maxHeight={isMobile ? 'auto' : '20rem'}>
				<Table variant="unstyled">
					<Tbody>
						{contacts.map(contact => (
							<Tr key={contact.walletAddress}>
								<Td p="0" py="0.5rem">
									<VStack alignItems="flex-start" spacing="2px">
										<Text fontSize="14px" className={boldInter.className} m={0}>
											{contact.name}
										</Text>
										<Text
											fontSize="12px"
											className={regularInter.className}
											color="gray.500"
										>
											{truncateEthAddress(contact.walletAddress)}
										</Text>
									</VStack>
								</Td>
								<Td p="0">
									<Flex justifyContent="flex-end">
										<Menu isLazy placement="bottom-end">
											<MenuButton>
												<IconButton
													isRound={true}
													variant="ghost"
													colorScheme="gray"
													aria-label="More"
													icon={<ThreeDotsSvgrepoCom color="grey.200" />}
												/>
											</MenuButton>
											<MenuList className={boldInter.className} fontSize="0.875rem">
												<MenuItem
													onClick={() => {
														navigator.clipboard.writeText(contact.walletAddress);
													}}
												>
													Copy Address
												</MenuItem>
												<MenuItem>Edit Contact</MenuItem>
												<MenuItem color="red">Remove Contact</MenuItem>
											</MenuList>
										</Menu>
									</Flex>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
}

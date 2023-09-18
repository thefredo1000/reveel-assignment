import { Inter } from 'next/font/google';
import { Center, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
	weight: '600',
	subsets: ['latin'],
	display: 'swap',
});

export default function SearchContacts(): JSX.Element {
	return (
		<InputGroup>
			<Input
				size="lg"
				variant="filled"
				placeholder="Search by name or paste address / ENS"
				fontSize="0.875rem"
			/>
			<InputRightElement pt="8px">
				<SearchIcon color="gray.500" />
			</InputRightElement>
		</InputGroup>
	);
}

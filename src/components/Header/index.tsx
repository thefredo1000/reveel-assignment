import { Inter } from 'next/font/google';
import { Flex, Text } from '@chakra-ui/react';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
	weight: '600',
	subsets: ['latin'],
	display: 'swap',
});

export default function Header(): JSX.Element {
	return (
		<Flex
			as="header"
			w="100%"
			h={{ md: '4rem', base: '4rem' }}
			px={{ md: '1.5rem', base: '1rem' }}
			wrap="wrap"
			align="center"
			className={inter.className}
			borderBottom={{ base: '1px solid #ccc' }}
		>
			<Text fontSize="1.25rem">Contacts</Text>
		</Flex>
	);
}

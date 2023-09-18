import { Inter } from 'next/font/google';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

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
}): JSX.Element {
	const { onClose } = props;
	return (
		<>
			<Box py="0.5rem">
				<Text fontSize={'0.875rem'} pb="0.5rem" className={boldInter.className}>
					Wallet address or ENS
				</Text>
				<Input variant="filled" placeholder="0x..." />
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
				<Input variant="filled" placeholder="Email" />
			</Box>
			<Box py="0.5rem">
				<Text fontSize={'0.875rem'} pb="0.5rem" className={boldInter.className}>
					Contact name
				</Text>
				<Input variant="filled" placeholder="John Doe" />
			</Box>
			<Box py="1rem">
				<Button
					width="100%"
					colorScheme="purple"
					className={boldInter.className}
					onClick={onClose}
				>
					{props.isEditing ? 'Save Edits' : 'Add Contact'}
				</Button>
			</Box>
		</>
	);
}

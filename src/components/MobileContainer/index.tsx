import { Box, Center, useMediaQuery } from '@chakra-ui/react';

export default function MobileContainer({ children }): JSX.Element {
	const [isMobile] = useMediaQuery('(max-width: 610px)');

	return isMobile ? (
		children
	) : (
		<Center py="4rem">
			<Box width="26rem" border="1px" borderColor="gray.200" px="1rem">
				{children}
			</Box>
		</Center>
	);
}

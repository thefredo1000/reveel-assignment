import { Box, Center, useMediaQuery } from '@chakra-ui/react';
import { ContactsContext } from '@root/src/contexts/ContactsContext';
import { useContext, useEffect, useState } from 'react';

export default function MobileContainer({ children }): JSX.Element {
	const [isMobile] = useMediaQuery('(max-width: 610px)');
	const { contacts } = useContext(ContactsContext);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		if (contacts !== undefined) {
			setIsLoaded(true);
		}
	}, [contacts]);

	if (!isLoaded) {
		return null;
	}

	return isMobile ? (
		children
	) : (
		<Center py="4rem">
			<Box
				borderRadius="0.5rem"
				width="26rem"
				border="1px"
				borderColor="gray.200"
				px="1rem"
				boxShadow="lg"
			>
				{children}
			</Box>
		</Center>
	);
}

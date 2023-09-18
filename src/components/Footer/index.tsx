import { Button, Box, useMediaQuery } from '@chakra-ui/react';
import { Inter } from 'next/font/google';

const boldInter = Inter({
	weight: '600',
	subsets: ['latin'],
	display: 'swap',
});
export default function ContactDrawer(props: {
	onOpen: () => void;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
	const { onOpen, setIsEditing } = props;
	const [isMobile] = useMediaQuery('(max-width: 610px)');
	const handleClick = () => {
		onOpen();
		setIsEditing(false);
	};
	return (
		<Box
			left={isMobile ? '0px' : null}
			right={isMobile ? '0px' : null}
			bottom={isMobile ? '0px' : null}
			as={isMobile ? 'footer' : null}
			position={isMobile ? 'fixed' : 'relative'}
			backgroundColor={'white'}
			height={isMobile ? '5.5rem' : 'auto'}
			className={boldInter.className}
		>
			<Box
				left={isMobile ? '1.5rem' : null}
				right={isMobile ? '1.5rem' : null}
				bottom={isMobile ? '1.5rem' : null}
				position={isMobile ? 'fixed' : 'relative'}
				pb={isMobile ? null : '1rem'}
			>
				<Button width="100%" onClick={handleClick} variant="outline" colorScheme="purple">
					Add New Contact
				</Button>
			</Box>
		</Box>
	);
}

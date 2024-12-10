import { Typography } from "@material-tailwind/react";

function Footer() {

	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex w-full flex-row items-center justify-center border-t border-blue-gray-50 py-2 text-center">
			<Typography color="blue-gray" className="font-normal">
				&copy; {currentYear} Step8Up
			</Typography>
		</footer>
	);
}

export default Footer;
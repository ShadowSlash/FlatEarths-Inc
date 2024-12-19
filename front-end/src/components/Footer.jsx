import { Typography } from "@material-tailwind/react";

function Footer() {

	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex w-full flex-row items-center justify-center  text-center  ">
			<Typography color="white" className="font-normal">
				&copy; {currentYear} FlatEarths inc
			</Typography>
		</footer>
	);
}

export default Footer;
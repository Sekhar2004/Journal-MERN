import React, { useState } from "react";
import { Facebook, GitHub, Instagram, Linkedin } from "react-feather";

import "./footer.css";
import Button from "../Button/Button";
import emailjs from "emailjs-com";

const Footer = () => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		message: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(user);
		emailjs
			.sendForm(
				process.env.REACT_APP_SERVICE,
				process.env.REACT_APP_TEMPLATE,
				e.target,
				process.env.REACT_APP_USER
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		setUser({
			name: "",
			email: "",
			message: "",
		});
	};
	const handleReset = () => {
		setUser({
			name: "",
			email: "",
			message: "",
		});
	};
	return (
		<footer
			className="footer"
			style={{
				backgroundImage: ``,
			}}
		>
			
			<div className="footer-bottom">
				
				<div className="footer-bottom-socials">
					
					<a href="https://github.com/Sekhar2004">
						<GitHub />
					</a>
					<a href="https://linkedin.com/in/sekhar-reddy-jeeru">
						<Linkedin />
					</a>
					<a href="https://instagram.com/">
						<Instagram />
					</a>
					<a href="https://fb.com/">
						<Facebook />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

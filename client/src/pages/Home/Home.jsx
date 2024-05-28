import React, { useEffect } from "react";
import "./home.css";

import { Gift, Lock, Smile } from "react-feather";
import Accordian from "../../components/Accordian/Accordian";

const Home = () => {
	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	const homeAboutCards = [
		{
			icon: <Smile />,
			title: "Simple and Intuitive",
			description:
				"Amigo features a minimalistic and clean design, letting you focus on what you feel and want to write.",
			layout: [33, 50, 100],
		},
		{
			icon: <Lock />,
			title: "Private and Secure",
			description:
				"Your data always remains secure. The journal is encrypted with a password and stores in cloud.",
			layout: [33, 50, 100],
		},
		{
			icon: <Gift />,
			title: "Completely free and open source",
			description: (
				<>
					The app is free and open source and its code can always be
					found on
					<a href="https://github.com/Sekhar2004">
						{" "}
						GitHub
					</a>
				</>
			),
			layout: [33, 100, 100],
		},
	];

	return (
		<section className="home">
			<div className="home-hero-ss">
				<div className="home-hero">
					<div className="home-hero-image">
						<img src="https://www.shutterstock.com/shutterstock/photos/1845432868/display_1500/stock-vector-notebook-line-icon-high-quality-outline-symbol-for-web-design-or-mobile-app-thin-line-sign-for-1845432868.jpg" alt="S' Diary" />
					</div>
					<div className="home-hero-title">
						<span>Journal</span>
					</div>
					<div className="home-hero-subtitle">
						<span>A safe place for all your thoughts</span>
					</div>
				</div>
				<div className="home-ss">
					<img src="https://cdn.pixabay.com/photo/2018/05/26/08/17/writing-3430893_1280.jpg" alt="Home Page" />
				</div>
			</div>
			<div className="home-about">
				<div className="row">
					{homeAboutCards.map((card, index) => (
						<div
							className={`col-lg-${card.layout[0]} col-md-${card.layout[1]} col-sm-${card.layout[2]}`}
							key={index}
						>
							<div className="home-about-card">
								<div className="home-about-card-icon">
									{card.icon}
								</div>
								<div className="home-about-card-content">
									<span className="home-about-card-content__title">
										{card.title}
									</span>
									<span className="home-about-card-content__description">
										{card.description}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="home-faq">
				<h1>FAQs</h1>
				<Accordian
					summary="How to log into Journal?"
					details="To use Journal, visit the home page, use the navigation menu to navigate to the dashboard. Register if you are a new user."
				/>
				<Accordian
					summary="How to write a diary?"
					details="To write a new diary, click on the edit button in the dashboard. Fill in the details and click on save diary to save the contents to your profile."
				/>
			</div>
		</section>
	);
};

export default Home;

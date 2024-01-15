// import { Link } from "react-router-dom";
import { useState } from "react";
import PageNav from "../components/PageNav";
import Search from "../components/Search";
import Display from "../components/Display";
import Footer from "../components/Footer";

const subjects = [
	{
		id: "1",
		name: "Computer Networks",
		branch: "Computer Science",
	},
	{
		id: "2",
		name: "Operating Systems",
		branch: "Computer Science",
	},
	{
		id: "3",
		name: "Computer Networks",
		branch: "EC",
	},
	{
		id: "4",
		name: "Operating Systems",
		branch: "EC",
	},
];

export default function Homepage() {
	const [subject, setSubject] = useState("");
	const [data, setData] = useState(subjects);

	return (
		<main>
			<PageNav />
			<section>
				<div>
					<h1>Knowledge Nest</h1>
					<h2>
						Discover Wisdom, Accessible Notes. Your Gateway to Knowledge Sharing
					</h2>
				</div>
				<Search subject={subject} setSubject={setSubject} />
				<Display data={data} selectedSubject={subject} />
			</section>
			<Footer />
		</main>
	);
}

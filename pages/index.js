import Image from "next/image";
import { Inter, Newsreader } from "next/font/google";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import CommentModal from "@/components/CommentModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ newsResults, randomUsersResults }) {
	return (
		<div>
			<Head>
				<title>Twitter Clone</title>
			</Head>
			<main className="flex min-h-screen   mx-auto ">
				{/* Sidebar */}
				<Sidebar />
				{/* Feed */}
				<Feed />
				{/* Widgets */}
				<Widgets
					newsResults={newsResults.articles}
					randomUsersResults={randomUsersResults.results}
				/>
				{/* Model */}
				<CommentModal />
			</main>
		</div>
	);
}

//  https://saurav.tech/NewsAPI/

//https://saurav.tech/NewsAPI/top-headlines/category/general/in.json

export async function getServerSideProps() {
	const newsResults = await fetch(
		"https://saurav.tech/NewsAPI/top-headlines/category/general/in.json"
	).then((res) => res.json());

	// Who to follow section

	let randomUsersResults = [];

	try {
		const res = await fetch(
			"https://randomuser.me/api/?nat=in&results=30&inc=name,login,picture"
		);

		randomUsersResults = await res.json();
	} catch (e) {
		randomUsersResults = [];
	}

	// const randomUsersResults = await fetch(
	//   "https://randomuser.me/api/?results=30&inc=name,login,picture"
	// ).then((res) => res.json());

	return {
		props: {
			newsResults,
			randomUsersResults,
		},
	};
}

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import News from "./News";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Widgets({ newsResults, randomUsersResults }) {
	const [articleNum, setArticleNum] = useState(2);
	const [showUserNum, setShowUserNum] = useState(3);
	return (
		<div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
			<div className=" w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
				<div className="flex items-center p-3 rounded-full relative ">
					<MagnifyingGlassIcon className=" h-5 z-50 text-gray-500 " />
					<input
						type="text"
						className=" absolute inset-0 rounded-full border-gray-500 text-gray-700 focus:shadow-lg outline-none bg-gray-100 focus:bg-white focus:outline-none pl-11"
						placeholder="Search Twitter"
					/>
				</div>
			</div>
			<div className=" text-gray-700 bg-gray-100 space-y-3 rounded-xl pt-2 w-[90%] xl:w-[75%]">
				<h4 className=" font-bold text-xl px-4"> What's happening</h4>
				<AnimatePresence>
					{newsResults.slice(0, articleNum).map((article) => (
						<motion.div
							key={article.title}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: 1,
							}}
						>
							<News key={article.title} article={article} />
						</motion.div>
					))}
				</AnimatePresence>
				<button
					onClick={() => {
						setArticleNum((articleNum + 2) % newsResults.length);
					}}
					className="  text-blue-300 pl-4 pb-3 hover:text-blue-500"
				>
					Show more
				</button>
			</div>
			<div className=" text-gray-700 bg-gray-100 space-y-3 rounded-xl pt-2 w-[90%] xl:w-[75%] sticky top-16">
				<h4 className=" font-bold text-xl px-4">Who to follow</h4>
				<AnimatePresence>
					{randomUsersResults
						.slice(0, showUserNum)
						.map((randomUser) => (
							<motion.div
								key={randomUser.login.username}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{
									duration: 1,
								}}
							>
								<div
									className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
									key={randomUser.login.username}
								>
									<img
										src={randomUser.picture.thumbnail}
										width={40}
										className=" rounded-full"
										alt="user profile pic"
									/>
									<div className="truncate ml-4 leading-5">
										<h4 className=" font-bold hover:underline text-[14px] truncate">
											@{randomUser.login.username}
										</h4>
										<h5 className=" text-gray-500">
											{randomUser.name.first +
												" " +
												randomUser.name.last}
										</h5>
									</div>
									<button className=" ml-auto hover:opacity-90  bg-sky-500 text-white rounded-full text-sm px-3.5 py-1.5 font-bold mr-3">
										Follow
									</button>
								</div>
							</motion.div>
						))}
				</AnimatePresence>
				<button
					onClick={() =>
						setShowUserNum(
							(showUserNum + 3) % randomUsersResults.length
						)
					}
					className="  text-blue-300 pl-4 pb-3 hover:text-blue-500"
				>
					Show more
				</button>
			</div>
		</div>
	);
}
//Yuuri himeno miho ichiki

/*


Login
Blog Reviews 
Sign up
Subscription
Create Plan
Explore

*/

/*

Nextjs
Tailwind
Node express
Mongo DB

Django

*/

import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
export default function signin({ providers }) {
	return (
		<div className="flex h-full w-full mt-32 justify-center gap-4">
			<img
				src={
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1r9ccbIGIpHtsNXLKLWKQKnxIzsCLUCPHQ&usqp=CAU"
				}
				height={900}
				width={900}
				className="  rotate-12 mr-10 mt-10 hidden md:inline-flex object-cover md:w-44 md:h-80"
			/>
			<div className="  ">
				{Object.values(providers).map((provider) => (
					<div
						className="h-full flex flex-col items-center mt-8"
						key={provider.id}
					>
						<Image
							src={
								"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBY-TEKQRJRA7Xr4OJXa0GL4y0v1fNnzCKvZ4YnhjEbq7-3dqVuTK0HFaN4V-pCoLJhls&usqp=CAU"
							}
							height={200}
							width={200}
							className=" "
							alt="Twitter logo"
						/>
						<p className=" text-center text-sm italic my-10 text-red-700">
							Made for learning Next.JS 13
						</p>
						<button
							className=" bg-red-400 rounded-lg hover:bg-red-500 p-4 text-white"
							onClick={() =>
								signIn(provider.id, { callbackUrl: "/" })
							}
						>
							Sign in with {provider.name}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}

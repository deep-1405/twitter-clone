import Image from "next/image";
import Link from "next/link";
export default function News({ article }) {
	return (
		<Link href={article.url} target="_blank">
			<div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-500  ease-out">
				<div className=" space-y-0.5  ">
					<h6 className=" text-ellipsis text-sm font-bold">
						{article.title}
					</h6>
					<p className=" text-xs font-medium text-gray-500">
						{article.source.name}
					</p>
				</div>
				<img
					src={article.urlToImage}
					className="rounded-xl"
					alt="news image"
					width={70}
					height={70}
				/>
			</div>
		</Link>
	);
}

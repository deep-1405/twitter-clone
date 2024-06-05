import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShareIcon } from "@heroicons/react/24/outline";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { ref } from "firebase/storage";
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	setDoc,
} from "firebase/firestore";
import { useRecoilState } from "recoil";
import { Confirm } from "notiflix";
import Moment from "react-moment";
import { db, storage } from "@/firebase";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteObject } from "firebase/storage";
import Notiflix from "notiflix";
import { modalState } from "@/atom/modalAtom";
export default function Post({ post }) {
	Notiflix.Confirm.init({
		titleColor: "rgb(59 130 246)",
		okButtonBackground: "rgb(59 130 246)",
	});

	const { data: session } = useSession();
	const [likes, setLikes] = useState([]);
	const [hasLiked, setHasLiked] = useState(false);
	const [open, setOpen] = useRecoilState(modalState);
	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "posts", post.id, "likes"),
			(snapshot) => setLikes(snapshot.docs)
		);
	}, [db]);

	async function deletePost() {
		Confirm.show(
			"Delete Post",
			"Are you sure?",
			"Yes",
			"No",
			() => {
				deleteDoc(doc(db, "posts", post.id));
				deleteObject(ref(storage, `posts/${post.id}/image`));
			},
			() => {
				return;
			}
		);
	}

	useEffect(() => {
		setHasLiked(
			likes.findIndex((like) => like.id === session?.user?.uid) !== -1
		);
	}, [likes]);

	async function likedPost() {
		if (!session) {
			signIn();
			return;
		}
		if (hasLiked) {
			await deleteDoc(
				doc(db, "posts", post.id, "likes", session?.user.uid)
			);
		} else {
			await setDoc(
				doc(db, "posts", post.id, "likes", session?.user.uid),
				{
					username: session?.user.username,
				}
			);
		}
	}
	return (
		<div className="flex items-start p-3 cursor-pointer border-b border-gray-200">
			{/**imgae */}
			<Image
				src={post.data().userImg}
				alt="user image"
				height={0}
				width={0}
				className="h-11 w-11  top-2 rounded-full"
			/>
			{/**right side */}
			<div className=" ml-2">
				{/**header */}
				<div className="flex justify-between items-center">
					{/** post user info */}
					<div className="flex items-center space-x-2 whitespace-nowrap">
						<h4 className=" font-bold text-[15px] sm:text-[16px] hover:underline">
							{post.data().name}
						</h4>
						<span className=" text-sm sm:text-[15px] ">
							@{post.data().username} -{" "}
						</span>
						<span className=" text-sm sm:text-[15px] hover:underline">
							<Moment fromNow>
								{post?.data().timestamp?.toDate()}
							</Moment>
						</span>
					</div>
					{/** dot icon */}
					<EllipsisHorizontalIcon className=" w-10 h-10 p-2 hover:bg-sky-100  hover:text-sky-500 hoverEffect " />
				</div>
				{/** post text */}
				<p className=" text-gray-800 text-[15px]  sm:text-[16px] mb-2">
					{post.data().text}
				</p>
				{/** post image */}
				{post.data().image && (
					<Image
						src={post.data().image}
						alt="post image"
						height={500}
						width={500}
						className=" rounded-2xl mr-2"
					/>
				)}
				{/** icons*/}
				<div className="flex  justify-between p-2 text-gray-500 items-center  ">
					<ChatBubbleOvalLeftEllipsisIcon
						onClick={() => setOpen(!open)}
						className="h-9 w-9 hoverEffect p-2 hover:bg-sky-100 hover:text-sky-500"
					/>
					{session?.user.uid === post?.data().id && (
						<TrashIcon
							onClick={deletePost}
							className="h-9 w-9 hoverEffect p-2  hover:bg-red-100 hover:text-red-600"
						/>
					)}

					<div className=" flex justify-center items-center">
						{hasLiked ? (
							<HeartIconFilled
								onClick={likedPost}
								className="h-9 w-9 hoverEffect p-2  text-red-600"
							/>
						) : (
							<HeartIcon
								onClick={likedPost}
								className="h-9 w-9 hoverEffect p-2  hover:bg-red-100 hover:text-red-600"
							/>
						)}
						{likes.length > 0 && (
							<span
								className={`${
									hasLiked && "text-red-600"
								} text-sm select-none`}
							>
								{likes.length}
							</span>
						)}
					</div>

					<ShareIcon className="h-9 w-9 hoverEffect p-2  hover:bg-sky-100 hover:text-sky-500" />
					<ChartBarIcon className="h-9 w-9 hoverEffect p-2  hover:bg-sky-100 hover:text-sky-500" />
				</div>
			</div>
		</div>
	);
}

/*



11 May 2023 at 15:11:12 UTC+5:30
userImg
"https://lh3.googleusercontent.com/a/AGNmyxYsKhyu7WcHYrF-rKdawYmsxNPuMUubpYTCIDfu=s96-c"
username
"dankmemer"
 


-/*/

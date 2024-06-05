import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRef } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { setDoc, doc } from "firebase/firestore";
import {
	addDoc,
	collection,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, uploadString } from "firebase/storage";
import { ref } from "firebase/storage";
import { XMarkIcon } from "@heroicons/react/24/solid";
export default function Input() {
	const { data: session } = useSession();
	const [input, setInput] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const filePickerRef = useRef(null);

	console.log(session?.user);
	const sendPost = async () => {
		if (loading) {
			return;
		}
		setLoading(true);
		const docRef = await addDoc(collection(db, "posts"), {
			id: session?.user.uid,
			text: input,
			userImg: session?.user.image,
			timestamp: serverTimestamp(),
			name: session?.user.name,
			username: session?.user.username,
		});

		const imageRef = ref(storage, `posts/${docRef.id}/image`);

		if (selectedFile) {
			await uploadString(imageRef, selectedFile, "data_url").then(
				async () => {
					const downloadURL = await getDownloadURL(imageRef);
					await updateDoc(doc(db, "posts", docRef.id), {
						image: downloadURL,
					});
				}
			);
		}
		setInput("");
		setSelectedFile(null);
		setLoading(false);
	};

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = (readerEvent) => {
			setSelectedFile(readerEvent.target.result);
		};
	};

	return (
		<>
			{session && (
				<div className="flex  border-b border-gray-200 p-3 space-x-3 ">
					<Image
						onClick={signOut}
						src={
							session?.user.image ||
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuu4mbEPepclyG-eHpJHAegNrE7qSWNw9CVxJ1mM4&s"
						}
						alt="user image"
						width={50}
						height={50}
						className=" cursor-pointer  hover:brightness-95 rounded-full h-11 w-11"
					/>
					<div className=" w-full divide-y divide-gray-200 ">
						<div className=" ">
							<textarea
								value={input}
								onChange={(e) => setInput(e.target.value)}
								rows="2"
								className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700  "
								placeholder="What's happening"
							></textarea>
						</div>
						{selectedFile && (
							<div className=" relative">
								<XMarkIcon
									className=" border border-white h-7 cursor-pointer text-black absolute  right-0 shadow-md shadow-white "
									onClick={() => setSelectedFile(null)}
								/>
								<Image
									src={selectedFile}
									height={0}
									width={0}
									className={`${
										loading && "animate-pulse"
									} h-full w-full `}
									alt="selected file"
								/>
							</div>
						)}
						<div className="  flex justify-between items-center pt-2.5">
							{!loading && (
								<>
									<div className="flex">
										<div
											className=""
											onClick={() =>
												filePickerRef.current.click()
											}
										>
											<PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
											<input
												type="file"
												name=""
												id=""
												className=" hidden"
												ref={filePickerRef}
												onChange={addImageToPost}
											/>
										</div>
										<FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
									</div>
									<button
										onClick={sendPost}
										className=" bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
										disabled={!input.trim()}
									>
										Tweet
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

/*



*/

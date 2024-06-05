import React from "react";
import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/24/solid";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { InboxIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
export default function Sidebar() {
	const { data: session } = useSession();
	return (
		<div className=" hidden sm:flex flex-col  p-2 xl:items-start fixed h-full xl:ml-24 ">
			{/** Twitter Logo */}

			<div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1 justify-center flex  items-center">
				<Image
					src={
						"https://img.freepik.com/free-icon/twitter_318-674515.jpg"
					}
					width={"40"}
					height={"40"}
					alt="Twitter logo"
				></Image>
			</div>

			{/** Menu */}
			<div className=" mt-4 mb-2.5 flex gap-3 flex-col">
				<SidebarMenuItem text={"Home"} Icon={HomeIcon} active={true} />

				<SidebarMenuItem text={"Explore"} Icon={HashtagIcon} />

				{session && (
					<>
						<SidebarMenuItem
							text={"Notification"}
							Icon={BellIcon}
						/>

						<SidebarMenuItem text={"Messages"} Icon={InboxIcon} />

						<SidebarMenuItem
							text={"Bookmark"}
							Icon={BookmarkIcon}
						/>

						<SidebarMenuItem text={"Lists"} Icon={ClipboardIcon} />

						<SidebarMenuItem text={"Profile"} Icon={UserIcon} />

						<SidebarMenuItem
							text={"More"}
							Icon={EllipsisHorizontalCircleIcon}
						/>
					</>
				)}
			</div>

			{/**Buttons */}
			{session ? (
				<>
					<button className=" bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
						Tweet
					</button>

					{/**Profile */}
					<div className=" mt-4 hoverEffect text-gray-700 flex items-center  justify-center xl:justify-start">
						<img
							onClick={signOut}
							src={session.user.image}
							alt="user-profile-picture"
							className=" rounded-full h-10 w-10 xl:mr-2"
						/>
						<div className=" leading-5 hidden xl:inline">
							<h4 className="font-bold">{session?.user.name}</h4>
							<p className="text-gray-500">
								@{session.user.username}
							</p>
						</div>
						<EllipsisHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
					</div>
				</>
			) : (
				<>
					<button
						onClick={signIn}
						className=" bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden  xl:inline"
					>
						Sign In
					</button>
					<ArrowRightOnRectangleIcon
						onClick={signIn}
						className="inline   xl:hidden cursor-pointer h-12 hoverEffect p-2"
					/>
				</>
			)}
		</div>
	);
}

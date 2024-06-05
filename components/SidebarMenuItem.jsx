export default function SidebarMenuItem({ text, Icon, active }) {
	return (
		<div
			className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3
		 "
		>
			<div className="p-2   xl:p-0">
				<Icon className="h-7 " />
			</div>
			<span className={`${active} && font-bold hidden  xl:inline`}>
				{text}
			</span>
		</div>
	);
}

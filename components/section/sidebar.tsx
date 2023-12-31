"use client";
import { User2Icon, Mic2Icon, MusicIcon, HistoryIcon, ListMusicIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navmenu = [
	{
		id: 1,
		name: "Profile",
		icon: User2Icon,
		url: "/profile"
	},
	{
		id: 2,
		name: "Top Artists",
		icon: Mic2Icon,
		url: "/artists"
	},
	{
		id: 3,
		name: "Top Tracks",
		icon: MusicIcon,
		url: "/tracks"
	},
	{
		id: 4,
		name: "Recent",
		icon: HistoryIcon,
		url: "/recent"
	},
	{
		id: 5,
		name: "Playlist",
		icon: ListMusicIcon,
		url: "/playlist"
	}
];

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<div className="nav bg-slate-800">
			<Link href="/" className="hidden lg:block">
				<Image
					src="/spotify.svg"
					className="text-white"
					alt="spotify_logo"
					width={40}
					height={40}
				/>
			</Link>

			<div className="flex w-full flex-row justify-between gap-x-3 lg:flex-col lg:gap-y-8">
				{navmenu.map((link) => {
					const isActive = pathname === link.url;

					return (
						<Link key={link.id} href={link.url}>
							<div
								className={cn("flex flex-col items-center gap-y-2", isActive && "text-green-400")}
							>
								<link.icon size={24} />
								<span className="text-center text-xs">{link.name}</span>
							</div>
						</Link>
					);
				})}
			</div>

			<a target="_blank" href="https://github.com/Abdulhameed735" className="hidden lg:block">
				<Image src="/github.svg" alt="github_logo" width={40} height={40} />
			</a>
		</div>
	);
};

export default Sidebar;

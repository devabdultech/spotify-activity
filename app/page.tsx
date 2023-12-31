"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
	const { data: session } = useSession();
	const router = useRouter();

	if (session) {
		router.push("/profile");
	}

	return (
		<div className="flex h-[100dvh] w-screen flex-col bg-slate-950 lg:flex-row">
			<aside className="relative flex w-full flex-1 flex-col justify-center bg-slate-950 px-5 pt-8 text-[#1db954] lg:w-7/12 lg:px-8">
				<Link href="/">
					<nav className="absolute left-0 top-8 flex w-full cursor-pointer px-6 md:top-[22px] md:px-6 lg:px-8">
						<h1 aria-label="SpotifyActivity">
							<div className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px]">
								<div>
									SpotifyActivity <span>●</span>
								</div>
							</div>
						</h1>
					</nav>
				</Link>
				<h1 className="text-lg leading-[1.2] lg:text-xl lg:leading-[1.25]">
					Explore your music journey like never before with Spotify-Activity! Gain fascinating
					insights into your Spotify usage, from your most-played tracks and artists to your
					evolving music preferences. Dive into a world of data-driven discovery, all while enjoying
					the tunes that define your moments. Unveil your musical story with Spotify-Activity.
				</h1>
			</aside>

			<aside className="relative flex w-full flex-col items-center justify-center rounded-t-3xl bg-black px-5 py-8 text-white lg:w-5/12 lg:rounded-none">
				<div className="flex flex-col gap-y-5">
					<h1 className="text-center text-[20px] leading-[1.2] md:text-[32px] md:leading-[1.25]">
						Log in to Spotify
					</h1>
					<Button
						className="rounded-lg bg-[#1db954] hover:bg-[#1ed655be]"
						onClick={() => signIn("spotify", { callbackUrl: "http://localhost:3000/profile" })}
					>
						Log In
					</Button>
				</div>
				<div></div>
			</aside>
		</div>
	);
}

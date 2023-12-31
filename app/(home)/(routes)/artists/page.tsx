"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { UserTopArtistsResponse } from "@/types";
import ScaleLoader from "react-spinners/ScaleLoader";

const TopArtists = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userTopartists, setUserTopartists] = useState<UserTopArtistsResponse | null>(null);
	const [selectedTimeRange, setSelectedTimeRange] = useState("long_term");
	const [isLoading, setIsLoading] = useState(true);

	const fetchTopArtists = async (topItem: string, timeRange: string) => {
		if (status === "authenticated" && session) {
			try {
				const limit = 30;
				const response = await axios.get(
					`/api/top-items?top_item=${topItem}&limit=${limit}&time_range=${timeRange}`,
					{
						headers: {
							Authorization: `Bearer ${session.accessToken}`
						}
					}
				);
				setUserTopartists(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchTopArtists("artists", selectedTimeRange);
	}, [selectedTimeRange, status, session]);

	return (
		<div className="flex h-full flex-col gap-y-16 p-3 lg:p-5">
			{isLoading ? (
				<div className="flex h-full items-center justify-center">
					<ScaleLoader
						color={"green"}
						loading={isLoading}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<>
					<header className="block items-center  justify-stretch gap-y-4 lg:flex lg:flex-row  lg:justify-between">
						<h2 className="text-center text-xl font-bold lg:text-2xl">Top Artists</h2>
						<div className="flex justify-around gap-3">
							<button
								className={cn(
									"bg-transparent p-2 font-semibold",
									selectedTimeRange === "long_term" ? "underline" : ""
								)}
								onClick={() => fetchTopArtists("artists", "long_term")}
							>
								<span>All Time</span>
							</button>

							<button
								className={cn(
									"bg-transparent p-2 font-semibold",
									selectedTimeRange === "medium_term" ? "underline" : ""
								)}
								onClick={() => fetchTopArtists("artists", "medium_term")}
							>
								<span>Last 6 months</span>
							</button>

							<button
								className={cn(
									"bg-transparent p-2 font-semibold",
									selectedTimeRange === "short_term" ? "underline" : ""
								)}
								onClick={() => fetchTopArtists("artists", "short_term")}
							>
								<span>Last 4 weeks</span>
							</button>
						</div>
					</header>

					<section className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
						{userTopartists?.items.map((artist) => (
							<div
								key={artist.id}
								className="flex w-full flex-col items-center gap-y-4 text-center lg:w-auto"
							>
								<div>
									<picture>
										<img
											className="h-[150px] w-[150px] rounded-full object-cover md:h-[170px] md:w-[170px] lg:h-[190px] lg:w-[190px]"
											src={artist.images[0].url}
											alt={artist.name}
										/>
									</picture>
								</div>

								<Link href={`/artists/${artist.id}`} className="font-semibold hover:underline">
									{artist.name}
								</Link>
							</div>
						))}
					</section>
				</>
			)}
		</div>
	);
};

export default TopArtists;

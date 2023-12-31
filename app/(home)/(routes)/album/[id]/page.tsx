"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import { AlbumData } from "@/types";
import ScaleLoader from "react-spinners/ScaleLoader";
import { convertMillisecondsToTime } from "@/utils/convert-time";

const AlbumPage = ({ params }: { params: { id: string } }) => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [albumData, setAlbumData] = useState<AlbumData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchAlbumData = async () => {
		if (status === "authenticated" && session) {
			try {
				const response = await axios.get(`/api/album?id=${params.id}`, {
					headers: {
						Authorization: `Bearer ${session.accessToken}`
					}
				});
				setAlbumData(response.data.data);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchAlbumData();
	}, [status, session]);

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
					{albumData && (
						<div className="flex flex-col lg:flex-row">
							<div className="w-full min-w-[auto] text-center lg:w-[30%] lg:min-w-[200px] ">
								<div className=" max-w-[250px] lg:mr-10">
									<picture>
										<img
											className="h-[150px] w-[150px] rounded object-cover md:h-[170px] md:w-[170px] lg:h-[190px] lg:w-[190px]"
											src={albumData.images[0].url}
											alt={albumData.name}
										/>
									</picture>
								</div>

								<Link href={albumData.external_urls.spotify}>
									<h3 className="mt-3 text-xl font-semibold lg:text-2xl  ">{albumData.name}</h3>
								</Link>
								<p className="mt-1 text-sm">{albumData.tracks.total}</p>
							</div>

							<div className="my-5 flex-1 lg:my-0 lg:ml-10">
								<ul className="flex flex-col gap-y-4">
									{albumData.tracks.items.map((track) => (
										<li key={track.id}>
											<Link className="c-grid" href={`/tracks/${track.id}`}>
												<Link className="c-grid" href={`/tracks/${track.id}`}>
													<div className="d2-grid">
														<div className="d3-grid">
															<span className="mb-1.5 hover:underline">{track.name}</span>
															<div className="d4-grid">
																{track.artists.map((artist, index) => (
																	<Link
																		key={artist.id}
																		className="hover:underline"
																		href={`/artists/${artist.id}`}
																	>
																		{artist.name}
																		{index < track.artists.length - 1 && ", "}
																	</Link>
																))}
																&nbsp;·&nbsp;&nbsp;
																<span className="hover:underline">{track.name}</span>
															</div>
														</div>
														<span className="text-base">
															{convertMillisecondsToTime(track.duration_ms)}
														</span>
													</div>
												</Link>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AlbumPage;

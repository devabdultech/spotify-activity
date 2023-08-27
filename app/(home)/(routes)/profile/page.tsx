"use client";
import { useSession, signOut } from "next-auth/react";
import { Session, User } from "next-auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const ProfilePage = () => {
	const { data, status } = useSession();
	const session = data as Session & { accessToken: string | null };
	const [userProfile, setUserProfile] = useState();

	useEffect(() => {
		async function ProfileData() {
			if (status === "authenticated" && session) {
				try {
					const response = await axios.get("/api/profile", {
						headers: {
							Authorization: `Bearer ${session.accessToken}`
						}
					});
					setUserProfile(response.data);
					console.log(response.data);
				} catch (error) {
					console.error("Error fetching profile data:", error);
				}
			}
		}
		ProfileData();
	}, [status, session]);

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	return <h1>Hey</h1>;
};

export default ProfilePage;
import { PlaylistResponse, ExternalUrls, Image } from ".";

interface UserPlaylistResponse {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: PlaylistResponse[];
}

interface Followers {
	href: string;
	total: number;
}

interface Owner {
	external_urls: ExternalUrls;
	followers: Followers;
	href: string;
	id: string;
	type: string;
	uri: string;
	display_name: string;
}

interface PlaylistTrack {
	added_at: string;
	added_by: {
		external_urls: ExternalUrls;
		followers: Followers;
		href: string;
		id: string;
		type: string;
		uri: string;
	};
	is_local: boolean;
	track: {
		album: {
			album_type: string;
			total_tracks: number;
			available_markets: string[];
			external_urls: ExternalUrls;
			href: string;
			id: string;
			images: {
				url: string;
				height: number;
				width: number;
			}[];
			name: string;
			release_date: string;
			release_date_precision: string;
			restrictions: {
				reason: string;
			};
			type: string;
			uri: string;
			artists: {
				external_urls: ExternalUrls;
				href: string;
				id: string;
				name: string;
				type: string;
				uri: string;
			}[];
		};
		artists: {
			external_urls: ExternalUrls;
			followers: Followers;
			genres: string[];
			href: string;
			id: string;
			images: {
				url: string;
				height: number;
				width: number;
			}[];
			name: string;
			popularity: number;
			type: string;
			uri: string;
		}[];
		available_markets: string[];
		disc_number: number;
		duration_ms: number;
		explicit: boolean;
		external_ids: {
			isrc: string;
			ean: string;
			upc: string;
		};
		external_urls: ExternalUrls;
		href: string;
		id: string;
		is_playable: boolean;
		linked_from: Record<string, unknown>;
		restrictions: {
			reason: string;
		};
		name: string;
		popularity: number;
		preview_url: string;
		track_number: number;
		type: string;
		uri: string;
		is_local: boolean;
	};
}

interface PlaylistData {
	collaborative: boolean;
	description: string;
	external_urls: ExternalUrls;
	followers: Followers;
	href: string;
	id: string;
	images: Image[];
	name: string;
	owner: Owner;
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
		items: PlaylistTrack[];
	};
	type: string;
	uri: string;
}

export type { UserPlaylistResponse, PlaylistData };

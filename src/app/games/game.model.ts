export interface Game {
    id: number;
    dominant_color: string;
    saturated_color: string;

    name: string;
    slug: string;
    name_original: string;
    alternative_names: string[];
    website?: string;

    description: string;
    genres: Genre[];
    tags: Tag[];
    stores: Store[];
    store_links?: StoreLink[];

    developers: Developer[]

    clip?: string;
    background_image: string;
    background_image_additional?: string;
    short_screenshots?: ShortScreenshot[];
    screenshots_count: number;
    screenshots?: Screenshot[];

    movies_count: number;
    trailers: Trailer[];

    parent_platforms: ParentPlatform[];
    platforms: Platform[];

    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    esbr_rating?: ESBR;

    added: number;
    added_by_status: AddedStatus;
    playtime: number;
    suggestions_count: number;

    achievements_count: number;
    achievements?: Achievement[];

    released: string;
    updated: string;

    tba: boolean;
}

export interface GameRequestOptions {
    [key: string]: any;

    page?: number,
    page_size?: number,

    search?: string,
    search_precise?: boolean,
    search_exact?: boolean,

    platforms?: string,
    genres?: string,
    tags?: string,
    developers?: string,

    dates?: string,
    updated?: string,

    ordering?: string
}
///////////////////////////////////////////////////////////

interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

interface Tag extends Genre {
    language: string;
}

interface ShortScreenshot {
    id: number;
    image: string;
}

interface Rating {
    id: number;
    title: string;
    count: number;
    percentage: number;
}

interface AddedStatus {
    beaten: number;
    dropped: number;
    owned: number;
    playing: number;
    toplay: number;
    yet: number;
}

interface ESBR {
    id: number;
    slug: string;
    name: string;
}

interface ParentPlatform {
    platform: {
        id: number;
        slug: string;
        name: string;
    };
}

interface Platform extends ParentPlatform {
    released_at: string;

    requirements: {
        minimum: string;
        recommended: string;
    };
}

interface Store {
    id: number;
    store: {
        id: number;
        name: string;
        slug: string;
        image_background: string;
        domain: string;
        games_count: number;
    }
}

interface StoreLink {
    id: number;
    game_id: number;
    store_id: number;
    url: string;
}

interface Screenshot {
    id: number;
    image: string;
    hidden: boolean;
    width: number;
    height: number;
}

interface Trailer {
    id: number;
    name: string;
    preview: string;
    data: { [key: string]: any };
}

interface Achievement {
    id: number;
    name: string;
    image: string;
    description: string;
    percent: string;
}

interface Developer {
    id: number;
    name: string;
    slug: string;

    image_background: string;
    games_count: number;
}
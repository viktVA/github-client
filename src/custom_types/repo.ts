

export type Contributors = {
    login: string;
    avatar_url: string;
    url: string;

};

export type RepoInfo = {
    id: number;
    name: string;
    homepage: string;
    topics: string[];
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    languages_url: string;
    contributors_url: string;
    languages ?: object;
    contributors ?: Contributors[];
};
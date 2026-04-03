
export type Repo = {
    id: number;
    name: string;
    owner: {
        login: string;
        avatar_url: string;
        type: string;
    }
    description: string;
    updated_at: string;
    stargazers_count: number;
};
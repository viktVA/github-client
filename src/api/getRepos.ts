
import axios from "axios";

type Repo = {
    id: number;
    name: string;
    owner: {
        avatar_url: string;
    }
    description: string;
    updated_at: string;
    stargazers_count: number;
};

export const getRepos  = async (): Promise<Repo[]> => {
    const result = await axios<Repo[]>({
               method: 'get',
               url: 'https://api.github.com/orgs/ktsstudio/repos'
           });

    return result.data;


};
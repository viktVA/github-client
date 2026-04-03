import axiosInstance from "@api/axiosInstance";
import  type {Contributors, RepoInfo} from "@custom_types/repo";

// Получение списка языков которые используются в репозитории
const getLanguages = async (api: string): Promise<Record<string, number>> => {
    const list = await axiosInstance<Record<string, number>>({
        method: 'get',
        url: `${api}`
    });

    return list.data;


};

// Получение списка авторов
const getContributors = async (api: string) => {
    const list = await axiosInstance<Contributors[]>({
        method: 'get',
        url: `${api}`
    });

    return  list.data;

};


export const getRepo = async (owner: string ,name: string) => {

    const result = await axiosInstance<RepoInfo>({
        method: 'get',
        url: `https://api.github.com/repos/${owner}/${name}`
    });

    const languages = await getLanguages(result.data['languages_url']);
    const contributors = await getContributors(result.data['contributors_url']);

    const repoInfo : RepoInfo =  {
        ...result.data,
        languages,
        contributors
    };
    return repoInfo;
};
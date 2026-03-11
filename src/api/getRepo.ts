import axios from "axios";
import  type {Contributors, RepoInfo} from "@custom_types/repo";

// Получение списка языков которые используются в репозитории
const getLanguages = async (api: string) => {
    try{
        const list = await axios<object>({
            method: 'get',
            url: `${api}`
        });

        return list.data;


    } catch (e) {
        console.log(e);
        return null;
    }
};

// Получение списка авторов
const getContributors = async (api: string) => {
    try {

        const list = await axios<Contributors[]>({
            method: 'get',
            url: `${api}`
        });

        return  list.data;

    } catch (e) {
        console.log(e);
        return null;
    }
};


export const getRepo = async (owner: string ,name: string) => {
    try{
        const result = await axios<RepoInfo>({
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

    } catch (e) {
        console.log(e);
        return null;
    }


};
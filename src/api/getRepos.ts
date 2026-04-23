import axiosInstance from "@api/axiosInstance";
import type {Repo} from "@custom_types/repos";

export const getRepos = async (org: string): Promise<Repo[]> => {
    const result = await axiosInstance<Repo[]>({
        method: 'get',
        url: `https://api.github.com/orgs/${org}/repos`,
    });

    return result.data;
};

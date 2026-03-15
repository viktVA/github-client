import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRepo} from "@api/getRepo";
import type {RepoInfo} from "@custom_types/repo";
import {getReadme} from "@api/getReadme";

const RepoPage = () => {
    const {owner, name} = useParams();
    const [repos, setRepos] = useState<RepoInfo|null>(null);
    const [readme, setReadme] = useState<string>('');


    useEffect(() => {
        const fetch =  async () => {
            try {
                if (owner !== undefined && name !== undefined) {
                    const result = await getRepo(owner, name);
                    setRepos(result);

                    const readmeResult = await getReadme(owner, name);
                    setReadme(readmeResult);
                } else {
                    throw new Error('No information about owner or name');
                }

            } catch (error) {
                console.error(error);
            }
        };
        fetch();

    }, [owner,name]);

    return <div></div>
};
export default RepoPage;
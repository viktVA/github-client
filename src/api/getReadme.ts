import axios from "axios";
import axiosInstance from "@api/axiosInstance";

// Возвращает содержимое Readme
export const getReadme = async (owner: string ,name: string)  => {

    // Получение ссылки на Readme
    const url = await axiosInstance<{download_url:string}>({
        method: 'get',
        url: `https://api.github.com/repos/${owner}/${name}/readme`
    });

    // Получение контента из Readme (raw.githubusercontent.com — публичный, Authorization не нужен)
    const response = await axios({
        method: 'get',
        url:`${url.data['download_url']}`
    });

    return response.data;



};
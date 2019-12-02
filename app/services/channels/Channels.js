import { apiFetch } from "../api";

const getChannels = async () => {
    return await apiFetch('/vktv/api/channels');
};

export default getChannels;

import axios from '../../configs/AxiosCustomize.js';

const createNewUser = (data) => {
    return axios.post("api/v1/participant", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

const getParticipants = () => {
    return axios.get("api/v1/participant/all");
}

const getParticipantsWithPagination = (page, limit) => {
    return axios.get("api/v1/participant", {
        params: {
            page: page, limit: limit
        }
    });
}

const updateUser = (data) => {
    return axios.put("api/v1/participant", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

const deleteUser = (data) => {
    return axios({
        method: 'delete',
        url: "api/v1/participant",
        data: data
    });
}

export {
    createNewUser, getParticipants, getParticipantsWithPagination, updateUser, deleteUser,
};
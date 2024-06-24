import axios from '../../utils/AxiosCustomize.js';

const createNewUser = async (data) => {
    return await axios.post("api/v1/participant", data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
        console.log("api service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

const getParticipants = async () => {
    return await axios.get("api/v1/participant/all").then(res => {
        console.log("api service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

const getParticipantsWithPagination = async (page, limit) => {
    return await axios.get("api/v1/participant", {
        params: {
            page: page, limit: limit
        }
    }).then(res => {
        console.log("api service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

const updateUser = async (data) => {
    return await axios.put("api/v1/participant", data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
        console.log("api service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

const deleteUser = async (data) => {
    return await axios({
        method: 'delete',
        url: "api/v1/participant",
        data: data
    }).then(res => {
        console.log("api service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

export {createNewUser, getParticipants, getParticipantsWithPagination, updateUser, deleteUser};
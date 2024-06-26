import axios from '../../configs/AxiosCustomize.js';

const createNewUser = (data) => {
    return axios.post("api/v1/participant", data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
        console.log("api service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

const getParticipants = () => {
    return axios.get("api/v1/participant/all").then(res => {
        console.log("api service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

const getParticipantsWithPagination = (page, limit) => {
    return axios.get("api/v1/participant", {
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

const updateUser = (data) => {
    return axios.put("api/v1/participant", data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => {
        console.log("api service : ", res);
        return res;
    }).catch(err => {
        console.log(err)
        return Promise.reject(err);
    })
}

const deleteUser = (data) => {
    return axios({
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

const login = (data) => {
    return axios.post("api/v1/login", data)
        .then(res => {
            console.log("api service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

const register = (data) => {
    return axios.post("api/v1/register", data)
        .then(res => {
            console.log("api service : ", res);
            return res;
        }).catch(err => {
            console.log(err)
            return Promise.reject(err);
        })
}

export {
    createNewUser, getParticipants, getParticipantsWithPagination, updateUser, deleteUser,
    login, register
};
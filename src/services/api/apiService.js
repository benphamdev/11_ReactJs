import axios from '../../utils/axiosCustomize';

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

export {createNewUser, getParticipants};
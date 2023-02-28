import axios from "axios";

const url = `http://be.thongtinbaohiem.club/api/users`
const urlDelete = `http://be.thongtinbaohiem.club/api/delete`


export async function getData() {
    const response = await DG_axios.get()
    return response?.data || []
}

export const DG_axios = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    },
});

export async function postDataUser(value) {
    const response = await DG_axios.post(url,value)
    return response?.data || []
}
export async function deleteUserById(id) {
    const response = await DG_axios.delete(urlDelete + `/${id}`)
    return response?.data || []
}

import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get('/admin/home-single-img');
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/home-single-img', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/home-single-img/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/home-single-img/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/home-single-img/${id}`)
}

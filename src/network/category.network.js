import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get('/admin/category');
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/category', data)
}
export const priorityNav = async(data) => {
    return await privateRequest.post('admin/category/priority', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/category/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/category/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/category/${id}`)
}

/* resource store */
export const seoPost = async(data) => {
    return await privateRequest.post('/admin/seo-categories', data)
}

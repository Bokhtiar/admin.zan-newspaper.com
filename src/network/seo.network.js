import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get('/seo');
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/seo', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/hero-news/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/hero-news/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/hero-news/${id}`)
}

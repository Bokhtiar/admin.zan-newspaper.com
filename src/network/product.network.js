import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get('/admin/product');
};
/* resource store */
export const store = async (data) => {
    return await privateRequest.post('/admin/product', data)
}
/* resource show */
export const show = async (id) => {
    return await privateRequest.get(`/admin/product/${id}`)
}
/* reosurce update */  
export const update = async (data, id) => {
    return await privateRequest.put(`/admin/product/${id}`, data)
}
/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/product/${id}`)
}

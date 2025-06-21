import { privateRequest } from '../config/axios.config'

/* list of resource */
/* list of resource */
export const index = async (queryParams) => {
    // console.log(queryParams,"my query params")
    try {
      const response = await privateRequest.get(`/admin/news?${queryParams}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/news', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/news/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
  console.log("ggggg",id)
    return await privateRequest.post(`/admin/news/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/news/${id}`)
}

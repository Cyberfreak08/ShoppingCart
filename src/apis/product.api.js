import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://649c6d83048075719238257b.mockapi.io/products/',
  });
//:endpoint

export const getProductsApi = async (order) => {
  const response = await instance.get();
  //   console.log(response.data);  
  return response.data;
};
export const getProjectById= async (id) => {
  const response = await instance.get(`/project?projectId=${id}`);
  return response.data;
}

export const searchProjectsApi = async (params) => {
  const response = await instance.get(`/project?order=${'ASC'}&search=${params}`);
  //   console.log(response.data);  
  return response.data;
};

export const updateProjectApi = async (params)=>{
  console.log(params);
  const user = {
    name: params.name,
  };
  const response = await instance.put(`/project/?updateId=${params.id}`,user);  
  return response.data;
};

export const deleteProjectApi = async (params)=>{
  // console.log(params.projectId);
  const response = await instance.put(`/project/?deleteId=${params.id}`);
  // console.log(response.data);  
  return response.data;
};
export const getProjectSearchApi = async (value) => {
  console.log(value);
  const response = await instance.delete(`/project/?search=${value}`);
  return response.data;
};
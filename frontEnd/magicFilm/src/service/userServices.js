import { axiosInstance, axiosProtected } from "./axiosInstance"


export const userLogin = (data) => {
    return axiosInstance.post(`/login`, data);
};

export const getUsers =()=>{
    let users= axiosProtected.get("/user");
    return users;
};


export const verifyUser = (data) => { 
    return axiosInstance.post("/user/verify-email", data);
}
export const reenviarMail = (data) => { 
    return axiosInstance.post("/user/resend-email", data);
}



export const getUsersByID =(id)=>{
    let users= axiosProtected.get(`/user/${id}`);
    return users;
};

export const getUser=(name)=>{
    let users = axiosProtected.get("/user/", {params:{name:name}})
    return users;
};

export const getSecrets=(   )=>{
    let user = axiosProtected.get("/user/secrets")
    return user;
};

export const deleteUser=(id)=>{
    return axiosProtected.delete(`/user/${id}`);
}


export const updateUser=(id, data)=>{
    return axiosProtected.patch(`/user/${id}`, data);
}

export const createUser =(data)=>{
    return axiosInstance.post("/user", data);
}
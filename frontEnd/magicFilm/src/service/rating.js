import { axiosInstance } from "./axiosInstance";

export const getScores =()=>{
    let score= axiosInstance.get("/score");
    return score;
};

export const  getScore=(name)=>{
    let score = axiosInstance.get("", {params:{name:name}})
    return score;
};

 

export const createScore =(data)=>{
    return axiosInstance.post("/score/", data);
}
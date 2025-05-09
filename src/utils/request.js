const API_DOMAIN = "http://localhost:3002/";

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const res = response.json();
  return res;
};

export const post = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  return await response.json();
};

export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  const res=await response.json();
  return res;
};

export const patch=async(path,options)=>{
    const response=await fetch(API_DOMAIN +path,{
        method:"PATCH",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(options),
    });
    const res= await response.json()
    return res;
}

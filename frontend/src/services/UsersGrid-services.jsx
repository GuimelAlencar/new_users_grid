const url = "http://localhost:8080/users/";

export async function createUser(data) {
   const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json();
}

export async function readUsers() {
   const response = await fetch(`${url}`, {
      method: "GET",
   });
   return await response.json();
}

export async function readUser(id) {
   const response = await fetch(`${url + id}`, {
      method: "GET"
   });
   return await response.json();
}


export async function updateUser(id, data) {
   const response = await fetch(`${url + id}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json();
}

export async function deleteUser(id) {
   const response = await fetch(`${url + id}`, {
      method: "DELETE",
   });
   return await response.json();
}

const serverAddress = "http://localhost:3000/";

const getJson = (url) => {
  try {
    return fetch(`${serverAddress}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return;
  }
};

const postJson = (url, bodyData) => {
  return fetch(`${serverAddress}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
};

const updateJson = (url, bodyData) => {
  return fetch(`${serverAddress}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
};

const deleteJson = (url, bodyData) => {
  return fetch(`${serverAddress}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
};

export { getJson, postJson, updateJson, deleteJson };

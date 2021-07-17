import { API } from "../../backend";

export const createOrder = (userId, token, order) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: order }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

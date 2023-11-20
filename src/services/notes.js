import { URL_BASE, tokenKey } from "../constants";

export async function getNotes() {
  const token = window.localStorage.getItem(tokenKey);

  const url = `${URL_BASE}/notes`;
  const options = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    window.localStorage.removeItem(tokenKey);
    window.location.reload();
    return;
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

export async function createNote(noteData) {
  const url = `${URL_BASE}/notes`;
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "POST",
    body: JSON.stringify(noteData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    window.localStorage.removeItem(tokenKey);
    window.location.reload();
    return;
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

export async function editNote(id, updateData) {
  const url = `${URL_BASE}/notes/${id}`;

  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "PATCH",
    body: JSON.stringify(updateData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    window.localStorage.removeItem(tokenKey);
    window.location.reload();
    return;
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

export async function deleteNote(id) {
  const url = `${URL_BASE}/notes/${id}`;
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    window.localStorage.removeItem(tokenKey);
    window.location.reload();
    return;
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

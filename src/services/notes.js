import { redirect } from "react-router-dom";
import { authProvider } from "../auth";
import { URL_BASE, tokenKey } from "../constants";

export async function getNotes() {
  const token = authProvider.token;

  const url = `${URL_BASE}/notes`;
  const options = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.data;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
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
    const body = await response.json();
    return body.data;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
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
    const body = await response.json();
    return body.data;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
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
    const body = await response.json();
    return body.ok;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

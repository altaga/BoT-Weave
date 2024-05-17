"use client";

export async function setCookie(name, value) {
  window.localStorage.setItem(name, JSON.stringify({ value }));
}

export async function getCookie(name) {
  try {
    return JSON.parse(window.localStorage.getItem(name)).value;
  } catch (e) {
    throw new Error("No Cookie Found");
  }
}

export async function deleteCookie(name) {
  window.localStorage.removeItem(name);
  return "ok";
}

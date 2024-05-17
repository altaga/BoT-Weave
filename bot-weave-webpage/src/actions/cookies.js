"use server";

import { cookies } from "next/headers";

export async function setCookie(name, value) {
  cookies().set(name, JSON.stringify({ value }));
}

export async function getCookie(name) {
    try{
        return JSON.parse(cookies().get(name)?.value).value;
    }
    catch(e){
        throw new Error("No Cookie Found");
    }
}

export async function deleteCookie(name) {
  cookies().delete(name);
}

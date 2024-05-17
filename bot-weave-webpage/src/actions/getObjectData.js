'use client';

import { Client } from "@bnb-chain/greenfield-js-sdk";

const client = Client.create(
  "https://greenfield-chain-us.bnbchain.org",
  "1017"
);

export async function getObjectData(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url);
      const result = await res.json()
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

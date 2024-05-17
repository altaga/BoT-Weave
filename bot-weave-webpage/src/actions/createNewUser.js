"use server";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function createNewUser(publicKey, signature) {
  const raw = JSON.stringify({
    publicKey,
    signature,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return new Promise(async (resolve, reject) => {
    fetch(`${process.env.GOOGLE_CLOUD_URL}/CreateUser`, requestOptions)
      .then((response) => response.text())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}

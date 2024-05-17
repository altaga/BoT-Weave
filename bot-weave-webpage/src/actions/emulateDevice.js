"use server";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export async function emulateDevice(apikey, dataIn, sensor, privateFlag) {
  const raw = JSON.stringify({
    apikey,
    dataIn,
    sensor,
    private: privateFlag,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return new Promise(async (resolve, reject) => {
    fetch(
      `${process.env.GOOGLE_CLOUD_URL}/addData`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}

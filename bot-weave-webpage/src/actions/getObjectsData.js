"use client";

import { Client } from "@bnb-chain/greenfield-js-sdk";

const client = Client.create(
  "https://greenfield-chain-us.bnbchain.org",
  "1017"
);

export async function getObjectsData(address) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await client.object.listObjects({
        bucketName: `bot-weave`,
        endpoint: "https://spmain.web3go.xyz",
        query: new URLSearchParams({ prefix: address }),
      });
      console.log(res.body);
      const array = res.body.GfSpListObjectsByBucketNameResponse.Objects.map(
        (obj, index) => {
          const name = obj.ObjectInfo.ObjectName.replace(`${address}/`, "");
          return {
            explorer:`https://greenfieldscan.com/tx/${obj.CreateTxHash}`,
            url:
              "https://greenfield-sp.bnbchain.org/view/bot-weave/" +
              obj.ObjectInfo.ObjectName,
            id: index,
            name: name.substring(name.indexOf("/") + 1, name.length),
            sensor: name.substring(0, name.indexOf("/")),
            time: new Date(
              parseInt(
                name.substring(name.indexOf("/") + 1, name.indexOf(".json"))
              )
            ).toLocaleTimeString("en-US"),
            date: new Date(
              parseInt(
                name.substring(name.indexOf("/") + 1, name.indexOf(".json"))
              )
            ).toLocaleDateString("en-US"),
            timestamp: parseInt(
              name.substring(name.indexOf("/") + 1, name.indexOf(".json"))
            ),
          };
        }
      );
      resolve(array.sort((a, b) => b["timestamp"] - a["timestamp"]));
    } catch (error) {
      reject(error);
    }
  });
}

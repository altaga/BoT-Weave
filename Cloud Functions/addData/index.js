const functions = require('@google-cloud/functions-framework');
const Firestore = require("@google-cloud/firestore");
const { ReedSolomon } = require("@bnb-chain/reed-solomon");
const { Client, VisibilityType, RedundancyType, bytesFromBase64 } = require("@bnb-chain/greenfield-js-sdk");
var Long = require('long');

// Constants
const rs = new ReedSolomon();
const client = Client.create(
  "https://greenfield-chain-us.bnbchain.org",
  "1017"
);
const CloudController = "0x72b9EB24BFf9897faD10B3100D35CEE8eDF8E43b";
const CloudControllerPrivateKey = "0Xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                      

const db = new Firestore({
  projectId: "bot-weave",
  keyFilename: "credential.json",
});

const Users = db.collection("Users");

functions.http('helloHttp', async (req, res) => {
   try {
    const apikey = req.body.apikey;
    const query = await Users.where("apikey", "==", apikey).get();
    if (!query.empty) {
      const data = query.docs[0].data()
      const dataIn = req.body.dataIn;
      const sensor = req.body.sensor;
      const private = req.body.private ?? false;
      const publicKey = data["publicKey"];
      const objectName = `${publicKey}/${sensor}/${new Date().getTime()}.json`;
      const fileBuffer = Buffer.from(JSON.stringify(dataIn));
      const expectCheckSums = await rs.encode(Uint8Array.from(fileBuffer));
      const createObjectTx = await client.object.createObject({
        bucketName: "bot-weave",
        objectName,
        creator: CloudController,
        visibility: private ? VisibilityType.VISIBILITY_TYPE_PRIVATE : VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        contentType: "json",
        redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
        payloadSize: Long.fromInt(fileBuffer.length),
        expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x)),
      });
      const createObjectTxSimulateInfo = await createObjectTx.simulate({
        denom: "BNB",
      });
      const createObjectTxRes = await createObjectTx.broadcast({
        denom: 'BNB',
        gasLimit: Number(createObjectTxSimulateInfo?.gasLimit),
        gasPrice: createObjectTxSimulateInfo?.gasPrice || '5000000000',
        payer: CloudController,
        granter: '',
        privateKey: CloudControllerPrivateKey,
      });
      await client.object.uploadObject(
          {
            bucketName: 'bot-weave',
            objectName: objectName,
            body: createFile(fileBuffer, objectName),
            txnHash: createObjectTxRes.transactionHash,
          },
          {
            type: 'ECDSA',
            privateKey: CloudControllerPrivateKey,
          }
      );
      res.send(createObjectTxRes.transactionHash)
    } else {
      res.send("Bad APIKey")
    }
  } catch (e) {
    res.send("Bad Request")
  }
});

function createFile(buffer, name) {
    return {
      name,
      type: 'json',
      size: buffer.length,
      content: buffer,
    }
  }
const functions = require('@google-cloud/functions-framework');
const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "bot-weave",
  keyFilename: "credential.json",
});

const Users = db.collection("Users");

functions.http('helloHttp', async (req, res) => {
   try {
    const publicKey = req.body.publicKey;
    const signature = req.body.signature;
    const query = await Users.where("publicKey", "==", publicKey).get();
    if (!query.empty) {
      let data = query.docs[0].data()
      if(data["signature"] !== signature) throw res.send("Wrong Signature")
      data["apikey"] = generateAPIKey();
      await Users.doc(publicKey).set(data);
      res.send(data["apikey"]);
    } else {
      res.send("No User Created")
    }
  } catch (e) {
    res.send("Bad Request")
  }
});

function generateAPIKey(length = 32) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let apiKey = '';
    for (let i = 0; i < length; i++) {
        apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return apiKey;
}

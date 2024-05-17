const functions = require('@google-cloud/functions-framework');
const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: "bot-weave",
  keyFilename: "credential.json",
});

const Accounts = db.collection("Users");

functions.http('helloHttp', async (req, res) => {
   try {
    const publicKey = req.body.publicKey;
    const signature = req.body.signature;
    const query = await Accounts.where("publicKey", "==", publicKey).get();
    if (query.empty) {
      await Accounts.doc(publicKey).set({
        signature,
        publicKey,
        apikey: generateAPIKey(),
        balance:"0"
      });
      res.send(`Request Ok`);
    } else {
      res.send("User Already Exist")
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
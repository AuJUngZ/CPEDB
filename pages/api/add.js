import { MongoClient } from "mongodb";

export default async function cpe64Route(req, res) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://aujung:251925@cpe-65-info.6z5657i.mongodb.net/?retryWrites=true&w=majority"
    );
    await client.connect();
    const info = {
      id: req.body.id,
      thumbnail: req.body.thumbnail,
      img: req.body.img,
    };
    const user = await client
      .db("cpe64info")
      .collection("cpe")
      .findOne({ id: req.body.id });
    if (user === null) {
      await client.db("cpe64info").collection("cpe").insertOne(info);
      client.close();
      return res.status(200).json({ message: "insert success" });
    } else {
      client.close();
      return res.status(400).json({ message: "This user has already in DB" });
    }
  } else if (req.method === "DELETE") {
    const client = await MongoClient.connect(
      "mongodb+srv://aujung:251925@cpe-65-info.6z5657i.mongodb.net/?retryWrites=true&w=majority"
    );
    await client.connect();
    const user = await client.db("cpe64info").collection("cpe").findOne({
      id: req.body.id,
    });
    if (user != null) {
      await client.db("cpe64info").collection("cpe").deleteOne({
        id: req.body.id,
      });
      return res.status(200).json({ message: "delete success" });
    } else {
      return res.status(400).json({ message: "User not found!!" });
    }
  } else if (req.method === "PUT") {
    const client = await MongoClient.connect(
      "mongodb+srv://aujung:251925@cpe-65-info.6z5657i.mongodb.net/?retryWrites=true&w=majority"
    );
    await client.connect();
    const info = {
      id: req.body.id,
      thumbnail: req.body.thumbnail,
      img: req.body.img,
    };
    const user = await client
      .db("cpe64info")
      .collection("cpe")
      .findOne({ id: req.body.id });
    console.log(user);
    if (user != null) {
      await client
        .db("cpe64info")
        .collection("cpe")
        .updateOne({ id: req.body.id }, { $set: info });
      return res.status(200).json({ message: "update success" });
    } else {
      return res.status(400).json({ message: "User not found!!" });
    }
  }
}

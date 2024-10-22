const Festival = require("../models/festival");
const express = require("express");
const router = express.Router();

//type:         GET
//description:  Get list of all festivals
router.get("/", async (req, res) => {
  try {
    const festivals = await Festival.find();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//type:         POST
//description:  Creates festival
router.post("/create", async (req, res) => {
  const nameFestival = req.body.name;
  try {
    let name = await Festival.findOne()
      .where("name")
      .in(nameFestival);

    if (name) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Festival already exists" }] });
    }

    name = new Festival({
      name: nameFestival
    });

    await name.save();
    res.send("Festival Created");
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Sever Error");
  }
});

module.exports = router;

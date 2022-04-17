/**
 * Title: Leader Router
 * Description: Router for handling leader
 * Author: Toufiqul Islam
 * Date: 07 March 2022
 *
 */

//External imports
const express = require("express");

//Model Import
const Leader = require("../models/leaders");

//Initializing express Router Object
const leaderRouter = express.Router();

//Get Router
leaderRouter.get("/", async (req, res) => {
  try {
    const leaders = await Leader.find({});
    res.status(200).json(leaders);
  } catch (err) {
    res.status(500).json({
      error: {
        message: "There is a server Error",
      },
    });
  }
});

leaderRouter.get("/:leaderId", async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.leaderId);
    if (leader) {
      res.status(200).json(leader);
    } else {
      res.status(500).json({
        message: "Invalid ID or Leader is removed ..",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Could not find the leader",
    });
  }
});

//post Router
leaderRouter.post("/", async (req, res) => {
  const leader = new Leader(req.body);
  try {
    const result = await leader.save();

    res.status(200).json({
      message: "leader was added successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Could not add leader...",
      },
    });
  }
});

leaderRouter.post("/:leaderId", (req, res) => {
  res
    .status(403)
    .send(`Post request not supported on /leaders/${req.params.leaderId}`);
});

//Put Router
leaderRouter.put("/:leaderId", async (req, res) => {
  try {
    const result = await Leader.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body,
    });
    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

leaderRouter.put("/", (req, res) => {
  res.status(403).send(`put request not supported on /leaders`);
});

//Delete Router
leaderRouter.delete("/", async (req, res) => {
  try {
    const result = await Leader.remove({});
    res.status.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

leaderRouter.delete("/:leaderId", async (req, res) => {
  try {
    const result = await Leader.findByIdAndRemove(req.params.leaderId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export leaderRouter
module.exports = leaderRouter;

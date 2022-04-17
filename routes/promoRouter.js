/**
 * Title: Promo Router
 * Description: Router for handling promo
 * Author: Toufiqul Islam
 * Date: 07 March 2022
 *
 */

//External imports
const express = require("express");

//Model Import
const Promotion = require("../models/promotions");

//Initializing express Router Object
const promoRouter = express.Router();

//Get Router
promoRouter.get("/", async (req, res) => {
  try {
    const promotions = await Promotion.find({});
    res.status(200).json(promotions);
  } catch (err) {
    res.status(500).json({
      error: {
        message: "There is a server Error",
      },
    });
  }
});

promoRouter.get("/:promoId", async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.promoId);
    res.status(200).json(promotion);
  } catch (err) {
    res.status(500).json({
      message: "Could not find the promo",
    });
  }
});

//post Router
promoRouter.post("/", async (req, res) => {
  const promotion = new Promotion(req.body);
  try {
    const result = await promotion.save();

    res.status(200).json({
      message: "promotion was added successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Could not add promotion...",
      },
    });
  }
});

promoRouter.post("/:promoId", (req, res) => {
  res
    .status(403)
    .send(`Post request not supported on /promotions/${req.params.promoId}`);
});

//put Router
promoRouter.put("/:promoId", async (req, res) => {
  try {
    const result = await Promotion.findByIdAndUpdate(req.params.promoId, {
      $set: req.body,
    });
    res.status(200).json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

promoRouter.put("/", (req, res) => {
  res.status(403).send(`put request not supported on /promotions`);
});

//Delete Router
promoRouter.delete("/", async (req, res) => {
  try {
    const result = await Promotion.remove({});
    res.status.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

promoRouter.delete("/:promoId", async (req, res) => {
  try {
    const result = await Promotion.findByIdAndRemove(req.params.promoId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export Promo Router
module.exports = promoRouter;

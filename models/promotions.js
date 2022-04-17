/**
 * Title: Promotions Model
 * Description: A mongoose model for PromoRouter
 * Author: Toufiqul Islam
 * Date: 03 April 2022
 *
 */

//External Imports
const mongoose = require("mongoose");

//Load currency Type to mongoose schema types
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

//Creating  promo schema
const promoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Currency,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Creating Promotion Model
const Promotion = mongoose.model("Promotion", promoSchema);

//Model Export
module.exports = Promotion;

/**
 * Title: Leaders Model
 * Description: A mongoose model for leaderRouter
 * Author: Toufiqul Islam
 * Date: 03 April 2022
 *
 */

//External Imports
const mongoose = require("mongoose");

//Creating  leader schema
const leaderSchema = mongoose.Schema(
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
    designation: {
      type: String,
      required: true,
    },
    abbr: {
      type: String,
      required: true,
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

//Creating Leader Model
const Leader = mongoose.model("Leader", leaderSchema);

//Model Export
module.exports = Leader;

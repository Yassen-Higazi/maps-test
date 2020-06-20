const { Schema, model } = require("mongoose");

const geocoder = require("../utils/geoCoder");

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "shop name is required"],
      unique: [true, "Shop name already exist"],
    },

    address: {
      type: String,
      trim: true,
      required: [true, "address is Required"],
    },

    location: {
      geometry: {
        type: {
          type: String,
          enum: ["Point"],
        },

        coordinates: {
          type: [Number],
        },
      },

      country: {
        type: String,
        trim: true,
      },

      countryCode: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },

      zipcode: {
        type: String,
        trim: true,
      },

      streetName: {
        type: String,
        trim: true,
      },

      streetNumber: {
        type: String,
        trim: true,
      },

      formatedAddress: {
        type: String,
        trim: true,
      },
    },
  },

  { timestamps: true }
);

ShopSchema.pre("save", async function preSave(next) {
  try {
    const loc = await geocoder.geocode(this.address);
    const { latitude, longitude, ...rest } = loc[0];

    this.location = {
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      ...rest,
    };

    this.address = null;
  } catch (err) {
    next(err);
  }
});

module.exports = model("shop", ShopSchema);

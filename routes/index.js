const express = require("express");
const router = express.Router();

const controller = require("../controllers");

router.route("/").get(controller.getShops).post(controller.addShop);

router.get("/:id", controller.getShopById);

module.exports = router;

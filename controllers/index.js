const shopModel = require("../models");

class ShopsController {
  async getShops(req, res, next) {
    try {
      const shops = await shopModel.find();
      res.status(200).json({
        success: true,
        count: shops.length,
        data: shops,
      });
    } catch (err) {
      next(err);
    }
  }

  async getShopById(req, res, next) {
    const id = req.params.id;
    try {
      const shop = await shopModel.findById(id);
      if (shop) {
        res.status(200).json({
          success: true,
          count: shop.length,
          data: shop,
        });
      } else {
        res
          .status(404)
          .json({ success: false, data: null, error: "no shop with id" + id });
      }
    } catch (err) {
      next(err);
    }
  }

  async addShop(req, res, next) {
    try {
      const shop = await shopModel.create(req.body);
      res.status(201).json({
        success: true,
        count: shop.length,
        data: shop,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ShopsController();

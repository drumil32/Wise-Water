const Order = require("../../models/orderModel");
exports.assignOrder = async (req, res) => {
  const { worker_id, order_id } = req.body;
  console.log("from assignorder");
  console.log("ord id ", req.body.order_id);
  console.log(req.body.worker_id);

  const order = await Order.findOne({ _id: order_id });
  if (null === order) throw Error("Order is not exists");
  else {
    const updatedOrder = await Order.updateOne(
      { _id: order_id },
      { $set: { worker_id: worker_id, status: "assigned" } }
    );
    console.log(updatedOrder);
    if (updatedOrder) {
      res.status(200);
      res.json({
        updated: true,
      });
    } else {
      throw Error("Error while Updating Order");
    }
  }
};

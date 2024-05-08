// const mongoose = require('mongoose');

export const update = async (Model, req, res) => {
  const id = req.params.id;
  try {
      let re = await Model.findOne({ where: { id: id } });
      // console.log(re, "reeeeee");
      // return
      const [updated] = await Model.update(req.body, { where: { id: id } });
      if (updated) {
          res.json({ message: "User updated successfully" });
      } else {
          res.status(404).json({ error: "User not found" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
  return
  // Find document by id and updates with the required fields
  return res.status(200).json({
    success: false,
    result: null,
    message: 'You cant update client once is created',
  });
};

// module.exports = update;

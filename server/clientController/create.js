// const mongoose = require('mongoose');
// 
// const People = mongoose.model('People');
// const Company = mongoose.model('Company');

export const create = async (Model, req, res) => {
  // Creating a new document in the collection
 console.log("user created")
  try {
    const newUser = await Model.create(req.body);
    res.status(201).json(newUser);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
}
 
  return
    
      let client = await Model.findOne({
        company: req.body.company,
        removed: false,
      });

      if (client) {
        return res.status(403).json({
          success: false,
          result: null,
          message: 'Client Already Exist',
        });
      }
      let { name } = await Company.findOneAndUpdate(
        {
          _id: req.body.company,
          removed: false,
        },
        { isClient: true },
        {
          new: true, // return the new result instead of the old one
          runValidators: true,
        }
      ).exec();
      req.body.name = name;
      // req.body.people = undefined;
    

  

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result,
    message: 'Successfully Created the document in Model ',
  });
};

// module.exports = create;

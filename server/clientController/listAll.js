// const { migrate } = require('./migrate');

 export const listAll = async (Model, req, res) => {
  const sort = parseInt(req.query.sort) || 'desc';

  //  Query the database for a list of all results
  console.log("list all")
  try {
    const users = await Model.findAll();
    res.json(users);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
}

  return
  const result = await Model.find({
    removed: false,
  })
    .sort({ created: sort })
    .populate()
    .exec();

  // const migratedData = result.map((x) => migrate(x));
  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      result: result,
      message: 'Successfully found all documents',
    });
  } else {
    return res.status(203).json({
      success: true,
      result: [],
      message: 'Collection is Empty',
    });
  }
};

// module.exports = listAll;

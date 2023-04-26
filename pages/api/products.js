import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/product";

export async function findAllProducts() {
  return Product.find().exec();
}

export default async function handler(req, res) {
  await initMongoose();
  const { ids } = req.query;
  if (ids) {
    const idArray = ids.split(",");
    res.json(
      await Product.find({
        _id: { $in: idArray },
        // MongoDB query object that uses the $in operator(selects the documents where the value of a field equals any value in the specified array.) to find all documents with an _id field that matches one of the values in the idArray array
      }).exec()
    );
  } else {
    res.json(await findAllProducts());
  }
}

import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/product";

export default async function handler(req, res) {
  await initMongoose();
  Product;
  res.json(await Product.find().exec());
}

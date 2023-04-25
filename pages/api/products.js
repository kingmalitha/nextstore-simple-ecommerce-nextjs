import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/product";

export async function findAllProducts() {
  return Product.find().exec();
}

export default async function handler(req, res) {
  await initMongoose();
  Product;
  res.json(await findAllProducts);
}

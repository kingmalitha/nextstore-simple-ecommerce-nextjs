import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/product";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();
  if (req.method === "POST") {
    try {
      const productsIds = req.body.products.split(",");
      const uniqIds = [...new Set(productsIds)];
      const products = await Product.find({ _id: { $in: uniqIds } }).exec();

      let line_items = [];
      for (let productId of uniqIds) {
        const quantity = productsIds.filter((id) => id === productId).length;
        const product = products.find((p) => p.id.toString() === productId);
        line_items.push({
          quantity,
          price_data: {
            currency: "USD",
            product_data: { name: product.name },
            unit_amount: product.price * 100,
          },
        });
      }

      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// const checkoutHandler = async (req, res) => {
//   await initMongoose();

//   if (req.method !== "POST") {
//     res.body("Should be a POST request, but it is not").send();
//     return;
//   }

//   const productsIds = req.body.products.split(",");
//   const uniqIds = [...new Set(productsIds)];
//   const products = await Product.find({ _id: { $in: uniqIds } }).exec();

//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${req.headers.origin}/?success=true`,
//     cancel_url: `${req.headers.origin}/?canceled=true`,
//   });
//   res.redirect(303, session.url);
// };

// export default checkoutHandler;

import { buffer } from "micro";
import { initMongoose } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// localhost:3000/api/webhook
export default async function handler(req, res) {
  await initMongoose;
  const signingSecret =
    "whsec_322de9ac0a6a93f0849f94983ad890dbd633fc1433547f43fcd0d3175bf14f88";
  const payload = await buffer(req);
  const signature = req.headers["stripe-signature"];
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    signingSecret
  );

  if (event?.type == "checkout.session.completed") {
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId) {
      await Order.findByIdAndUpdate(metadata.orderId, { paid: 1 });
    }
  }

  res.json("ok");
}

export const config = {
  api: {
    bodyParser: false,
  },
};

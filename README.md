# NextStore

NextStore is a simple ecommerce app built with Next.js, MongoDB, and Stripe. It allows users to add items to their cart and checkout, with the ability to increase or decrease the quantity of their items.

![Skills used](https://skillicons.dev/icons?i=git,github,next,tailwind,mongodb,vercel,)

## 🔰Technologies Used

- **Next.js**: A React-based framework for building server-side rendered (SSR) web applications.
- **MongoDB**: A NoSQL database used to store product data.
- **Stripe**: A payment processing platform used for checkout.

## 🔰Features

- Search products across different categories
- Add products to cart
- Increase or decrease quantity of items in cart
- Checkout using Stripe

## 🔰Getting Started

To get started with NextStore, follow these steps:

1. Clone the repo: `git clone https://github.com/kingmalitha/nextstore-simple-ecommerce-nextjs.git`
2. Install dependencies: `npm install`
3. Configure environment variables:
   - Create a `.env` file in the root of the project
   - Add the following variables and their corresponding values:
     - `STRIPE_PUBLIC_KEY`: Your Stripe public key
     - `STRIPE_SECRET_KEY`: Your Stripe secret key
     - `STRIPE_SIGNNING_KEY`: Your Stripe signing key get by using Stripe CLI
     - `MONGODB_URI`: Your MongoDB URI
4. Start the development server: `npm run dev`
5. Open your browser and navigate to `http://localhost:3000`

## 🔰Screenshots

![Homepage](/public/github_markdown/homepage.png)

![Cart](/public/github_markdown/cart.png)

![Checkout](/public/github_markdown/checkout.png)

![Homepage](/public/github_markdown/homepage_after.png)

## 🔰Conclusion

NextStore is a simple ecommerce app that demonstrates the basics of building a functional online store using Next.js, MongoDB, and Stripe. With some additional features and improvements, it could be a great starting point for building a more advanced ecommerce site.

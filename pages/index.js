import Product from "@/components/Product";
import { initMongoose } from "@/lib/mongoose";
import { useState } from "react";
import { findAllProducts } from "./api/products";

/* eslint-disable @next/next/no-img-element */
export default function Home({ products }) {
  const [searchPharse, setSearchPharse] = useState("");

  //! Note: To remove duplicates, we use new Set()
  const categoriesNames = [
    ...new Set(products.map((product) => product.category)),
  ];

  if (searchPharse) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(searchPharse.toLowerCase())
    );
  }

  return (
    <div className="p-5 ">
      <input
        type="text"
        onChange={(e) => setSearchPharse(e.target.value)}
        placeholder="Search for Products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl "
      />
      <div>
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            {products.find((product) => product.category === categoryName) && (
              <div>
                <h2 className="text-2xl capitalize py-5">{categoryName}</h2>
                <div className="flex -mx-5 overflow-x-scroll snap-start scrollbar-hide">
                  {products
                    .filter((product) => product.category === categoryName)
                    .map((productInfo) => (
                      <div key={productInfo._id} className="px-5">
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="py-4"></div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

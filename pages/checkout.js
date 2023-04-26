/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { ProductContext } from "@/components/ProductContext";
import React, { useContext, useEffect, useState } from "react";

const CheckoutPage = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext);
  const [productsInfos, setProductsInfos] = useState([]);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch(`/api/products?ids=${uniqIds.join(",")}`)
      .then((response) => response.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);

  const moreOfThisProduct = (id) => {
    setSelectedProducts((prev) => [...prev, id]);
  };

  const lessOfThisProduct = (id) => {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      //pos => selecting the first element(occurance) with that id, it will be removing from newSelectedProducts array.
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  };

  const deliveryPrice = 5;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const product = productsInfos.find((p) => p._id === id);
      if (product) {
        subtotal += product.price;
      }
    }
  }
  const total = subtotal + deliveryPrice;

  return (
    <Layout>
      {!productsInfos.length && <div>no products in your shopping cart</div>}
      {productsInfos.length &&
        productsInfos.map((productInfo) => {
          const amount = selectedProducts.filter(
            (id) => id === productInfo._id
          ).length;
          if (amount == 0) return;
          return (
            <div key={productInfo._id} className="flex mb-5">
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img
                  className="w-24"
                  src={productInfo.picture}
                  alt="product-image"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{productInfo.name}</h3>
                <p className="text-sm leading-4 text-gray-500">
                  {productInfo.description}
                </p>
                <div className="flex">
                  <div className="grow">${productInfo.price}</div>
                  <div>
                    <button
                      onClick={() => lessOfThisProduct(productInfo._id)}
                      className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                    >
                      -
                    </button>
                    <span className="px-2">
                      {
                        selectedProducts.filter((id) => id === productInfo._id)
                          .length
                      }
                    </span>

                    <button
                      onClick={() => moreOfThisProduct(productInfo._id)}
                      className="bg-emerald-500 px-2 rounded-lg text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <form action="/api/checkout" method="POST">
        <div className="mt-4">
          <input
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Street address, number"
          />
          <input
            value={city}
            name="city"
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="City and postal code"
          />
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Your name"
          />
          <input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            placeholder="Email address"
          />
        </div>
        <div className="mt-4">
          <div className="flex my-3 ">
            <h3 className="grow font-bold text-gray-400">Subtotal: </h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
          <div className="flex my-3 ">
            <h3 className="grow font-bold text-gray-400">Delivery: </h3>
            <h3 className="font-bold">${deliveryPrice}</h3>
          </div>
          <div className="flex my-3b pt-3 border-t border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total: </h3>
            <h3 className="font-bold">${total}</h3>
          </div>
        </div>

        <input
          type="hidden"
          name="products"
          value={selectedProducts.join(",")}
        />
        <button
          type="submit"
          className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg"
        >
          Pay ${total}
        </button>
      </form>
    </Layout>
  );
};

export default CheckoutPage;

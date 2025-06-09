import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const SingleProduct = ({ selectedProduct, onClose, addToCart }) => {
  if (!selectedProduct) {
    return (
      <Card className="w-full max-w-3xl mx-auto h-[720px] flex flex-col justify-center items-center bg-gray-50">
        <CardContent>
          <p className="text-xl text-center text-gray-600">
            No product selected. Please select a product to view its details.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { name, price, inStock, type, imageUrl, description } = selectedProduct;

  return (
    <Card className="w-full max-w-3xl mx-auto h-[720px] flex flex-col bg-gray-50 shadow-lg overflow-hidden">
      <CardHeader className="flex-shrink-0">
        <div>
          <CardTitle className="text-3xl font-bold text-gray-800">
          {name}
          </CardTitle>
          <p className="text-2xl font-semibold mt-2 text-teal-500">
            ${(price / 100).toFixed(2)}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-sm text-red-500 hover:underline"
        >
          ✕ Close
        </button>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-6 overflow-y-auto">
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-full h-96 mb-6 overflow-hidden rounded-lg shadow-md cursor-pointer">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] w-fit max-h-[90vh] p-0">
            <DialogHeader className="p-6">
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader>
            <div className="overflow-hidden max-h-[calc(90vh-100px)]">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <span className="text-sm font-semibold text-gray-500 mr-2">
              Category:
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {type}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-semibold text-gray-500 mr-2">
              Status:
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        <button
          onClick={() => addToCart(selectedProduct)}
          disabled={!inStock}
          className={`mt-auto px-6 py-3 rounded-md font-semibold text-white transition-all ${
            inStock
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </CardContent>
    </Card>
  );
};

export default SingleProduct;

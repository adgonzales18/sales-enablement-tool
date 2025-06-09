import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { products } from "@/constants/products";

const categories = ["All", "Sofa", "Table", "Chair", "Decor", "Bed"];
const stockOptions = ["All", "In Stock"];
const sortOptions = [
  { value: "name", label: "Sort by Name" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
];

const Products = ({ handleSelectProduct, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [inStock, setInStock] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => category === "All" || product.type === category)
    .filter(
      (product) =>
        inStock === "All" || (inStock === "In Stock" && product.inStock)
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  const onSelect = (product) => {
    setSelectedProductId(product.id);
    handleSelectProduct(product);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto max-h-[720px] bg-gray-50 flex flex-col">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Products</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full "
        />
        <div className="flex mb-6 gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="flex-grow cursor-pointer">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="cursor-pointer">
                  {cat === "All" ? "All Categories" : `${cat}s`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={inStock} onValueChange={setInStock}>
            <SelectTrigger className="flex-grow cursor-pointer  ">
              <SelectValue placeholder="Stock" />
            </SelectTrigger>
            <SelectContent>
              {stockOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="cursor-pointer"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-grow cursor-pointer">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`flex flex-col items-center p-1 cursor-pointer ${
                selectedProductId === product.id
                  ? "border-4 border-teal-500 rounded-md"
                  : ""
              }`}
              onClick={() => onSelect(product)}
            >
              <div className="w-full aspect-square overflow-hidden rounded-lg mb-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-center">
                {product.name}
              </h3>
              <p className="text-md font-medium">
                ${(product.price / 100).toFixed(2)}
              </p>
              <Button
                variant={product.inStock ? "default" : "secondary"}
                size="sm"
                className="mt-2 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  if (product.inStock) {
                    addToCart(product);
                    }
                  }}
                          >
                {product.inStock ? "Add to Quote" : "Out of Stock"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Products;

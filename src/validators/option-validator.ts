import { PRODUCTS_PRICES } from "@/config/products";

export const COLORS = [
  {
    label: "Black",
    value: "black",
    tw: "zinc-900",
  },
  {
    label: "Rose",
    value: "rose",
    tw: "rose-900",
  },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-900",
  },
  {
    label: "Pink",
    value: "pink",
    tw: "pink-600",
  },
  {
    label: "Purple",
    value: "purple",
    tw: "purple-900",
  },
] as const;

export const MODELS = {
  name: "models",
  options: [
    {
      label: "iPhone 11",
      value: "iphone11",
    },
    {
      label: "iPhone 12",
      value: "iphone12",
    },
    {
      label: "iPhone 13",
      value: "iphone13",
    },
    {
      label: "iPhone 14",
      value: "iphone14",
    },
    {
      label: "iPhone 15",
      value: "iphone15",
    },
    {
      label: "iPhone 16",
      value: "iphone16",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCTS_PRICES.material.silicone,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCTS_PRICES.material.polycarbonate,
    },
  ],
} as const;
export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCTS_PRICES.finish.smooth,
    },
    {
      label: "Textured Finsh",
      value: "textured",
      description: "Soft-grippy texture",
      price: PRODUCTS_PRICES.finish.textured,
    },
  ],
} as const;

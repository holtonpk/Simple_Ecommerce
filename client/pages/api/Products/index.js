import { ProductData } from "../ProductData";

export default function handler(req, res) {
  res.status(200).json(ProductData);
}

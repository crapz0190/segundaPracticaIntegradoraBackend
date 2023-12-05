import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const cartCollection = "Carts";

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
        required: true,
      },
      _id: false,
    },
  ],
});

cartSchema.plugin(paginate);

export const cartsModel = model(cartCollection, cartSchema);

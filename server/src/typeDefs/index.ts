import { mergeTypeDefs } from "@graphql-tools/merge";
import imageSchema from "./image.schema";
import cartSchema from "./cart.schema";
import categorySchema from "./category.schema";
import detailsUserSchema from "./detailsUser.schema";
import itemSchema from "./item.schema";
import productSchema from "./product.schema";
import userSchema from "./user.schema";
import sessionSchema from "./session.schema";

export default mergeTypeDefs([imageSchema, cartSchema, categorySchema, detailsUserSchema, itemSchema, productSchema, userSchema, sessionSchema]);
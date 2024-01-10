import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Cart = {
  __typename?: 'Cart';
  creation_date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  items?: Maybe<Array<Maybe<Item>>>;
  state?: Maybe<Scalars['String']>;
};

export type CartRegister = {
  creation_date: Scalars['Date'];
  state: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['ID']>;
  imageUrl?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type CategoryRegister = {
  imageUrl: Scalars['String'];
  label: Scalars['String'];
};

export type DetailsUser = {
  __typename?: 'DetailsUser';
  address?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastname?: Maybe<Scalars['String']>;
};

export type DetailsUserRegister = {
  address: Scalars['String'];
  birthday: Scalars['Date'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type FullItem = {
  __typename?: 'FullItem';
  cart?: Maybe<Cart>;
  due_rent_date: Scalars['Date'];
  id: Scalars['ID'];
  isFavorite: Scalars['Boolean'];
  product?: Maybe<ProductInfo>;
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
  start_rent_date: Scalars['Date'];
};

export type Image = {
  __typename?: 'Image';
  id?: Maybe<Scalars['ID']>;
  isMain?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
};

export type ImageInput = {
  isMain?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ImageRegister = {
  isMain: Scalars['Boolean'];
  name: Scalars['String'];
  product: ProductImageInput;
};

export type ImageUpdateMain = {
  id: Scalars['ID'];
  isMain: Scalars['Boolean'];
};

export type Item = {
  __typename?: 'Item';
  cart?: Maybe<Cart>;
  due_rent_date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  isFavorite?: Maybe<Scalars['Boolean']>;
  productId?: Maybe<Scalars['ID']>;
  quantity?: Maybe<Scalars['Int']>;
  start_rent_date?: Maybe<Scalars['Date']>;
};

export type ItemRegister = {
  due_rent_date?: InputMaybe<Scalars['Date']>;
  isFavorite?: InputMaybe<Scalars['Boolean']>;
  productId: Scalars['String'];
  quantity?: InputMaybe<Scalars['Int']>;
  start_rent_date?: InputMaybe<Scalars['Date']>;
};

export type LoginInfo = {
  __typename?: 'LoginInfo';
  email?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCart?: Maybe<Cart>;
  addCategory?: Maybe<Category>;
  addImage?: Maybe<Image>;
  addItem?: Maybe<Item>;
  addProductWithImages?: Maybe<Product>;
  addUser?: Maybe<User>;
  deleteCart?: Maybe<Cart>;
  deleteCategory?: Maybe<Category>;
  deleteImage?: Maybe<Image>;
  deleteItem?: Maybe<Item>;
  deleteProduct?: Maybe<Product>;
  deleteUser?: Maybe<User>;
  updateCart?: Maybe<Cart>;
  updateCategory?: Maybe<Category>;
  updateDetailsUser?: Maybe<DetailsUser>;
  updateImageMainStatus?: Maybe<Image>;
  updateItem?: Maybe<Item>;
  updateProduct?: Maybe<Product>;
  updateUser?: Maybe<User>;
};


export type MutationAddCartArgs = {
  infos: CartRegister;
};


export type MutationAddCategoryArgs = {
  infos: CategoryRegister;
};


export type MutationAddImageArgs = {
  infos: ImageRegister;
};


export type MutationAddItemArgs = {
  infos: ItemRegister;
};


export type MutationAddProductWithImagesArgs = {
  infos: ProductRegister;
};


export type MutationAddUserArgs = {
  infos: UserRegister;
};


export type MutationDeleteCartArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCartArgs = {
  id: Scalars['ID'];
  infos: CartRegister;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID'];
  infos: CategoryRegister;
};


export type MutationUpdateDetailsUserArgs = {
  id: Scalars['ID'];
  infos: DetailsUserRegister;
};


export type MutationUpdateImageMainStatusArgs = {
  infos: ImageUpdateMain;
  productId: Scalars['ID'];
};


export type MutationUpdateItemArgs = {
  id: Scalars['ID'];
  infos: ItemRegister;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID'];
  infos: ProductRegister;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  infos: UserRegister;
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<Maybe<Image>>>;
  isAvailable?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['String']>;
  stock?: Maybe<Scalars['Int']>;
};

export type ProductImageInput = {
  id: Scalars['ID'];
};

export type ProductInfo = {
  __typename?: 'ProductInfo';
  name: Scalars['String'];
  price: Scalars['Int'];
};

export type ProductRegister = {
  category?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  images?: InputMaybe<Array<InputMaybe<ImageInput>>>;
  isAvailable?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  size: Scalars['String'];
  stock: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  checkAdmin?: Maybe<Scalars['Boolean']>;
  checkSession?: Maybe<Array<Maybe<Item>>>;
  checkToken?: Maybe<Scalars['Boolean']>;
  getDetailsUserConnected?: Maybe<DetailsUser>;
  getFullCart?: Maybe<Array<Maybe<FullItem>>>;
  getImagesByProduct?: Maybe<Array<Maybe<Image>>>;
  getListCategories?: Maybe<Array<Maybe<Category>>>;
  getListItems?: Maybe<Array<Maybe<Item>>>;
  getListProducts?: Maybe<Array<Maybe<Product>>>;
  getListProductsByCategory?: Maybe<Array<Maybe<Product>>>;
  getProductById?: Maybe<Product>;
  login?: Maybe<LoginInfo>;
};


export type QueryGetImagesByProductArgs = {
  productId: Scalars['ID'];
};


export type QueryGetListProductsByCategoryArgs = {
  categoryLabel: Scalars['String'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['ID'];
};


export type QueryLoginArgs = {
  infos: UserLogin;
};

export type Session = {
  __typename?: 'Session';
  cartId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  detailsUser?: Maybe<DetailsUser>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['String']>;
};

export type UserLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserRegister = {
  email: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Cart: ResolverTypeWrapper<Cart>;
  CartRegister: CartRegister;
  Category: ResolverTypeWrapper<Category>;
  CategoryRegister: CategoryRegister;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DetailsUser: ResolverTypeWrapper<DetailsUser>;
  DetailsUserRegister: DetailsUserRegister;
  FullItem: ResolverTypeWrapper<FullItem>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  ImageInput: ImageInput;
  ImageRegister: ImageRegister;
  ImageUpdateMain: ImageUpdateMain;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Item: ResolverTypeWrapper<Item>;
  ItemRegister: ItemRegister;
  LoginInfo: ResolverTypeWrapper<LoginInfo>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  ProductImageInput: ProductImageInput;
  ProductInfo: ResolverTypeWrapper<ProductInfo>;
  ProductRegister: ProductRegister;
  Query: ResolverTypeWrapper<{}>;
  Session: ResolverTypeWrapper<Session>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserLogin: UserLogin;
  UserRegister: UserRegister;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Cart: Cart;
  CartRegister: CartRegister;
  Category: Category;
  CategoryRegister: CategoryRegister;
  Date: Scalars['Date'];
  DetailsUser: DetailsUser;
  DetailsUserRegister: DetailsUserRegister;
  FullItem: FullItem;
  ID: Scalars['ID'];
  Image: Image;
  ImageInput: ImageInput;
  ImageRegister: ImageRegister;
  ImageUpdateMain: ImageUpdateMain;
  Int: Scalars['Int'];
  Item: Item;
  ItemRegister: ItemRegister;
  LoginInfo: LoginInfo;
  Mutation: {};
  Product: Product;
  ProductImageInput: ProductImageInput;
  ProductInfo: ProductInfo;
  ProductRegister: ProductRegister;
  Query: {};
  Session: Session;
  String: Scalars['String'];
  User: User;
  UserLogin: UserLogin;
  UserRegister: UserRegister;
};

export type CartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  creation_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DetailsUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['DetailsUser'] = ResolversParentTypes['DetailsUser']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FullItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['FullItem'] = ResolversParentTypes['FullItem']> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  due_rent_date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isFavorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['ProductInfo']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  start_rent_date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isMain?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  due_rent_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  productId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  start_rent_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginInfo'] = ResolversParentTypes['LoginInfo']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationAddCartArgs, 'infos'>>;
  addCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'infos'>>;
  addImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<MutationAddImageArgs, 'infos'>>;
  addItem?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<MutationAddItemArgs, 'infos'>>;
  addProductWithImages?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationAddProductWithImagesArgs, 'infos'>>;
  addUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'infos'>>;
  deleteCart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationDeleteCartArgs, 'id'>>;
  deleteCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deleteImage?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<MutationDeleteImageArgs, 'id'>>;
  deleteItem?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'id'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateCart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationUpdateCartArgs, 'id' | 'infos'>>;
  updateCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'id' | 'infos'>>;
  updateDetailsUser?: Resolver<Maybe<ResolversTypes['DetailsUser']>, ParentType, ContextType, RequireFields<MutationUpdateDetailsUserArgs, 'id' | 'infos'>>;
  updateImageMainStatus?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType, RequireFields<MutationUpdateImageMainStatusArgs, 'infos' | 'productId'>>;
  updateItem?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'id' | 'infos'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'id' | 'infos'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'infos'>>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  isAvailable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductInfo'] = ResolversParentTypes['ProductInfo']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  checkAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  checkSession?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  checkToken?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  getDetailsUserConnected?: Resolver<Maybe<ResolversTypes['DetailsUser']>, ParentType, ContextType>;
  getFullCart?: Resolver<Maybe<Array<Maybe<ResolversTypes['FullItem']>>>, ParentType, ContextType>;
  getImagesByProduct?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType, RequireFields<QueryGetImagesByProductArgs, 'productId'>>;
  getListCategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  getListItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  getListProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  getListProductsByCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, RequireFields<QueryGetListProductsByCategoryArgs, 'categoryLabel'>>;
  getProductById?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryGetProductByIdArgs, 'productId'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginInfo']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'infos'>>;
};

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  cartId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  detailsUser?: Resolver<Maybe<ResolversTypes['DetailsUser']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Cart?: CartResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DetailsUser?: DetailsUserResolvers<ContextType>;
  FullItem?: FullItemResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  LoginInfo?: LoginInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductInfo?: ProductInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


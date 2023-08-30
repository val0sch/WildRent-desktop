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
  creation_date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CartRegister = {
  creation_date: Scalars['String'];
  state: Scalars['String'];
  user: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['String']>;
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
  birthday?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
};

export type DetailsUserRegister = {
  address: Scalars['String'];
  birthday: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
};

export type ImageRegister = {
  isMain?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  product: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  cart?: Maybe<Cart>;
  due_rent_date?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  isFavorite?: Maybe<Scalars['Boolean']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']>;
  start_rent_date?: Maybe<Scalars['Date']>;
};

export type ItemRegister = {
  cart?: InputMaybe<Scalars['String']>;
  due_rent_date?: InputMaybe<Scalars['Date']>;
  isFavorite?: InputMaybe<Scalars['Boolean']>;
  product?: InputMaybe<Scalars['String']>;
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
  addProduct?: Maybe<Product>;
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


export type MutationAddProductArgs = {
  infos: ProductRegister;
};


export type MutationAddUserArgs = {
  infos: UserRegister;
};


export type MutationDeleteCartArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['String'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCartArgs = {
  id: Scalars['String'];
  infos: CartRegister;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String'];
  infos: CategoryRegister;
};


export type MutationUpdateDetailsUserArgs = {
  id: Scalars['String'];
  infos: DetailsUserRegister;
};


export type MutationUpdateItemArgs = {
  id: Scalars['String'];
  infos: ItemRegister;
};


export type MutationUpdateProductArgs = {
  id: Scalars['String'];
  infos: ProductRegister;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  infos: UserRegister;
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isAvailable?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['String']>;
  stock?: Maybe<Scalars['Int']>;
};

export type ProductRegister = {
  category?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  isAvailable?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  size: Scalars['String'];
  stock: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  carts?: Maybe<Array<Maybe<Cart>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  checkAdmin?: Maybe<Scalars['Boolean']>;
  checkToken?: Maybe<Scalars['Boolean']>;
  detailsConnectUser?: Maybe<DetailsUser>;
  detailsUsers?: Maybe<Array<Maybe<DetailsUser>>>;
  images?: Maybe<Array<Maybe<Image>>>;
  items?: Maybe<Array<Maybe<Item>>>;
  login?: Maybe<LoginInfo>;
  product?: Maybe<Product>;
  products?: Maybe<Array<Maybe<Product>>>;
  productsByCategory?: Maybe<Array<Maybe<Product>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryLoginArgs = {
  infos: UserLogin;
};


export type QueryProductArgs = {
  productId: Scalars['String'];
};


export type QueryProductsByCategoryArgs = {
  categoryLabel: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  detailsUser?: Maybe<DetailsUser>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
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
  Image: ResolverTypeWrapper<Image>;
  ImageRegister: ImageRegister;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Item: ResolverTypeWrapper<Item>;
  ItemRegister: ItemRegister;
  LoginInfo: ResolverTypeWrapper<LoginInfo>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  ProductRegister: ProductRegister;
  Query: ResolverTypeWrapper<{}>;
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
  Image: Image;
  ImageRegister: ImageRegister;
  Int: Scalars['Int'];
  Item: Item;
  ItemRegister: ItemRegister;
  LoginInfo: LoginInfo;
  Mutation: {};
  Product: Product;
  ProductRegister: ProductRegister;
  Query: {};
  String: Scalars['String'];
  User: User;
  UserLogin: UserLogin;
  UserRegister: UserRegister;
};

export type CartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  creation_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DetailsUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['DetailsUser'] = ResolversParentTypes['DetailsUser']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isMain?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  due_rent_date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
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
  addProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationAddProductArgs, 'infos'>>;
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
  updateItem?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'id' | 'infos'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'id' | 'infos'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'infos'>>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAvailable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  carts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Cart']>>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoryArgs, 'id'>>;
  checkAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  checkToken?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  detailsConnectUser?: Resolver<Maybe<ResolversTypes['DetailsUser']>, ParentType, ContextType>;
  detailsUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['DetailsUser']>>>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['Image']>>>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  login?: Resolver<Maybe<ResolversTypes['LoginInfo']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'infos'>>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'productId'>>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  productsByCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, RequireFields<QueryProductsByCategoryArgs, 'categoryLabel'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  detailsUser?: Resolver<Maybe<ResolversTypes['DetailsUser']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Cart?: CartResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DetailsUser?: DetailsUserResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  LoginInfo?: LoginInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


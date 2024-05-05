import { type } from 'os';

export type SignIn = {
    email: string;
    password: string;
};
export type SignUp = {
    email: string;
    fullName: string;
    password: string;
    birthDay: string;
};

export type User = {
    _id: string;
    fullName: string;
    email: string;
    gender: string;
    birthDay: string;
    phone: string;
    avatar: string;
};

export type upUser = {
    user: string;
    email: string;
    fullName: string;
    birthDay: string;
    phone: string;
};

export type updatePassword = {
    user: string;
    oldPass: string;
    newPass: string;
};
export type updateEmail = {
    userId: string;
    newEmail: string;
};

export type Category = {
    _id?: string;
    name: string;
    img: string;
    total: number;
};

export type Product = {
    _id: string;
    name: string;
    images: string[];
    image: string;
    desc: string;
    category: Category;
    brand: string;
    price: number;
    rating?: number;
    sold?: number;
    status?: string;
    variant: Variant;
    isStock?: boolean;
    isFavorite: boolean;
};

export type Variant = {
    listColor: detailVariant[];
    listSize: string[];
};

export type detailVariant = {
    color: string;
    hex: string;
    image: string;
};

export type Address = {
    _id?: string;
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
    default?: boolean;
};

export type AddressLess = {
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
};

export type UpdateAddress = {
    address: string;
    user: string;
    receiver: string;
    phone: string;
    province: string;
    districts: string;
    wards: string;
    specific: string;
};

export type ItemCart = {
    product: string;
    image: string;
    name: string;
    color: string;
    hex: string;
    size: string;
    quantity: number;
    price: number;
    selected?: boolean;
};

export type Cart = {
    _id?: string;
    user: string;
    total: number;
    items: ItemCart[];
};

export type Order = {
    _id: string;
    items: ItemCart[];
    user: string;
    deliveryAddress: Address;
    paymentMethod: string;
    total: number;
    status?: string;
    isPaid?: boolean;
    isDelivered?: boolean;
};
export type checkoutOrder = {
    items: ItemCart[];
    userID: string;
    deliveryAddress: string;
    paymentMethod: string;
    total: number;
};

export type RemoveItemCart = {
    user: string;
    product: string;
};

export type updateOrder = {
    order: string;
    status: string;
};

export type upAvatar = {
    img: string;
    user: string;
};

export type getSizeOfColor = {
    id: string;
    color: string;
};

export type variantColor = {
    size: string;
    quantity: number;
};

export type Brand = {
    brand: string;
    quantity: number;
};

export type itemCartRandomVari = {
    product: string;
    image: string;
    name: string;
    price: number;
};

export type productByCate = {
    category: string;
    sort: string;
    brand: string;
    color: string;
    pageNumber: number;
};

export type findProduct = {
    keyword: string;
    sort: string;
    brand: string;
    color: string;
    pageNumber: number;
};

export type orderStatus = {
    status: string;
    user: string;
};

export type RVariant = {
    color: string;
    hex: string;
    image: string;
    size: string;
    quantity: number;
};

export type Comment = {
    _id: string;
    commentator: Commentator;
    product: string;
    rating: number;
    like: number;
    images: string;
};
export type Commentator = {
    _id: string;
    fullName: string;
    avatar: string;
};
export type Coupon = {
    _id: string;
    code: string;
    name: string;
    value: number;
    type: string;
    maxDiscount: number;
    minAmount: number;
    validityDuration: 10;
    startDate: string;
    endDate: string;
};

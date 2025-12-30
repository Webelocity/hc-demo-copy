type Order = {
    _id: string;
    GUID: number;
    reducedId: string;
    userId: string;
    refunds: any[];
    shipmentId: string;
    orderType: string;
    orderStatus: string;
    items: OrderItem[];
    bundles: any[];
    subTotal: number;
    isTaxable: boolean;
    tax: number;
    shippingCost: number;
    deliveryCost: number;
    grandTotal: number;
    discountedAmount: number;
    storeId: string;
    orderTimeLine: OrderTimelineEntry[];
    userData: UserData;
    discountsApplied: any[];
    inventoryAddress: InventoryAddress;
    orderRemindingDates: (string | null)[];
    customProducts: any[];
    customItems: any[];
    paymentIntentId: string | null;
    invoiceDueDate: string;
    totalWeight: number;
    totalWidth: number;
    totalHeight: number;
    totalLength: number;
    isInventoryReduced: boolean;
    createdAt: string;
    updatedAt: string;
    shippingCost: number;
    shippingCostBase: number;
    shippingTax: number;
    deliveryCost: number;
    deliveryCostBase: number;
    deliveryTax: number;
    grandTotal: number;
    __v: number;
    payment: Record<string, unknown> | null;
    shipments: Shipment[];
};

type OrderItem = {
    productVariantData: ProductVariantData;
    quantity: number;
    productVariantId: string;
    trackQuantity: boolean;
    customInputValues: any[];
    customInputFields: any[];
    calculatedPrice: number;
    isFinalSale: boolean;
    fulfillmentMethod: string; // e.g. "shipping"
};

type ProductVariantData = {
    _id: string;
    parentProduct: string;
    storeId: string;
    name: string;
    description: string;
    productMedia: any[];
    isActive: boolean;
    width: number;
    height: number;
    length: number;
    weight: number;
    sku: string;
    upc: string;
    attribute: Record<string, string>; // e.g. { "Shorts Size": "36 R" }
    isDiscounted: boolean;
    discountAmount: number;
    discountPercent: number;
    discounts: any[];
    retailPrice: number;
    costPrice: number;
    finalPrice: number;
    totalSold: number;
    allowPro: boolean;
    isVariantBulkPriced: boolean;
    tax: boolean;
    parentCategories: string[];
    parentSubCategories: string[];
    supportedFulfillmentMethods: string[]; // ["pickup","delivery","shipping"]
    GUID: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    parentGUID: number;
};

type OrderTimelineEntry = {
    title: string; // e.g. "On Hold"
    date: string;
    type: string; // e.g. "orderStatus"
    _id: string;
};

type UserData = {
    _id: string;
    GUID: number;
    firstname: string;
    lastname: string;
    email: string;
    isEmailVerified: boolean;
    role: string;
    phoneNumber: string;
    storeId: string;
    stores: string[];
    customerType: string; // e.g. "Regular"
    adminStores: string[];
    isEmailNotifActive: boolean;
    isSmsNotifActive: boolean;
    alertOnUserRegistration: boolean;
    alertOnOrderCreation: boolean;
    alertOnOrderDelivery: boolean;
    alertOnNewReview: boolean;
    isActive: boolean;
    isBlocked: boolean;
    isTaxExempted: boolean;
    country: string;
    availableCreditBalance: number;
    availableDebitBalance: number;
    creditLimit: number;
    isAllowedtToUseCredit: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    creditUsed: number;
    fullName: string;
    id: string;
    groups: string[];
    city: string;
    addresses: UserAddress[];
    ordersCount: number;
    totalSpent: number;
};

type UserAddress = {
    _id: string;
    user: string;
    store: string | null;
    companyId: string | null;
    name: string;
    phone: string;
    email: string;
    street1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isDefault: boolean;
    isResidential: boolean;
    latitude: number;
    longitude: number;
    addressType: "Billing" | "Shipping" | "Both" | string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
};

type InventoryAddress = {
    _id: string;
    user: string | null;
    store: string;
    name: string;
    phone: string;
    company: string;
    email: string;
    street1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isDefault: boolean;
    isResidential: boolean;
    latitude: number;
    longitude: number;
    addressType: "Both" | "Billing" | "Shipping" | string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

type Shipment = {
    _id: string;
    inventoryAddress: InventoryAddress;
    rate: ShipmentRate;
    shipmentStatus: string; // e.g. "internal only"
    shippingAddress: UserAddress;
    totalWeight: number;
};

type ShipmentRate = {
    objectId: string;
    carrierCode: string | null;
    serviceCode: string | null;
    provider: string; // e.g. "USPS"
    providerImage200: string;
};

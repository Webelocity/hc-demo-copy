export type SavedAddress = {
    id: string;
    label: string;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    streetAddress2?: string;
    zipCode: string;
    createdAt: string;
    updatedAt: string;
};

export type AddressSelectionValue = {
    shipping: SavedAddress | null;
    billing: SavedAddress | null;
    billingSameAsShipping: boolean;
};

export type CheckoutSelectedAddresses = {
    shipping: SavedAddress;
    billing: SavedAddress;
    billingSameAsShipping: boolean;
};



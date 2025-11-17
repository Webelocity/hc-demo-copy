type SavedAddress = {
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

type AddressSelectionValue = {
    shipping: SavedAddress | null;
    billing: SavedAddress | null;
    billingSameAsShipping: boolean;
};

type CheckoutSelectedAddresses = {
    shipping: SavedAddress;
    billing: SavedAddress;
    billingSameAsShipping: boolean;
};

type AddressFormValues = {
    label: string;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    streetAddress2?: string;
    zipCode: string;
};


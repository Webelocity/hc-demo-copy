export type StoreId =
  | "685a6dac1e47caf847ec4d9e"
  | "69142c70e1597ae70a5390d7"
  | "69142c80e1597ae70a5390d8"
  | "owego-showroom";

export type StoreLocation = {
  id: StoreId;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  fax?: string;
  fullAddress: string;
  lat: number;
  lng: number;
  gmapLink?: string;
};

export const DEFAULT_STORE_ID: StoreId = "685a6dac1e47caf847ec4d9e";

export interface DaySchedule {
  open: string;
  close: string;
  closed?: boolean;
}

export interface StoreSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export const STORES: Record<StoreId, StoreLocation> = {
  "69142c80e1597ae70a5390d8": {
    id: "69142c80e1597ae70a5390d8",
    name: "Vestal Store",
    address: "199 Stage Rd.",
    city: "Vestal",
    state: "NY",
    zip: "13850",
    phone: "(607) 785-3307",
    fax: "(607) 785-3538",
    fullAddress: "199 Stage Rd. Vestal, NY 13850",
    lat: 42.08759358290779,
    lng: -76.05341079108524,
    gmapLink: 'https://maps.app.goo.gl/ppAwPT6HT8kngzq66'
  },
  "69142c70e1597ae70a5390d7": {
    id: "69142c70e1597ae70a5390d7",
    name: "Candor Store",
    address: "309 Owego Rd.",
    city: "Candor",
    state: "NY",
    zip: "13743",
    phone: "(607) 659-4205",
    fullAddress: "309 Owego Rd. Candor, NY 13743",
    lat: 42.21814148544821,
    lng: -76.32937882477931,
    gmapLink: 'https://maps.app.goo.gl/THTC8MnAdF9Xxy2J7'
  },
  "685a6dac1e47caf847ec4d9e": {
    id: "685a6dac1e47caf847ec4d9e",
    name: "Owego Store",
    address: "151 Central Ave.",
    city: "Owego",
    state: "NY",
    zip: "13827",
    phone: "(607) 687-3284",
    fax: "(607) 687-5301",
    fullAddress: "151 Central Ave. Owego, NY 13827",
    lat: 42.10680465663656,
    lng: -76.26674955982054,
    gmapLink: 'https://share.google/7GYdd6jSGa7HvXLb0'
  },
  "owego-showroom": {
    id: "owego-showroom",
    name: "Owego Showroom",
    address: "133 Central Ave.",
    city: "Owego",
    state: "NY",
    zip: "13827",
    phone: "(607) 223-2360",
    fullAddress: "133 Central Ave. Owego, NY 13827",
    lat: 42.1064079,
    lng: -76.2670105,
    gmapLink: 'https://maps.app.goo.gl/noiJnK6aACoAjGC97'
  },
};

// Store schedules - assuming same hours for all stores (Open until 6:00 PM)
export const STORE_SCHEDULES: Record<StoreId, StoreSchedule> = {
  "69142c80e1597ae70a5390d8": {
    monday: { open: "07:30", close: "19:00" },
    tuesday: { open: "07:30", close: "19:00" },
    wednesday: { open: "07:30", close: "19:00" },
    thursday: { open: "07:30", close: "19:00" },
    friday: { open: "07:30", close: "19:00" },
    saturday: { open: "07:30", close: "17:00" },
    sunday: { open: "09:00", close: "15:00" },
  },
  "69142c70e1597ae70a5390d7": {
    monday: { open: "07:30", close: "19:00" },
    tuesday: { open: "07:30", close: "19:00" },
    wednesday: { open: "07:30", close: "19:00" },
    thursday: { open: "07:30", close: "19:00" },
    friday: { open: "07:30", close: "19:00" },
    saturday: { open: "07:30", close: "17:00" },
    sunday: { open: "09:00", close: "15:00" },
  },
  "685a6dac1e47caf847ec4d9e": {
    monday: { open: "07:30", close: "19:00" },
    tuesday: { open: "07:30", close: "19:00" },
    wednesday: { open: "07:30", close: "19:00" },
    thursday: { open: "07:30", close: "19:00" },
    friday: { open: "07:30", close: "19:00" },
    saturday: { open: "07:30", close: "17:00" },
    sunday: { open: "09:00", close: "15:00" },
  },
  "owego-showroom": {
    monday: { open: "09:00", close: "17:00" },
    tuesday: { open: "09:00", close: "17:00" },
    wednesday: { open: "09:00", close: "17:00" },
    thursday: { open: "09:00", close: "17:00" },
    friday: { open: "09:00", close: "17:00" },
    saturday: { open: "09:00", close: "15:00" },
    sunday: { closed: true, open: "00:00", close: "00:00" },
  },
};

function isStoreId(value: string): value is StoreId {
  return Object.prototype.hasOwnProperty.call(STORES, value);
}

export function normalizeStoreId(
  storeId: StoreId | string | null | undefined
): StoreId {
  if (!storeId) {
    return DEFAULT_STORE_ID;
  }

  if (isStoreId(storeId)) {
    return storeId;
  }

  return DEFAULT_STORE_ID;
}

// Helper function to get current day of week
function getCurrentDayOfWeek(): keyof StoreSchedule {
  const days: (keyof StoreSchedule)[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[new Date().getDay()];
}

// Helper function to convert time string to minutes since midnight
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Helper function to format time in 12-hour format
export function formatTime12Hour(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

// Get store status and closing time
export interface StoreStatus {
  isOpen: boolean;
  closingTime: string; // formatted time
  openingTime?: string; // formatted time, if closed
  isClosed24Hours: boolean; // true if store is closed all day
}

export function getStoreStatus(storeId: StoreId | string): StoreStatus {
  const normalizedStoreId = normalizeStoreId(storeId);
  const schedule = STORE_SCHEDULES[normalizedStoreId];
  const today = getCurrentDayOfWeek();
  const daySchedule = schedule[today];

  // Check if store is closed all day
  if (daySchedule.closed) {
    return {
      isOpen: false,
      closingTime: "",
      isClosed24Hours: true,
    };
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = timeToMinutes(daySchedule.open);
  const closeMinutes = timeToMinutes(daySchedule.close);

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    closingTime: formatTime12Hour(daySchedule.close),
    openingTime: formatTime12Hour(daySchedule.open),
    isClosed24Hours: false,
  };
}

// Get all stores as an array
export function getAllStores(): StoreLocation[] {
  return Object.values(STORES);
}

// Get store by ID
export function getStoreById(storeId: StoreId | string): StoreLocation {
  const normalizedStoreId = normalizeStoreId(storeId);
  const store = STORES[normalizedStoreId];

  // Safety check: ensure the store exists
  if (!store) {
    console.error(
      `Store ID "${storeId}" not found in stores. Available stores:`,
      Object.keys(STORES)
    );
    // Return the default store as fallback
    return STORES[DEFAULT_STORE_ID];
  }

  return store;
}

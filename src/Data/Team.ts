export interface TeamMember {
  id: number;
  name: string;
  position: string;
  phone: string;
  email?: string;
  category:
    | "Ownership"
    | "General Manager"
    | "Office Manager"
    | "Purchasing"
    | "Accounting"
    | "IT"
    | "Sales";
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Aaron Gowan",
    position: "Owner",
    phone: "607-687-3284",
    category: "Ownership",
  },
  {
    id: 2,
    name: "Ben Whittemore",
    position: "Owner / President",
    phone: "607-687-3284",
    category: "Ownership",
  },
  {
    id: 3,
    name: "Ryan Rennells",
    position: "General Manager",
    phone: "607-687-3284",
    category: "General Manager",
  },
  {
    id: 4,
    name: "Sam Robinson",
    position: "Office Manager",
    phone: "607-953-9031",
    category: "Office Manager",
  },
  {
    id: 5,
    name: "Ed Smith",
    position: "Purchasing",
    phone: "607-687-3284",
    category: "Purchasing",
  },
  {
    id: 6,
    name: "Ann Burch",
    position: "Purchasing",
    phone: "607-687-3284",
    category: "Purchasing",
  },
  {
    id: 7,
    name: "Wanda Russell",
    position: "Accounts Receivable",
    phone: "607-687-3284",
    category: "Accounting",
  },
  {
    id: 8,
    name: "Savannah Blakeslee",
    position: "Accounts Payable",
    phone: "607-687-3284",
    category: "Accounting",
  },
  {
    id: 9,
    name: "Travis Wheeler",
    position: "IT",
    phone: "607-687-3284",
    category: "IT",
  },
  {
    id: 10,
    name: "Erica Carne",
    position: "Manager - Owego",
    phone: "607-687-3284",
    category: "Sales",
  },
  {
    id: 11,
    name: "Darrel Conklin",
    position: "Manager - Candor",
    phone: "607-659-4205",
    category: "Sales",
  },
  {
    id: 12,
    name: "Nick Lane",
    position: "Manager - Vestal",
    phone: "607-785-3307",
    category: "Sales",
  },
  {
    id: 13,
    name: "Alicia Cerretani",
    position: "Manager - Showroom",
    phone: "607-223-2360",
    category: "Sales",
  },
  {
    id: 14,
    name: "Adam Hall",
    position: "Outside Sales",
    phone: "607-744-0112",
    category: "Sales",
  },
  {
    id: 15,
    name: "Evan MacDonald",
    position: "Sales",
    phone: "607-785-3307",
    category: "Sales",
  },
];

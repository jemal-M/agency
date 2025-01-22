export interface Expense {
  id?: number;              // Optional primary key
  category: string;         // Category of the expense
  amount: string;           // Amount of the expense
  source: string;           // Source of the expense
  date: Date;               // Date of the expense
  createdAt?: Date | null;  // Optional creation date
  updatedAt?: Date | null;  // Optional update date
}
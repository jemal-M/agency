type Role = "ADMIN" | "EMPLOYEE" | "PARTNER"; // Adjust based on your actual Role enum values

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  startDate?: Date|null; 
  department?: string | null; 
  position?: string; 
  salary?: number | null; 
  role: Role;  
}
 
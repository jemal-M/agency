export interface CandidateData {
  id?:string|undefined;
    // step1
    firstName: string;
    secondName: string;
    lastName: string;
    phone: string;
    passportNumber: string;
    relativeName: string;
    relativePhone: string;
    address: string;
    maritalStatus: string; // or any other relevant marital status options
    educationLevel: string;
    experience: string;
    country: string;
    birthplace: string;
    medical: string; // Assuming the file will be uploaded (or null if not)
    branch:string;
    hasCoc:string;
    sex:string;
    embassy:string;
    lmis:string;
    // step 2
    year: string;
    period: string;
    religion: string;
    monthly_salary: string;
    contract_period: string;
    nationality: string;
    height: string;
    weight: string;
    hairColor:string;
    eyeColor:string;
    languages: string[]; // Array of strings representing languages
    skills: {
      childrenCare: boolean;
      cleaning: boolean;
      eldersCare: boolean;
      washing: boolean;
      ironing: boolean;
      cooking: boolean;
    };
  
    // step 3
    issueDate: string;
    expiryDate: string;
    dob: string;
    cocFile:File |null;
    passport: File | null; // Assuming the file will be uploaded (or null if not)
    photo_3_X_4: File | null; // Assuming the file will be uploaded (or null if not)
    photo_10_X_15: File | null; // Assuming the file will be uploaded (or null if not)
    self_id_card: File | null; // Assuming the file will be uploaded (or null if not)
    id_of_relative: File | null; // Assuming the file will be uploaded (or null if not)
    remarks: string;
    relative:string;
  }
  
  
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios"
import { CandidateData } from "@/types/candidateData";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { registerCandidateRequest, reregisterCandidateState } from "@/lib/reducers/candidateReducer";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";
import { LanguageSelector } from "../languageSelector/LanguageSelector";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default function RegisterCandidate() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<any>({});  // Error state to store form-specific error messages
  const status = useAppSelector((state) => state.candidate.status);
  const error = useAppSelector((state) => state.candidate.error);
  const candidateCreated = useAppSelector((state) => state.candidate.candidateCreated);

  const { toast } = useToast()
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState<CandidateData>({
    // step1
    firstName: "",
    lastName: "",
    secondName: "",
    phone: "",
    lmis:"",
    embassy:"",
    passportNumber: "",
    relativeName: "",
    relativePhone: "",
    address: "",
    maritalStatus: "",
    educationLevel: "",
    experience: "",
    country: "",
    birthplace: "",
    relative: "",
    medical: '',
    hasCoc: "",
    sex: "",
    // step 2
    year: "",
    period: "",
    religion: "",
    monthly_salary: "",
    contract_period: "",
    nationality: "",
    height: "",
    weight: "",
    branch: "",
    languages: [],
    skills: {
      childrenCare: false,
      cleaning: false,
      eldersCare: false,
      washing: false,
      ironing: false,
      cooking: false,
    },
    
    // step 3
    issueDate: "",
    expiryDate: "",
    dob: "",
    cocFile: null,
    passport: null,
    photo_3_X_4: null,
    photo_10_X_15: null,
    self_id_card: null,
    id_of_relative: null,
    remarks: "",
    eyeColor:"",
    hairColor:""
  });


  useEffect(() => {
    if (candidateCreated != null) {
      router.push('/candidates');

      toast({
        title: 'Candidate Registration',
        description: 'Candidate registered successfully!',
        variant: "default",
      });
      dispatch(reregisterCandidateState());
    } else if (status === "Failed") {
      toast({
        title: "Candidate Registration",
        description: error || "Candidate registration failed. Please try again.",
        variant: "destructive",
      });
    }
  }, [status, error, toast])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target; // Get the name and value from the dropdown
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the field based on the dropdown's name
    }));
  };
  


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, skills: { ...formData.skills, [name]: checked } });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  // Submit handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(registerCandidateRequest(formData));
  };
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <main className="container mx-auto p-4">

      <form onSubmit={handleSubmit}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold">Application for Employment</CardTitle>
          </CardHeader>
          <CardContent>
            {errors && <p className="text-red">{errors.error}</p>}

            {currentStep === 0 && (
              <>
                <h2 className="text-lg font-semibold">Step 1: Personal Information</h2>

                <Separator className="my-2" />
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <h2>Branch</h2>
                    <select name="branch"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.branch} onChange={handleDropdown}>
                      <option value="">Select Branch</option>
                      <option value="addis abeba">Addis Abeba</option>
                      <option value="dessie">Dessie</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="passportNumber">Passport Number</Label>
                    <Input id="passportNumber" name="passportNumber" value={formData.passportNumber} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="secondName">Second Name</Label>
                    <Input id="secondName" name="secondName" value={formData.secondName} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                  </div>
                  <div>


                    <h2>Relative</h2>
                    <select name="relative"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.relative} onChange={handleDropdown}>
                      <option value="">Select Realtive</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="relativeName">Relative Name</Label>
                    <Input disabled={!formData.relative} id="relativeName" name="relativeName" value={formData.relativeName} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>

                  <div>
                    <Label htmlFor="relativePhone">Relative Phone</Label>
                    <Input id="relativePhone" name="relativePhone" value={formData.relativePhone} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                  </div>
                  <div>
                    <h2>Marital Status</h2>
                    <select name="maritalStatus"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.maritalStatus} onChange={handleDropdown}>
                      <option value="">Select Marital Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>

               
                  <div>
                    <h2>Education</h2>
                    <select name="educationLevel"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.educationLevel} onChange={handleDropdown}>
                      <option value="">Select Education</option>
                      <option value="Elementary">Elementary</option>
                      <option value="Secondary School">Secondary School</option>
                      <option value="Bachelars">Bachelars</option>
                      <option value="Master">Master</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                  <div>
                    <h2>Medical</h2>
                    <select name="medical"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.medical} onChange={handleDropdown}>
                      <option value="">Select Medical</option>
                      <option value="Fit">Fit</option>
                      <option value="New">New</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                  <div>
                    <h2>Embassy</h2>
                    <select name="embassy"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.embassy} onChange={handleDropdown}>
                      <option value="">Select Embassy Status</option>
                      <option value="New">New</option>
                      <option value="Issued">Issued</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                  <div>
                    <h2>LMIS</h2>
                    <select name="lmis"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.lmis} onChange={handleDropdown}>
                      <option value="">Select LMIS</option>
                      <option value="New">New</option>
                      <option value="Issued">Issued</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                  <div>
                  <h2>Religion</h2>
                    <select name="religion"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.religion} onChange={handleDropdown}>
                      <option value="">Select Religion</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Cristian">Cristian</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                  <div>
                    <h2>COC</h2>
                    <select name="hasCoc"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.hasCoc} onChange={handleDropdown}>
                      <option value="">has COC</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="cocFile">Upload COC</Label>
                    <Input disabled={formData.hasCoc != "Yes"} type="file" id="cocFile" name="cocFile" onChange={handleFileChange} />
                  </div>
                  <div>
                    <h2>Sex</h2>
                    <select name="sex"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.sex} onChange={handleDropdown}>
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
              
                <h2 className="text-lg font-semibold">Step 2:CV Credentials</h2>
                <Separator className="my-2" />
                <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2>Exprience</h2>
                    <select name="experience"
                      className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.experience} onChange={handleDropdown}>
                      <option value="">has Exprience</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="period">Period</Label>
                    <Input disabled={formData.experience!="Yes"} id="period" name="period" value={formData.period} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="year">Age</Label>
                    <Input id="year" name="year" value={formData.year} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" value={formData.country} onChange={handleChange} />
                  </div>
                  <div>
                    <h2>Eye Color</h2>
                    <select name="eyeColor"
                      className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.eyeColor} onChange={handleDropdown}>
                      <option value="">Select Eye Color</option>
                      <option value="Black">Black</option>
                      <option value="Brown">Brown</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                  <div>
                    <h2>Hair Color</h2>
                    <select name="hairColor"
                      className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.hairColor} onChange={handleDropdown}>
                      <option value="">Select Hair Color</option>
                      <option value="Black">Black</option>
                      <option value="Brown">Brown</option>
                      {/* Add other options as needed */}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="monthly_salary">Monthly Salary</Label>
                    <Input id="monthly_salary" name="monthly_salary" value={formData.monthly_salary} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="contract_period">Contract Period</Label>
                    <Input id="contract_period" name="contract_period" value={formData.contract_period} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" name="height" value={formData.height} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight</Label>
                    <Input id="weight" name="weight" value={formData.weight} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input type="date" id="issueDate" name="issueDate" value={formData.issueDate} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input type="date" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
                  </div>
                 
                  <div>
                    <Label htmlFor="birthplace">Place Of Birth</Label>
                    <Input id="birthplace" name="birthplace" value={formData.birthplace} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
             <>
             <h2 className="text-lg font-semibold">Step 3: Language And Skills</h2>
             <Separator className="my-2" />
             <div className="grid grid-cols-1 gap-4">
               <div>
                 <Label htmlFor="languages">Languages</Label>
                 <LanguageSelector
                   value={formData.languages}
                   onChange={(languages) => setFormData((prev) => ({ ...prev, languages }))}
                 />
               </div>
           
               <div>
                 <Label htmlFor="childrenCare">
                   <input
                     type="checkbox"
                     id="childrenCare"
                     name="childrenCare"
                     checked={formData.skills.childrenCare}
                     onChange={handleCheckboxChange}
                   />
                   <span className="ml-10">Children Care</span>
                 </Label>
               </div>
               <div>
                 <Label htmlFor="cleaning">
                   <input
                     type="checkbox"
                     id="cleaning"
                     name="cleaning"
                     checked={formData.skills.cleaning}
                     onChange={handleCheckboxChange}
                   />
                   <span className="ml-10">Cleaning</span>
                 </Label>
               </div>
               <div>
                 <Label htmlFor="eldersCare">
                   <input
                     type="checkbox"
                     id="eldersCare"
                     name="eldersCare"
                     checked={formData.skills.eldersCare}
                     onChange={handleCheckboxChange}
                   />
                   <span className="ml-10">Elders Care</span>
                 </Label>
               </div>
               <div>
                 <Label htmlFor="washing">
                   <input
                     type="checkbox"
                     id="washing"
                     name="washing"
                     checked={formData.skills.washing}
                     onChange={handleCheckboxChange}
                   />
                   <span className="ml-10">Washing</span>
                 </Label>
               </div>
               <div>
                 <Label htmlFor="ironing">
                   <input
                     type="checkbox"
                     id="ironing"
                     name="ironing"
                     checked={formData.skills.ironing}
                     onChange={handleCheckboxChange}
                   />
                   <span className="ml-10">Ironing</span>
                 </Label>
               </div>
               <div>
                 <Label htmlFor="cooking">
                   <input
                     type="checkbox"
                     id="cooking"
                     name="cooking"
                     checked={formData.skills.cooking}
                     onChange={handleCheckboxChange}
                   />
                   <span className="ml-10">Cooking</span>
                 </Label>
               </div>
             </div>
           </>
           
            )}

            {currentStep===3&&(
                <>

              
                <h2 className="text-lg font-semibold">Step 4: Attachments and Additional Information</h2>
                <Separator className="my-2" />
                <div className="grid grid-cols-2 gap-4">
               <div>
               <Label htmlFor="self_id_card">Self ID Card</Label>
               <Input type="file" id="self_id_card" name="self_id_card" onChange={handleFileChange} />
             </div>
             <div>
               <Label htmlFor="id_of_relative">ID of Relative</Label>
               <Input type="file" id="id_of_relative" name="id_of_relative" onChange={handleFileChange} />
             </div>
           
          
             <div>
               <Label htmlFor="passport">Passport File</Label>
               <Input type="file" id="passport" name="passport" onChange={handleFileChange} />
             </div>
             <div>
               <Label htmlFor="photo_3_X_4">Photo 3x4</Label>
               <Input type="file" id="photo_3_X_4" name="photo_3_X_4" onChange={handleFileChange} />
             </div>
             <div>
               <Label htmlFor="photo_10_X_15">Photo 10x15</Label>
               <Input type="file" id="photo_10_X_15" name="photo_10_X_15" onChange={handleFileChange} />
             </div>
             </div>

             <div>
               <Label htmlFor="remarks">Summery</Label>
               <Textarea id="remarks" name="remarks" value={formData.remarks} onChange={handleChange} />
             </div>
               </>
            )}
          </CardContent>
          <div className="flex justify-end items-end space-x-2 p-4">
            {currentStep > 0 && <Button className="bg-green-800 hover:bg-green-500 text-white" type="button" onClick={prevStep}>Back</Button>}
            {currentStep < 3 && <Button className="bg-green-800 hover:bg-green-500 text-white" type="button" onClick={nextStep}>Next</Button>}
            {currentStep === 3 && <Button className="bg-green-800 hover:bg-green-500 text-white" type="submit">Submit</Button>}
          </div>
        </Card>
      </form>
    </main>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Loader2, Printer } from "lucide-react";
type Skill = {
  id: number;
  name: string;
  isProficient: boolean;
  candidateId: number;
};
// Define the response type for the candidate data
interface CandidateData {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  passportNumber: string;
  relativeName: string;
  relativePhone: string;
  address: string;
  maritalStatus: string;
  educationLevel: string;
  experience: string;
  religion: string;
  country: string;
  placeOfBirth: string;
  dateOfBirth: string;
  contractPeriod: string | null;
  monthlySalary: number;
  nationality: string;
  height: number | null;
  weight: number | null;
  languages: string;
  issueDate: string;
  expiryDate: string;
  remarks: string;
  medical: string;
  passport: string;
  photo3X4: string;
  photo10X15: string;
  selfIdCard: string;
  relativeIdCard: string;
  skills: Skill[];
}

export default function CandidateDetail() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
 const [loading,setLoading]=useState(true);
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axiosInstance.get(`/candidate/${id}`);
        setLoading(false);
        setCandidate(response.data);
      } catch (error) {
        setLoading(false);

        console.error("Error fetching candidate data:", error);
      }
    };

    fetchCandidate();
  }, []);



  const generatePDF = (elementId: string): void => {
    const element = document.getElementById(elementId); // Get the element by its ID

    if (!element) {
      console.error("Element not found!");
      return;
    }

    // Use html2canvas to capture the HTML element with custom rendering options
    html2canvas(element, {
      scale: 4, // Adjust the scale for higher resolution
      logging: true, // Enable console logs for debugging
      useCORS: true, // Enable CORS if there are images
      scrollX: 0, // Control horizontal scroll
      scrollY: 0, // Control vertical scroll
      x: 0, // Adjust horizontal offset
      y: 0, // Adjust vertical offset
    }).then((canvas) => {
      const doc = new jsPDF();

      // Calculate image size based on canvas dimensions
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      // Calculate the scaling factor for the content to fit the page
      const margin = 10; // Set margin for the PDF
      const availableWidth = imgWidth - 2 * margin; // Available width on the page
      const availableHeight = 297 - 2 * margin; // Available height on the page
      const scaleFactor = Math.min(availableWidth / canvas.width, availableHeight / canvas.height);

      const scaledWidth = canvas.width * scaleFactor;
      const scaledHeight = canvas.height * scaleFactor;

      // Add the image to the first page
      doc.addImage(imgData, 'PNG', margin, margin, scaledWidth, scaledHeight);

      // If the content is too long, add more pages
      if (scaledHeight > availableHeight) {
        const numPages = Math.ceil(scaledHeight / availableHeight);
        for (let i = 1; i < numPages; i++) {
          doc.addPage();
          doc.addImage(imgData, 'PNG', margin, margin - (i * availableHeight), scaledWidth, scaledHeight);
        }
      }

      // Save the generated PDF
      doc.save(`${candidate?.firstName+' '+candidate?.lastName}.pdf`);
    }).catch((error) => {
      console.error("Error capturing element:", error);
    });
  };

  return (
    <main className="container mx-auto p-4" >
        {loading&&(
          <Loader2 />
        )}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-center text-xl font-bold">Application for Employment</CardTitle>
            <Button onClick={() => generatePDF('content')} color="primary">
              <Printer />
            </Button>


          </div>
        </CardHeader>
      
        {
  candidate &&
        <CardContent id="content">
          {/* Profile Image and First Table */}
          <div className="mb-4 flex flex-col gap-4 space-x-3 md:flex-row">
            {/* Profile Image */}
            <div className="flex justify-center md:w-1/3 md:justify-start">
              <Image
                src={candidate?.photo10X15 || "https://via.placeholder.com/150"}
                width={1500}
                height={1000}
                alt="Profile Image"
                className="rounded-md border border-gray-300"
              />
            </div>

            {/* Personal Data Table */}
            <div className="md:w-2/3">
              <h2 className="text-lg font-semibold">Personal Data</h2>
              <Separator className="my-2" />
              <Table className="w-full">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell>{`${candidate.firstName} ${candidate.lastName}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nationality</TableCell>
                    <TableCell>{candidate.nationality}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Religion</TableCell>
                    <TableCell>{candidate.religion}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Age</TableCell>
                    <TableCell>{new Date().getFullYear() - new Date(candidate.dateOfBirth).getFullYear()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Height</TableCell>
                    <TableCell>{candidate.height ? `${candidate.height} m` : "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Weight</TableCell>
                    <TableCell>{candidate.weight ? `${candidate.weight} kg` : "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Marital Status</TableCell>
                    <TableCell>{candidate.maritalStatus}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Passport Details */}
          <section className="mt-4">
            <h2 className="text-lg font-semibold">Passport Details</h2>
            <Separator className="my-2" />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Passport No.</TableCell>
                  <TableCell>{candidate.passportNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date of Birth</TableCell>
                  <TableCell>{new Date(candidate.dateOfBirth).toLocaleDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date of Issue</TableCell>
                  <TableCell>{new Date(candidate.issueDate).toLocaleDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date of Expiry</TableCell>
                  <TableCell>{new Date(candidate.expiryDate).toLocaleDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Place of Birth</TableCell>
                  <TableCell>{candidate.placeOfBirth}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          {/* Skills & Experiences */}
          <section className="mt-4">
            <h2 className="text-lg font-semibold">Skills & Experiences</h2>
            <Separator className="my-2" />
            <Table>
              <TableBody>
                {candidate.skills.map(skill => (
                  <TableRow key={skill.id}>

                    <TableCell>{skill.name}</TableCell>
                    <TableCell>{skill.isProficient ? "✅" : "❌"}</TableCell>

                  </TableRow>
                ))}


              </TableBody>
            </Table>
          </section>

          {/* Remarks */}
          <section className="mt-4 flex justify-between">
            <div>
              <h2 className="text-lg font-semibold">Remarks</h2>
              <Separator className="my-2" />
              <p className="text-sm">{candidate.remarks}</p>

            </div>
            <div className="flex justify-center md:w-1/3 md:justify-start">
              <Image
                src={candidate.photo3X4 || "https://via.placeholder.com/150"}
                width={300}
                height={400}
                alt="Profile Image"
                className="rounded-lg border border-gray-300"
              />
            </div>
          </section>

          {/* Downloadable Documents */}
          <section className="mt-4">
            <h2 className="text-lg font-semibold">Documents</h2>
            <Separator className="my-2" />
            <ul className="list-disc pl-5">
           
              <li>
                <a href={candidate.passport} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Passport
                </a>
              </li>
              <li>
                <a href={candidate.selfIdCard} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Self ID Card
                </a>
              </li>
              <li>
                <a href={candidate.relativeIdCard} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Relative ID Card
                </a>
              </li>
            </ul>
          </section>
          <div className="text-xl mt-11">
            Passport
          </div>
          <div className="flex">
            <Image
              src={candidate.passport || "https://via.placeholder.com/150"}
              width={300}
              height={800}
              alt="Profile Image"
              className="rounded-md border border-gray-300"
            />
          </div>
        </CardContent>
        }
      </Card>
    </main>
  );
}

"use client"
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
interface Partner {
  name: string;
  address: string;
  acceptedCandidates: number;
  paidCandidates: number;
  unpaidCandidates: number;
  logo: string;
}

const partners: Partner[] = [
  {
    name: "TechCorp Solutions",
    address: "123 Innovation St, Silicon Valley, CA 94000",
    acceptedCandidates: 50,
    paidCandidates: 30,
    unpaidCandidates: 20,
    logo: "https://via.placeholder.com/100x100.png?text=TechCorp",
  },
  {
    name: "Global Innovations Inc.",
    address: "456 Future Ave, New York, NY 10001",
    acceptedCandidates: 75,
    paidCandidates: 45,
    unpaidCandidates: 30,
    logo: "https://via.placeholder.com/100x100.png?text=Global+Innovations",
  },
  {
    name: "EcoTech Enterprises",
    address: "789 Green Blvd, Portland, OR 97201",
    acceptedCandidates: 40,
    paidCandidates: 25,
    unpaidCandidates: 15,
    logo: "https://via.placeholder.com/100x100.png?text=EcoTech",
  },
  {
    name: "DataDrive Systems",
    address: "321 Analytics Way, Boston, MA 02108",
    acceptedCandidates: 60,
    paidCandidates: 40,
    unpaidCandidates: 20,
    logo: "https://via.placeholder.com/100x100.png?text=DataDrive",
  },
  {
    name: "CloudNine Solutions",
    address: "987 Skyway Tower, Seattle, WA 98101",
    acceptedCandidates: 55,
    paidCandidates: 35,
    unpaidCandidates: 20,
    logo: "https://via.placeholder.com/100x100.png?text=CloudNine",
  },
];

const Partners: React.FC = () => {
  const router=useRouter();
  return (
    <div className="container mx-auto  ">
      <h1 className="text-xl font-bold mb-6">Our Partner Companies</h1>
        
      <div className="grid grid-cols-2 mt-2 md:grid-cols-2 lg:grid-cols-4 gap-2"> 
        {partners.map((partner, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <CardHeader className="flex w-full items-center justify-center">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-xs mb-1">{partner.name}</CardTitle>
              <p className="text-sm flex justify-center items-center text-gray-600">
                <span><IoLocationOutline /></span>

                {partner.address}</p>
            </CardContent>
            <CardFooter className=" rounded-b-lg flex justify-between text-sm space-x-2">
              <div className="text-center">
                <p className="text-xs text-gray-600">Accepted</p>
                <p className="text-xs">{partner.acceptedCandidates}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Paid</p>
                <p className="text-xs">{partner.paidCandidates}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Unpaid</p>
                <p className="text-xs">{partner.unpaidCandidates}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Partners;

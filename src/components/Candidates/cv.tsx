import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CandidateData } from "@/types/candidateData"
import { FileText, Mail } from 'lucide-react'
import Image from "next/image"
 

interface CandidateCardProps {
  candidate: any
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full max-w-xs sm:max-w-md lg:max-w-xs hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={candidate.photo3X4||""}
          width={80}
          height={80}
          alt={`${candidate.firstName}'s profile`}
          className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <h2 className="text-sm  text-white leading-tight truncate">{candidate.firstName}</h2>
          <p className="text-xs text-white/80 truncate">{candidate.experience}</p>
        </div>
      </div>
      <CardContent className="flex-grow p-2 space-y-2">
        <div className="flex items-center text-xs">
          <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
          <a href={`mailto:${candidate.phone}`} className="text-primary hover:underline truncate">
            {candidate.phone}
          </a>
        </div>
        <Button className="w-full text-xs h-8" variant="outline" asChild>
          <a href={candidate.address} target="_blank" rel="noopener noreferrer">
            <FileText className="mr-1 h-3 w-3" />
            View CV
          </a>
        </Button>
      </CardContent>
     
    </Card>
  )
}

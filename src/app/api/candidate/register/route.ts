import { NextRequest, NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Content type must be multipart/form-data' }, { status: 400 })
  }

  try {
    // Explicitly type formData as FormData
    const formData = await req.formData() as FormData

    console.log('Received form data:', Object.fromEntries(formData))

    // Helper function to parse date
    const parseDate = (dateStr: string | null): Date | null => {
      if (!dateStr) return null
      const date = new Date(dateStr)
      return isNaN(date.getTime()) ? null : date
    }

    const saveFile = async (file: File | null, prefix: string): Promise<string | null> => {
      if (!file) return null;
    
      const stream = file.stream();
      const reader = stream.getReader();
      const chunks: Uint8Array[] = [];
    
      let done = false;
      while (!done) {
        const { value, done: isDone } = await reader.read();
        if (value) {
          chunks.push(value);
        }
        done = isDone;
      }
    
      const buffer = Buffer.concat(chunks);
    
      // Generate unique file name
      const fileName = `${prefix}-${Date.now()}${path.extname(file.name)}`;
    
      // Path to the public/uploads directory
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
      // Ensure the uploads directory exists
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (mkdirError) {
        console.error('Failed to create uploads directory:', mkdirError);
        throw new Error('Unable to create uploads directory');
      }
    
      // Full file path
      const filePath = path.join(uploadDir, fileName);
    
      // Save the file
      try {
        await writeFile(filePath, buffer);
      } catch (writeError) {
        console.error('Failed to write file to disk:', writeError);
        throw new Error('Unable to save file');
      }
    
      // Return public URL path
      return `/uploads/${fileName}`;
    };
    



    // Save files
    const cocFile = await saveFile(formData.get('cocFile') as File | null, 'cocFile')
    const passport = await saveFile(formData.get('passport') as File | null, 'passport')
    const photo3X4 = await saveFile(formData.get('photo_3_X_4') as File | null, 'photo3x4')
    const photo10X15 = await saveFile(formData.get('photo_10_X_15') as File | null, 'photo10x15')
    const selfIdCard = await saveFile(formData.get('self_id_card') as File | null, 'selfIdCard')
    const relativeIdCard = await saveFile(formData.get('id_of_relative') as File | null, 'relativeIdCard')

    // Parse dates
    const issueDate = parseDate(formData.get('issueDate') as string | null)
    const expiryDate = parseDate(formData.get('expiryDate') as string | null)
    const dateOfBirth = parseDate(formData.get('dob') as string | null)

    // Helper function to convert Date | null to string | Date
    const dateToStringOrDate = (date: Date | null): string | Date => {
      if (date === null) return ''
      return date
    }

    // Prepare candidate data
    const candidateData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      secondName: formData.get('secondName') as string,
      lmis: formData.get('lmis') as string,
      medical: formData.get('medical') as string,
      hasCoc: formData.get('hasCoc') as string,
      branch: formData.get('branch') as string,
      relative: formData.get('relative') as string,
      eyeColor: formData.get('eyeColor') as string,
      hairColor: formData.get('hairColor') as string,
     sex:formData.get("sex") as string,
     embassy:formData.get("embassy") as string,
      phone: formData.get('phone') as string,
      passportNumber: formData.get('passportNumber') as string,
      relativeName: formData.get('relativeName') as string,
      relativePhone: formData.get('relativePhone') as string,
      address: formData.get('address') as string,
      maritalStatus: formData.get('maritalStatus') as string,
      educationLevel: formData.get('educationLevel') as string,
      experience: formData.get('experience') as string,
      religion: formData.get('religion') as string,
      country: formData.get('country') as string,
      placeOfBirth: formData.get('birthplace') as string,
      dateOfBirth: dateToStringOrDate(dateOfBirth),
      contractPeriod: parseInt(formData.get('contract_period') as string, 10) ?? 0,
      monthlySalary: parseFloat(formData.get('monthly_salary') as string) ?? 0,
      nationality: formData.get('nationality') as string,
      height: parseFloat(formData.get('height') as string) ?? 0,
      weight: parseFloat(formData.get('weight') as string) ?? 0,
      languages: (formData.get('languages') as string) ?? '',
      issueDate: dateToStringOrDate(issueDate),
      expiryDate: dateToStringOrDate(expiryDate),
      remarks: formData.get('remarks') as string,
      cocFile,
      passport,
      photo3X4,
      photo10X15,
      selfIdCard,
      relativeIdCard,
    }

    console.log('Attempting to create candidate with data:', candidateData)

    // Create candidate in the database
    const newCandidate = await prisma.$transaction(async (prisma) => {
      const candidate = await prisma.candidate.create({
        data: {
          ...candidateData,
          skills: {
            create: Object.entries(JSON.parse(formData.get('skills') as string ?? '{}')).map(([name, isProficient]) => ({
              name,
              isProficient: Boolean(isProficient),
            })),
          },
        },
      })

      if (!candidate) {
        throw new Error('Failed to create candidate')
      }

      return candidate
    })

    console.log('Candidate created successfully:', newCandidate)

    return NextResponse.json(
      {
        message: 'Candidate created successfully',
        candidate: newCandidate,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating candidate:', error)
    let errorMessage = 'An unexpected error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
console.log(params);

  try {
    // Validate the ID
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // Fetch data from the database
    const data = await prisma.candidate.findUnique({
      include:{
        skills:true},
      where: {
        id: parsedId,
      },
    });

    // Check if data exists
    if (!data) {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }

    // Return the data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

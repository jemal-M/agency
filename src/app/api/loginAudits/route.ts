import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '10', 10);
  const sortBy = searchParams.get('sortBy') ?? 'createdAt';
  const sortOrder = searchParams.get('sortOrder') ?? 'desc';

  // Ensure valid page and limit
  if (isNaN(page) ?? isNaN(limit) ?? page < 1 ?? limit < 1) {
    return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
  }

  try {
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch total count of login audits
    const totalCount = await prisma.loginAudit.count();

    // Fetch paginated login audits
    const audits = await prisma.loginAudit.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Return the paginated login audit data
    return NextResponse.json({
      audits,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching login audits:', error);
    return NextResponse.json({ error: 'Failed to fetch login audits.' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is disconnected
  }
}


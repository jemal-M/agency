import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY ?? "your-secret-key";

// Function to verify the JWT token
const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null; // Token is invalid
  }
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '10', 10);
  const sortBy = searchParams.get('sortBy') ?? 'id';
  const sortOrder = searchParams.get('sortOrder') ?? 'asc';
  // const authHeader = req.headers.get('Authorization');

  // Ensure valid page and limit
  if (isNaN(page) ?? isNaN(limit) ?? page < 1 ?? limit < 1) {
    return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
  }
  // Ensure valid user ID
  // if (!userId ?? isNaN(Number(userId))) {
  //   return NextResponse.json({ error: 'Valid user ID is required' }, { status: 400 });
  // }

  // Check if Authorization header exists
  // if (!authHeader ?? !authHeader.startsWith('Bearer ')) {
  //   return NextResponse.json({ error: 'Authorization token is required' }, { status: 401 });
  // }

  // const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  // Verify the token
  // const decoded = verifyToken(token);
  // if (!decoded) {
  //   return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  // }

  // Extract user info from the token (e.g., role)
  // const { role } = decoded as { role: string };

  // Only allow access to users for users with specific roles (e.g., admin or manager)
  // if (role !== 'ADMIN' && role !== 'MANAGER') {
  //   return NextResponse.json({ error: 'You do not have permission to view this resource' }, { status: 403 });
  // }

  try {
    const skip = (page - 1) * limit;

    // Fetch total count of candidates
    const totalCount = await prisma.user.count();
    // Fetch user by ID and include associated skills
    const user = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },

    });

    // If user is not found, return 404
    if (!user) {
      return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }
    const totalPages = Math.ceil(totalCount / limit);

    // Return the user data
    return NextResponse.json({ user,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },

     });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is disconnected
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, role, phone } = body;

    // Validate input
    if (!email || !password || !firstName || !lastName || !role || !phone) {
      return NextResponse.json(
        { error: 'All fields (email, password, firstName, lastName, role) are required.' },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists.' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        phone,
         
        
        // Ensure this is validated or restricted based on your app's logic
      },
    });

    return NextResponse.json({
      message: 'User registered successfully',
      user: { id: newUser.id, email: newUser.email, firstName: newUser.firstName, role: newUser.role, phone: newUser.phone },
    });
  } catch (error) {
    console.error('Error in registration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

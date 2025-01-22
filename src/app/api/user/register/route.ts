import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received Payload:', body); // Log entire payload

    const { email, password, firstName, lastName, role, phone, department, position, salary } = body;

    // Log startDate parsing
   

    // Validation
    if (!email || !password || !firstName || !lastName || !role || !phone ) {
      return NextResponse.json(
        { error: 'All fields (email, password, firstName, lastName, role, phone, startDate) are required.' },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists.' }, { status: 409 });
    }

    // Check if the phone number already exists
    const existingPhone = await prisma.user.findUnique({ where: { phone } });
    if (existingPhone) {
      return NextResponse.json({ error: 'Phone number already exists.' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        phone,
        startDate: new Date(Date.now()), // Ensures the value is a proper Date object
// Ensure proper DateTime handling
        department,
        position,
        salary:Number(salary),
      },
    });

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error('Error in registration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

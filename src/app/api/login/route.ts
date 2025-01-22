import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email_or_phone, password } = body;

  if (!email_or_phone || !password) {
    return NextResponse.json({ error: 'Email or phone and password are required' }, { status: 400 });
  }

  // Determine if the input is an email or phone number
  let user;
  const isEmail = email_or_phone.includes('@');
  if (isEmail) {
    user = await prisma.user.findUnique({ where: { email: email_or_phone } });
  } else {
    user = await prisma.user.findUnique({ where: { phone: email_or_phone } }); // Assuming the phone number is stored as 'phone'
  }

  if (!user) {
  await  prisma.loginAudit.create({
      data:{
       email_or_phone:email_or_phone,
       status:"failed",
       latitude:23.44,
       longtude:90.22
      }
  })
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Compare password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
   await prisma.loginAudit.create({
      data:{
       email_or_phone:email_or_phone,
       status:"failed",
       latitude:23.44,
       longtude:90.22
      }
  })
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
 await prisma.loginAudit.create({
    data:{
     email_or_phone:email_or_phone,
     status:"success",
     latitude:23.44,
     longtude:90.22
    }
})
  // Create JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  return NextResponse.json({
    message: 'Login successful',
    token,
    user: { id: user.id, email: user.email, role: user.role,firstName:user.firstName,lastName:user.lastName,department:user.department,salary:user.salary,startDate:user.startDate }
  });
}

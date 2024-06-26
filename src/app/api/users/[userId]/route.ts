import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { UserResponse, getUser } from '@/lib/handlers';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';


export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
): Promise<NextResponse<UserResponse> | {}> {
  const session: Session | null = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }
  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json({}, { status: 400 });
  }

  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json({}, { status: 400 });
  }

  if (session.user._id !== params.userId) {
    return NextResponse.json({
      sessionID: session,
      paramsUserId: params.userId,

    }, { status: 403 });
  }

  const user = await getUser(params.userId);

  if (user === null) {
    //return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(user);
}
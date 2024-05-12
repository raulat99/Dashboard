import { authOptions } from '@/lib/authOptions';
import {  PostSessionResponse, DashboardsResponse, postNewDashboard, getUserDashboards } from '@/lib/handlers';
import { Session, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
    {
      params,
    }: {
      params: { userId:string };
    }
): Promise<NextResponse<DashboardsResponse> | {}> {
  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

   if (session.user._id !== params.userId) {
    return NextResponse.json({
      sessionID: session.user._id,
      paramsUserId: params.userId,
    }, { status: 403 });
  }

  const dashboards = await getUserDashboards(params.userId);

  return NextResponse.json(dashboards);
}

export async function POST(request :NextRequest): Promise<NextResponse<PostSessionResponse> | null | {}> {
  const body = await request.json();
  
  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

    console.log(body);
  const output = await postNewDashboard(
    session.user._id,
    body
  );  
  
  if (output === null) return NextResponse.json({}, { status: 400 });

   if (output) return NextResponse.json(output, { status: 201 });
  // else return NextResponse.json(cartItems, { status: 200 });
  return {output}

}
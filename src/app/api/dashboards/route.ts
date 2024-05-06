import { authOptions } from '@/lib/authOptions';
import {  PostSessionResponse, SessionsResponse, getSessions, postNewDashboard } from '@/lib/handlers';
import { Session, getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest
): Promise<NextResponse<SessionsResponse>> {
  const sessions = await getSessions();

  return NextResponse.json(sessions);
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

  console.log({output})
  
  
  if (output === null) return NextResponse.json({}, { status: 400 });

   if (output) return NextResponse.json(output, { status: 201 });
  // else return NextResponse.json(cartItems, { status: 200 });

  return {output}



  // if (!body.qty || !params.userId || !params.productId) {
  //   return NextResponse.json({}, { status: 400 });
  // }

  // if (params.userId == null || params.productId == null) {
  //   return NextResponse.json({}, { status: 400 });
  // }

  // if (session.user._id !== params.userId) {
  //   return NextResponse.json({}, { status: 403 });
  // }

  // const output = await updateCartItem(
  //   params.userId,
  //   params.productId,
  //   body.qty
  // );

  // const cartItems = output?.cartItems;
  // const created = output?.created;

  // if (cartItems === null) return NextResponse.json({}, { status: 400 });

  // if (created) return NextResponse.json(cartItems, { status: 201 });
  // else return NextResponse.json(cartItems, { status: 200 });
}
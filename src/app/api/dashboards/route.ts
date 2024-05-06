import { SessionsResponse, getSessions } from '@/lib/handlers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest
): Promise<NextResponse<SessionsResponse>> {
  const sessions = await getSessions();

  return NextResponse.json(sessions);
}
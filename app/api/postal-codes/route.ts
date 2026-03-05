import { NextRequest, NextResponse } from 'next/server';
import { searchPostalCodes } from '@/lib/postal-codes';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '40', 10);

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const results = searchPostalCodes(q, limit);
  return NextResponse.json(results);
}

import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/auth';
import { ok, fail } from '@/lib/http';
import { getSummary, listVisits } from '@/lib/mock-db';

export async function GET() {
  try {
    const session = await requireSession();
    const summary = getSummary(session.orgId);
    const visits = listVisits(session.orgId);

    return NextResponse.json(ok({ ...summary, mapPins: visits.map((v) => ({ id: v.id, lat: v.lat, lng: v.lng })) }, { cacheSeconds: 60 }), {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' }
    });
  } catch (error) {
    return NextResponse.json(fail(error instanceof Error ? error.message : 'unknown_error'), { status: 401 });
  }
}

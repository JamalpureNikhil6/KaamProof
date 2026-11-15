import { NextRequest, NextResponse } from 'next/server';
import { addEvidence, calculateFinancials } from '@/lib/server/jobs-service';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { type, title, description, imageUrl } = body;
    if (!title || !imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Title and imageUrl are required' },
        { status: 400 }
      );
    }
    const updatedJob = addEvidence(params.id, {
      type: type || 'after',
      title,
      description,
      imageUrl,
    });
    return NextResponse.json({
      success: true,
      job: {
        ...updatedJob,
        financials: calculateFinancials(updatedJob),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to add evidence';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

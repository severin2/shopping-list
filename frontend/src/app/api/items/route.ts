import { NextResponse } from 'next/server';
import type { Item } from '@/types/item';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export type ResponseData<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function GET(): Promise<NextResponse<ResponseData<Item[]>>> {
  const apiUrl = `${API_URL}/items`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch items' },
      { status: res.status }
    );
  }
  const items = await res.json();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: Request): Promise<NextResponse<ResponseData<Item>>> {
  const apiUrl = `${API_URL}/items`;
  const body = await request.json();
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return NextResponse.json(
      { success: false, error: 'Failed to create item' },
      { status: res.status }
    );
  }
  const item = await res.json();
  return NextResponse.json({ success: true, data: item }, { status: 201 });
}

export async function PUT(request: Request): Promise<NextResponse<ResponseData<Item>>> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  }
  const apiUrl = `${API_URL}/items/${id}`;

  const body = await request.json();
  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return NextResponse.json(
      { success: false, error: 'Failed to update item' },
      { status: res.status }
    );
  }
  const item = await res.json();
  return NextResponse.json({ success: true, data: item }, { status: 200 });
}

export async function DELETE(request: Request): Promise<NextResponse<ResponseData<null>>> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
  }
  const apiUrl = `${API_URL}/items/${id}`;
  const res = await fetch(apiUrl, { method: 'DELETE' });
  if (!res.ok) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete item' },
      { status: res.status }
    );
  }
  return NextResponse.json({ success: true, data: null }, { status: 202 });
}

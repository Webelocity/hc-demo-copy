// Mock API route for fetching single product
import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PRODUCT } from '@/mocks/products';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if the requested ID matches our mock product
    if (id === MOCK_PRODUCT._id || id === MOCK_PRODUCT.id || id === 'prod_12345') {
        return NextResponse.json(MOCK_PRODUCT);
    }
    
    // Return 404 if product not found
    return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
    );
}


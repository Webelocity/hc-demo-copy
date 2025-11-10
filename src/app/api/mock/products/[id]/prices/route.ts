// Mock API route for fetching product prices with quantity-based pricing
import { NextRequest, NextResponse } from 'next/server';
import { getMockProductWithPrices } from '@/mocks/products';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    
    // Get quantity from query params (default to 1)
    const quantity = parseInt(searchParams.get('quantity') || '1', 10);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Check if the requested ID matches our mock product
    if (id === 'prod_12345' || id === 'prod_12345') {
        const productWithPrices = getMockProductWithPrices(quantity);
        return NextResponse.json(productWithPrices);
    }
    
    // Return 404 if product not found
    return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
    );
}


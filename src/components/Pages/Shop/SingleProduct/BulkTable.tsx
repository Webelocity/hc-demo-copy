export default function BulkTable({ product }: { product: Product }) {

    return (
        <div className="border border-[var(--Colors-Neutral-100)] rounded-[0.875rem] p-[1rem]">

            {/* Bulk Pricing Table */}
            {product.bulkPricingTable && product.bulkPricingTable.length > 0 && (
                <section className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-900">Bulk Pricing</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                        Quantity
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                        Discount
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                        Price Per Unit
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-200">
                                {product.bulkPricingTable
                                    .filter(tier => tier.state === "ACTIVE")
                                    .map((tier) => {
                                        const discountedPrice = tier.BulkDiscountType === "Percentage"
                                            ? product.finalPrice * (1 - tier.percentagePerUnit / 100)
                                            : product.finalPrice - tier.percentagePerUnit;

                                        return (
                                            <tr key={tier._id} className="hover:bg-blue-100 transition-colors">
                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    {tier.key}+ items
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium text-green-600">
                                                    {tier.percentagePerUnit}% OFF
                                                </td>
                                                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                                                    ${discountedPrice.toFixed(2)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
}
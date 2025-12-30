import { VersapayCardSummary } from "@/atoms/paymentAtom";
import { RiBankCardLine } from "react-icons/ri";

type VersaPaySuccessProps = {
    summary: VersapayCardSummary | null;
};

export default function VersaPaySuccess({ summary }: VersaPaySuccessProps) {
    const brand = (summary?.brand ?? "").toUpperCase();
    const last4 = summary?.last4 ?? "••••";
    const exp = summary?.exp ? formatExp(summary.exp) : undefined;

    return (
        <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="mt-[2px] flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <RiBankCardLine className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                    <p className="font-semibold text-emerald-900">Payment method confirmed</p>
                    <p className="text-gray-700">
                        Your card is securely tokenized. We’ll use this token to complete your order.
                    </p>
                </div>
            </div>

            <div className="grid gap-2 rounded-lg bg-white/80 p-3 text-sm text-gray-800 shadow-inner">
                <DetailRow label="Brand" value={brand || "CARD"} />
                <DetailRow label="Last 4" value={`•••• ${last4}`} />
                {exp && <DetailRow label="Exp" value={exp} />}
            </div>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold text-gray-900">{value}</span>
        </div>
    );
}

function formatExp(exp: string): string {
    // exp like "1228" -> "12/28"
    const clean = String(exp).replace(/\D/g, "");
    if (clean.length === 4) {
        return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
    }
    return exp;
}



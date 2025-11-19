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
        <div className="rounded-md border border-[var(--Primary-100)] bg-[var(--Primary-50)] p-3 text-sm text-black flex items-start gap-3">
            <div className="mt-[2px] text-[var(--primary-500-main)]">
                <RiBankCardLine className="w-[1.25rem] h-[1.25rem]" />
            </div>
            <div className="flex flex-col">
                <p className="font-semibold">Payment method confirmed</p>
                <div className="text-[0.875rem] text-[var(--Neutral-700)] mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <span>
                        Brand: <span className="font-medium">{brand || "CARD"}</span>
                    </span>
                    <span>
                        Last 4: <span className="font-medium">•••• {last4}</span>
                    </span>
                    {exp && (
                        <span>
                            Exp: <span className="font-medium">{exp}</span>
                        </span>
                    )}
                </div>
            </div>
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



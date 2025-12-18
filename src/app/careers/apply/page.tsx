'use client';
import CUstomMUITheme from "@/app/theme";
import CareerForm from "@/components/Pages/Careers/CareerForm/CareerForm";
import { ThemeProvider } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Apply() {
    const searchParams = useSearchParams();
    const initialJobName = searchParams.get("job") || undefined;

    return (
        <div className="py-[2.5rem]">
            <ThemeProvider theme={CUstomMUITheme}>
                <CareerForm initialJobName={initialJobName} />
            </ThemeProvider>
        </div>
    );
}
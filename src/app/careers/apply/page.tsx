'use client';
import CUstomMUITheme from "@/app/theme";
import CareerForm from "@/components/Pages/Careers/CareerForm/CareerForm";
import { ThemeProvider } from "@mui/material";

export default function Apply() {
    return (
        <div className="py-[2.5rem]">
            <ThemeProvider theme={CUstomMUITheme}>
                <CareerForm />
            </ThemeProvider>
        </div>
    );
}
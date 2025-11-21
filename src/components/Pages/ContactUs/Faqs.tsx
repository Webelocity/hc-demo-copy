"use client";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

export default function Faqs() {
    return (
        <div className="mt-[1.5rem] pb-[2.5rem] w-full  baseContainer maxWidth">
            <h2 className="text-[1.75rem] font-bold mb-4">Frequently Asked Questions</h2>

            <div className="w-full flex flex-col gap-[1rem] py-[1rem]">
                <Accordion expanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>Where are Home Central Stores locations?</AccordionSummary>
                    <AccordionDetails className="text-[1rem] font-medium text-[#1E1E1E]">
                        Home Central Stores has three convenient <Link className="underline text-[var(--primary-500-main)]" href="/locations">locations</Link> serving homeowners, contractors and vendors in New York: Owego, Vestal, and Candor. Visit us to browse our full range of hardware, building supplies, and contractor rewards.
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>How can I become a Pro contractor and access rewards?</AccordionSummary>
                    <AccordionDetails className="text-[1rem] font-medium text-[#1E1E1E]">
                        Contractors and vendors can <Link className="underline text-[var(--primary-500-main)]" href="/pro">Become a Pro</Link> with Home Central Stores by signing up for our Contractor Zone. As a Pro, you’ll enjoy exclusive rewards, Pro pricing, bulk discounts, and special promotions designed to help you save on every project.                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>Can I request a quote online for materials or tools?</AccordionSummary>
                    <AccordionDetails className="text-[1rem] font-medium text-[#1E1E1E]">
                        Yes! You can easily request a quote online for <Link className="underline text-[var(--primary-500-main)]" href="/products">building materials</Link>, tools, or <Link className="underline text-[var(--primary-500-main)]" href="/rental">rental equipment</Link> through our website. Simply fill out the <Link className="underline text-[var(--primary-500-main)]" href="/contact">quote form</Link>, and our team will provide a fast, personalized response to support your project needs.                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
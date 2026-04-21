import React from "react";
import PolicyTerm from "./PolicyTerm";

export default function ReturnRefundPolicy() {
  return (
    <div className="flex flex-col gap-[1.5rem] items-start w-full">
      <h2 className="font-['Sora'] font-bold leading-[1.2] text-[2rem] md:text-[2.5rem] text-[var(--Neutral-800)] tracking-[0.05rem] w-full">
        Home Central Return Policy
      </h2>

      <h3 className="font-['Figtree'] font-normal leading-[1.2] text-[1.5rem] md:text-[1.75rem] text-[var(--Neutral-800)] tracking-[0.0225rem] w-full">
        Customer Facing
      </h3>

      <PolicyTerm title="Eligibility">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Any returns within 60 days of purchase with original receipt, are
            eligible for full refund.
          </li>
          <li>
            Returns without a receipt will receive store credit at the item&apos;s
            lowest sale price.
          </li>
          <li>
            Items must be returned in re-sellable condition, with original
            packaging, manuals, and accessories.
          </li>
          <li>
            Cashiers may request the customer&apos;s full name, address, and phone
            number on all returns.
          </li>
        </ul>
      </PolicyTerm>

      <PolicyTerm title="Building Materials">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Lumber, panel items, and other building materials must not be
            weathered, cut, or show any signs of use to receive credit.
          </li>
          <li>
            Quality issues with lumber must be reported within 24 hours of
            customer receiving product.
          </li>
          <li>
            Home Central reserves the right to refuse refunds for building
            material items after 7 days of customer receiving product.
          </li>
        </ul>
      </PolicyTerm>

      <PolicyTerm title="Customized products">
        <p>Returns are not accepted on customized products such as:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Tinted Paint</li>
          <li>Re-keyed locks</li>
          <li>Cut rope, chain, glass, wire, pipe, etc.</li>
        </ul>
      </PolicyTerm>

      <PolicyTerm title="Small Appliances / Small Engine">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Air conditioners, dehumidifiers, and electric pressure washers may
            only be returned within one week, and only if they are unopened.
          </li>
          <li>
            Generators, mowers, and gas pressure washers may only be returned
            within one week, and only if no gas or oil has been put in the motor.
          </li>
        </ul>
      </PolicyTerm>

      <PolicyTerm title="Special Orders">
        <p>
          Special Orders are non-returnable and non-refundable, unless
          specifically noted ahead of time.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Refund Methods">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Refunds for purchases made with a debit or credit card, will only be
            credited back to the same card that was used to make the purchase.
          </li>
          <li>
            Home Central reserves the right to pay any refund by check.
          </li>
        </ul>
      </PolicyTerm>

      <PolicyTerm title="Return Pick-up">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            If you require a pick-up of returns from your job site, pick-up fees
            and/or restocking fees may apply.
          </li>
          <li>
            Pick-up returns may take up to 3 business days to process due to
            verification procedures.
          </li>
        </ul>
        <p className="mt-2">
          For further questions, please contact us at{" "}
          <a
            href="mailto:hc@homecentralstores.com"
            className="underline text-[#841618]"
          >
            hc@homecentralstores.com
          </a>{" "}
          or call us at{" "}
          <a href="tel:6076873284" className="underline text-[#841618]">
            607-687-3284
          </a>
          . We appreciate your understanding and look forward to serving you!
        </p>
      </PolicyTerm>
    </div>
  );
}

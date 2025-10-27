import React from "react";
import PolicyTerm from "./PolicyTerm";

export default function ReturnRefundPolicy() {
  return (
    <div className="flex flex-col gap-[1.5rem] items-start w-full">
      <h2 className="font-['Sora'] font-bold leading-[1.2] text-[2rem] md:text-[2.5rem] text-[var(--Neutral-800)] tracking-[0.05rem] w-full">
        Return & Refund Policy
      </h2>

      <h3 className="font-['Figtree'] font-normal leading-[1.2] text-[1.5rem] md:text-[1.75rem] text-[var(--Neutral-800)] tracking-[0.0225rem] w-full">
        Last updated September 11, 2025
      </h3>

      <PolicyTerm title="Return Window">
        <p>
          We want you to be completely satisfied with your purchase from Home
          Central Stores. If you are not satisfied, you may return most items
          within 30 days of delivery for a full refund or exchange.
        </p>
        <p>
          To be eligible for a return, items must be unused, in their original
          packaging, and in the same condition as when you received them. You
          will also need the receipt or proof of purchase.
        </p>
        <p>
          Certain items are not eligible for return, including custom-cut
          materials, special orders, clearance items, and opened packages of
          consumable products.
        </p>
      </PolicyTerm>

      <PolicyTerm title="How to Initiate a Return">
        <p>
          To initiate a return, please contact our customer service team at{" "}
          <span className="font-bold text-[#841618]">
            orderdesk@homecentralstores.ca
          </span>{" "}
          or call us at (607) 687-3284. Our team will provide you with return
          instructions and a return authorization number if applicable.
        </p>
        <p>
          Please include your order number, the item(s) you wish to return, and
          the reason for the return in your request.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Return Shipping">
        <p>
          You will be responsible for paying for your own shipping costs for
          returning your item. Shipping costs are non-refundable. If you receive
          a refund, the cost of return shipping will be deducted from your
          refund.
        </p>
        <p>
          If you are returning an item that was damaged or defective upon
          arrival, we will cover the cost of return shipping. Please contact us
          for instructions.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Refund Processing">
        <p>
          Once we receive your returned item, we will inspect it and notify you
          of the approval or rejection of your refund.
        </p>
        <p>
          If your return is approved, we will initiate a refund to your original
          method of payment. You will receive the credit within a certain number
          of days, depending on your card issuer's policies.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Non-Returnable Items">
        <p>Certain items cannot be returned, including:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Custom-cut materials and special orders</li>
          <li>Clearance and final sale items</li>
          <li>
            Opened packages of consumable products (paint, adhesives, etc.)
          </li>
          <li>Gift cards</li>
          <li>Hazardous materials</li>
        </ul>
      </PolicyTerm>

      <PolicyTerm title="Damaged or Defective Items">
        <p>
          If you receive a damaged or defective item, please contact us
          immediately. We will arrange for a replacement or refund at no
          additional cost to you.
        </p>
        <p>
          Please provide photos of the damaged or defective item to help us
          process your claim more quickly.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Exchanges">
        <p>
          If you need to exchange an item for a different size, color, or model,
          please contact our customer service team. We will be happy to assist
          you with an exchange, subject to availability.
        </p>
        <p>
          Exchanges are subject to the same return eligibility requirements as
          refunds.
        </p>
      </PolicyTerm>
    </div>
  );
}

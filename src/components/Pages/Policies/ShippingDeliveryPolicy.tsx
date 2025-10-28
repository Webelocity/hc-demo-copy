import React from "react";
import PolicyTerm from "./PolicyTerm";

export default function ShippingDeliveryPolicy() {
  return (
    <div className="flex flex-col gap-[1.5rem] items-start w-full">
      <h2 className="font-['Sora'] font-bold leading-[1.2] text-[2rem] md:text-[2.5rem] text-[var(--Neutral-800)] tracking-[0.05rem] w-full">
        Shipping & Delivery Policy
      </h2>

      <PolicyTerm title="Shipping Options">
        <p>
          Home Central Stores offers several shipping options to meet your
          needs:
        </p>
        <p>
          <span className="font-bold">Standard Shipping:</span> Delivery within
          5-7 business days
        </p>
        <p>
          <span className="font-bold">Expedited Shipping:</span> Delivery within
          2-3 business days
        </p>
        <p>
          <span className="font-bold">Express Shipping:</span> Delivery within
          1-2 business days
        </p>
        <p>
          <span className="font-bold">Local Delivery:</span> Available in the
          Owego, Vestal, and Candor, NY areas. Delivery times vary based on your
          location.
        </p>
        <p>
          <span className="font-bold">In-Store Pickup:</span> Available at our
          Owego, Vestal, and Candor locations. Orders are typically ready for
          pickup within 24 hours.
        </p>
        <p>
          Shipping times are estimates and do not include processing time.
          Orders are typically processed within 1-2 business days.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Shipping Costs">
        <p>
          Shipping costs are calculated based on the weight and dimensions of
          your order, your shipping address, and the shipping method you select.
        </p>
        <p>
          We offer free standard shipping on orders over $100 within the
          continental United States.
        </p>
        <p>
          For large or heavy items, such as lumber, building materials, or
          appliances, additional shipping charges may apply. We will contact you
          with a shipping quote before processing your order.
        </p>
        <p>
          Local delivery charges vary based on your location and the size of
          your order. Please contact us for a delivery quote.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Order Processing">
        <p>
          Orders are processed Monday through Friday, excluding holidays. Orders
          placed after 2:00 PM EST will be processed the next business day.
        </p>
        <p>
          You will receive an order confirmation email once your order has been
          placed. Once your order has been shipped, you will receive a shipping
          confirmation email with tracking information.
        </p>
        <p>
          If you need to make changes to your order, please contact us as soon
          as possible. We cannot guarantee that we can make changes once your
          order has been processed.
        </p>
      </PolicyTerm>
    </div>
  );
}

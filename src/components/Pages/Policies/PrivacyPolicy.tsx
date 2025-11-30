import React from "react";
import PolicyTerm from "./PolicyTerm";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col gap-[1.5rem] items-start w-full">
      <h2 className="font-['Sora'] font-bold leading-[1.2] text-[2rem] md:text-[2.5rem] text-[var(--Neutral-800)] tracking-[0.05rem] w-full">
        Privacy Policy
      </h2>

      <div className="font-['Figtree'] font-normal leading-[1.5] text-[1.125rem] text-[var(--Neutral-700)] tracking-[0.0225rem] w-full">
        <p>Effective: November 30, 2025</p>
        <p>
          Home Central is committed to the privacy of your information. This
          Privacy Policy is meant to help you understand the information we
          collect, why we collect it, and how we manage it. This Policy applies
          to our website at{" "}
          <a
            href="https://www.homecentralstores.com/"
            className="underline text-[#841618]"
          >
            https://www.homecentralstores.com/
          </a>{" "}
          (the "Site") and any related products, services, or communications
          (the "Products and/or Services"). By using our Site, or by purchasing
          our Products or Services, you are acknowledging that you have read,
          understood, and accept this Privacy Policy and our Terms of Use.
        </p>
        <p>
          In this Privacy Policy, any use of the words "you," "yours," "users,"
          or similar expressions refers to users of this Site and our Services,
          as well as any other individuals whose information we collect and
          process. References to "we," "us," "our" or similar expressions refer
          to Home Central.
        </p>
        <p>
          This privacy policy only applies to the Site and all products and
          services offered by Home Central.
        </p>
      </div>

      <PolicyTerm title="Personal Information">
        <p>
          We may collect personal information from users in a variety of ways,
          including, but not limited to, when users visit our Site, fill out a
          form, order products from our Site, apply for employment, apply for a
          credit account, or in connection with other activities, services,
          features or resources we make available on our Site. Users may be
          asked for, as appropriate, name, email address, birth month, physical
          or mailing address, and/or phone number. If you apply for a credit
          account or employment, we may collect additional information such as
          your social security number, driver's license number, and date of
          birth. If you apply for a credit account, we will also perform a
          credit check.
        </p>
        <p>
          Users may, however, visit our Site anonymously. We will collect
          personal information from users only if they voluntarily submit such
          information to us. Users can always refuse to supply personal
          information, but doing so may prevent them from engaging in certain
          features on our Site.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Information From Children">
        <p>
          Home Central does not knowingly solicit or collect any personal
          information from anyone under 13 years of age, and children under 13
          are not permitted to register for or use our Site or Services,
          including by subscribing to receive information from Home Central.
          Parents can contact our customer service department to access, change,
          or delete the personal information that has been submitted by a child.
          If we become aware that a child under the age of 13 has provided us
          with personal information, we will delete it.
        </p>
      </PolicyTerm>

      <PolicyTerm title="How We Use Collected Information">
        <p>
          Home Central may collect and use users' personal information for the
          following business purposes:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>To improve our online presence and website for customers.</li>
          <li>To improve our customer service and offer better support.</li>
          <li>To personalize your customer shopping experience.</li>
          <li>To process any financial transactions our customers make.</li>
          <li>
            To send periodic emails or text messages with promotions, account
            information, delivery information, products, company news, or more.
          </li>
          <li>
            To deliver products to the customer, or for identification of pickup
            in store items.
          </li>
          <li>To process credit applications and create customer accounts.</li>
          <li>To process applications for employment.</li>
        </ul>
      </PolicyTerm>

      <PolicyTerm title="How Information May Be Shared">
        <p>
          Home Central will not sell, trade, or rent users' personal
          information. Home Central may share generic information of an
          aggregated nature, not linked to any personal information, regarding
          our users' purchasing habits. Home Central may share personal
          information in certain circumstances where required:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>To comply with laws, legal processes, or legal obligations.</li>
          <li>To establish, protect, or exercise our legal rights.</li>
          <li>
            To detect, prevent, or prosecute those responsible for fraudulent,
            malicious, or illegal activities.
          </li>
          <li>
            To third parties as needed in the regular course of doing business
            on our Site or completing financial transactions.
          </li>
          <li>In the case of any company merger or acquisition.</li>
        </ul>
        <p>
          Home Central cannot be held responsible for any information shared
          with third-party companies in the process of doing business with Home
          Central. We have no control over their policies or actions.
        </p>
      </PolicyTerm>

      <PolicyTerm title="How We Protect Your Information">
        <p>
          Home Central adopts appropriate data collection, storage and
          processing practices and security measures to protect against
          unauthorized access, alteration, disclosure or destruction of users'
          personal information, username, password, transaction information and
          data stored on our Site.
        </p>
        <p>
          You may also contact us to opt out of any promotional or marketing
          material. To do so, please email{" "}
          <a
            href="mailto:hc@homecentralstores.com"
            className="underline text-[#841618]"
          >
            hc@homecentralstores.com
          </a>
          , or write to 151 Central Ave, Owego, NY 13827. We still reserve the
          right to send messages relating to your account, this Site, and/or our
          policies.
        </p>
        <p>
          Home Central is not responsible for any information held by third
          parties that may have information due to the regular course of doing
          business.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Right To Request or Delete Information">
        <p>
          Home Central will retain users' information for as long as is needed
          or required by law. You have the right to request all personal
          information which is being retained. You also have the right to
          request deletion of all personal information that we have collected,
          subject to certain exceptions.
        </p>
        <p>
          All requests should be submitted by email to{" "}
          <a
            href="mailto:hc@homecentralstores.com"
            className="underline text-[#841618]"
          >
            hc@homecentralstores.com
          </a>
          , or by letter to 151 Central Ave., Owego, NY 13827. Requests will be
          acknowledged within 10 business days, with responses within 45 days.
          We will notify you if additional time is needed to process your
          request.
        </p>
      </PolicyTerm>

      <PolicyTerm title="Changes to this Privacy Policy">
        <p>
          Home Central reserves the right to update this privacy policy at any
          time. When we do, we will revise the Effective Date at the top of this
          page. We encourage users to frequently check this page for any changes
          to stay informed about how we are helping to protect the personal
          information we collect. Users acknowledge and agree that it is their
          responsibility to review this privacy policy periodically and become
          aware of modifications.
        </p>
      </PolicyTerm>
    </div>
  );
}

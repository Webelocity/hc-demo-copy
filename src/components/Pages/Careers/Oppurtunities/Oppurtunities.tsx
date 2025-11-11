import Image from "next/image";

export default function Oppurtunities() {
  return (
    <div className="baseContainer py-[2.5rem]">
      <div className="flex flex-col md:flex-row items-start gap-[2.5rem] baseContainer py-[2.5rem] bg-[var(--Secondary-600)] rounded-[var(--Radius-lg)]">
        <div className="flex flex-col items-start gap-[2.5625rem] flex-[1] min-w-0">
          <div className="flex flex-col items-start gap-[1rem] w-full">
            <h3 className="text-[2.5rem] font-bold text-white leading-[1.2] tracking-[0.05rem]">
              Career Opportunities
            </h3>
            <p className="text-[var(--Neutral-100)] text-[1.125rem] leading-[1.5] tracking-[0.0225rem]">
              Jobs at Home Central are diverse and are never limited to a single
              role. Team members are encouraged to learn all facets of our
              operations, including:
            </p>
          </div>

          <div className="flex flex-wrap gap-[1rem] w-full">
            {/* Card 1: Building loads */}
            <div className="bg-[rgba(255,255,255,0.15)] flex flex-col gap-[1rem] items-start p-[1rem] rounded-[var(--Radius-md)] flex-[1] min-w-[19.125rem]">
              <div className="bg-[rgba(255,255,255,0.39)] flex items-center justify-center p-[0.75rem] rounded-[var(--Radius-md)]">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 3.33334C19.0833 3.33334 18.3333 4.08334 18.3333 5.00001V6.66668H13.3333C11.5 6.66668 10 8.16668 10 10V30C10 31.8333 11.5 33.3333 13.3333 33.3333H26.6667C28.5 33.3333 30 31.8333 30 30V10C30 8.16668 28.5 6.66668 26.6667 6.66668H21.6667V5.00001C21.6667 4.08334 20.9167 3.33334 20 3.33334ZM13.3333 10H18.3333V11.6667C18.3333 12.5833 19.0833 13.3333 20 13.3333C20.9167 13.3333 21.6667 12.5833 21.6667 11.6667V10H26.6667V30H13.3333V10ZM15 15V18.3333H25V15H15ZM15 21.6667V25H25V21.6667H15Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="font-semibold text-[1.125rem] text-white leading-[1.2] tracking-[0.0225rem] whitespace-pre-wrap">
                Building loads and receiving products
              </p>
            </div>

            {/* Card 2: Performing inventories */}
            <div className="bg-[rgba(255,255,255,0.15)] flex flex-col gap-[1rem] items-start p-[1rem] rounded-[var(--Radius-md)] flex-[1] min-w-[19.125rem]">
              <div className="bg-[rgba(255,255,255,0.39)] flex items-center justify-center p-[0.75rem] rounded-[var(--Radius-md)]">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.3333 15C33.3333 14.0833 32.9167 13.25 32.25 12.6667L30.5833 11.3333C30.0833 10.9167 29.5 10.6667 28.8333 10.5V8.33334C28.8333 6.50001 27.3333 5.00001 25.5 5.00001H14.5C12.6667 5.00001 11.1667 6.50001 11.1667 8.33334V10.5C10.5 10.6667 9.91667 10.9167 9.41667 11.3333L7.75 12.6667C7.08333 13.25 6.66667 14.0833 6.66667 15V31.6667C6.66667 33.5 8.16667 35 10 35H30C31.8333 35 33.3333 33.5 33.3333 31.6667V15ZM14.5 8.33334H25.5V10H14.5V8.33334ZM10 13.3333H30L30.5833 13.8333C30.8333 14.0833 30.8333 14.5 30.5833 14.75L28.3333 16.6667H25.5C25.5 18.5 23.8333 20 22 20C20.1667 20 18.5 18.5 18.5 16.6667H11.6667L9.41667 14.75C9.16667 14.5 9.16667 14.0833 9.41667 13.8333L10 13.3333Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="font-semibold text-[1.125rem] text-white leading-[1.2] tracking-[0.0225rem] whitespace-pre-wrap">
                Performing inventories and stock management
              </p>
            </div>

            {/* Card 3: Delivering excellent customer service */}
            <div className="bg-[rgba(255,255,255,0.15)] flex flex-col gap-[1rem] items-start p-[1rem] rounded-[var(--Radius-md)] flex-[1] min-w-[19.125rem]">
              <div className="bg-[rgba(255,255,255,0.39)] flex items-center justify-center p-[0.75rem] rounded-[var(--Radius-md)]">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6.66668C16.3333 6.66668 13.3333 9.66668 13.3333 13.3333C13.3333 17 16.3333 20 20 20C23.6667 20 26.6667 17 26.6667 13.3333C26.6667 9.66668 23.6667 6.66668 20 6.66668Z"
                    fill="white"
                  />
                  <path
                    d="M28.8333 23.3333C26.5 21.8333 23.5 21.6667 20 21.6667C16.5 21.6667 13.5 21.8333 11.1667 23.3333C6.66667 25.8333 6.66667 30.3333 6.66667 33.3333H20H33.3333C33.3333 30.3333 33.3333 25.8333 28.8333 23.3333Z"
                    fill="white"
                  />
                  <path
                    d="M31.6667 15C31.6667 14.0833 31 13.3333 30 13.3333C29 13.3333 28.3333 14.0833 28.3333 15V16.0833L27.5833 15.3333C26.9167 14.6667 25.9167 14.6667 25.25 15.3333C24.5833 16 24.5833 17 25.25 17.6667L29.5833 22C30.25 22.6667 31.25 22.6667 31.9167 22L36.25 17.6667C36.9167 17 36.9167 16 36.25 15.3333C35.5833 14.6667 34.5833 14.6667 33.9167 15.3333L33.3333 16.0833V15C33.3333 14.0833 32.6667 13.3333 31.6667 13.3333Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="font-semibold text-[1.125rem] text-white leading-[1.2] tracking-[0.0225rem] whitespace-pre-wrap">
                Delivering excellent customer service
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-[32.875rem] h-[21.0625rem] shrink-0">
          <Image
            className="object-cover rounded-[var(--Radius-md)]"
            src={"/assets/image/Careers/people.svg"}
            alt="Career Opportunities"
            fill
          />
        </div>
      </div>
    </div>
  );
}

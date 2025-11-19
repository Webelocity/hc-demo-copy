"use client";
import Image from "next/image";
import { IoCheckmark, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useAtom } from "jotai";
import { selectedStoreAtom } from "@/atoms/storeAtom";
import {
  getAllStores,
  getStoreStatus,
  StoreId,
  STORE_SCHEDULES,
  formatTime12Hour,
} from "@/util/shedule";
import Button from "@/components/shared/Button";
import Map from "@/components/shared/ContactUs/Map/Map";
import { useState } from "react";

export default function LocationsSelector() {
  const [selectedStore, setSelectedStore] = useAtom(selectedStoreAtom);
  const [expandedStores, setExpandedStores] = useState<Set<StoreId>>(new Set());
  const stores = getAllStores();

  const toggleHours = (storeId: StoreId) => {
    setExpandedStores((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(storeId)) {
        newSet.delete(storeId);
      } else {
        newSet.add(storeId);
      }
      return newSet;
    });
  };

  const renderWeekSchedule = (storeId: StoreId) => {
    const schedule = STORE_SCHEDULES[storeId];
    const days = [
      { key: "monday", label: "Monday" },
      { key: "tuesday", label: "Tuesday" },
      { key: "wednesday", label: "Wednesday" },
      { key: "thursday", label: "Thursday" },
      { key: "friday", label: "Friday" },
      { key: "saturday", label: "Saturday" },
      { key: "sunday", label: "Sunday" },
    ] as const;

    return (
      <div className="flex flex-col gap-[0.25rem] mt-[0.5rem] pl-[0.5rem]">
        {days.map(({ key, label }) => {
          const daySchedule = schedule[key];
          return (
            <div
              key={key}
              className="flex justify-between items-center text-[0.875rem]"
            >
              <span className="text-[var(--Colors-Neutral-700)] min-w-[6rem]">
                {label}
              </span>
              <span className="text-[var(--Colors-Neutral-500)]">
                {daySchedule.closed
                  ? "Closed"
                  : `${formatTime12Hour(daySchedule.open)} - ${formatTime12Hour(
                    daySchedule.close
                  )}`}
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  const renderStatus = (storeId: StoreId) => {
    const status = getStoreStatus(storeId);
    const isExpanded = expandedStores.has(storeId);

    if (status.isClosed24Hours) {
      return (
        <div className="flex flex-col gap-[0.5rem]">
          <div className="flex items-center gap-[0.4rem] font-semibold text-[1.125rem]">
            <span className="text-red-600">Closed Today</span>
            <button
              onClick={() => toggleHours(storeId)}
              className="text-[var(--Colors-Neutral-500)] hover:text-[var(--Colors-Neutral-700)] transition-colors"
              aria-label="Toggle hours"
            >
              {isExpanded ? (
                <IoChevronUp className="w-[1rem] h-[1rem]" />
              ) : (
                <IoChevronDown className="w-[1rem] h-[1rem]" />
              )}
            </button>
          </div>
          {isExpanded && renderWeekSchedule(storeId)}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-[0.5rem]">
        <div className="flex items-center gap-[0.4rem] font-semibold text-[1.125rem]">
          {status.isOpen ? (
            <>
              <span className="text-[var(--Colorsuccess)]">Open</span>
              <span className="text-[var(--Colors-Neutral-500)]">
                until {status.closingTime}
              </span>
            </>
          ) : (
            <>
              <span className="text-red-600">Closed</span>
              {status.openingTime && (
                <span className="text-[var(--Colors-Neutral-500)]">
                  Opens {status.openingTime}
                </span>
              )}
            </>
          )}
          <button
            onClick={() => toggleHours(storeId)}
            className="text-[var(--Colors-Neutral-500)] hover:text-[var(--Colors-Neutral-700)] transition-colors"
            aria-label="Toggle hours"
          >
            {isExpanded ? (
              <IoChevronUp className="w-[1rem] h-[1rem]" />
            ) : (
              <IoChevronDown className="w-[1rem] h-[1rem]" />
            )}
          </button>
        </div>
        {isExpanded && renderWeekSchedule(storeId)}
      </div>
    );
  };

  return (
    <div className="baseContainer">
      <div className="flex maxWidth flex-col lg:flex-row gap-[1.5rem] items-center justify-center  py-[2.5rem]">
        <div className="flex-1 flex flex-col gap-[1rem] w-full">
          {stores.filter((store) => store.name !== "Do it Best").map((store) => {
            const isMyStore = selectedStore === store.id;
            return (
              <div
                key={store.id}
                className="p-[1.5rem] flex items-center gap-[1rem] border border-[var(--Colors-Neutral-100)] rounded-[var(--Radius-md)]"
              >
                <div className="flex-[4] flex flex-col gap-[1rem]">
                  <p className="text-[1.5rem] font-medium">
                    {store.city}, {store.state}
                  </p>
                  <div className="flex flex-col items-start gap-[0.5rem]">
                    <div className="flex justify-start items-center gap-[0.5rem]">
                      <Image
                        className="!relative !w-[1.5rem] !h-[1.5rem]"
                        src="/assets/image/Locations/MapPoint.svg"
                        alt="location"
                        fill
                      />
                      <p className="text-[var(--Colors-Neutral-700)] text-[1.125rem] ">
                        {store.fullAddress}
                      </p>
                    </div>
                    <div className="flex justify-start items-center gap-[0.5rem]">
                      <Image
                        className="!relative !w-[1.5rem] !h-[1.5rem]"
                        src="/assets/image/Locations/Phone.svg"
                        alt="location"
                        fill
                      />
                      <a
                        href={`tel:${store.phone}`}
                        className="text-[var(--secondary-500-main)] text-[1.125rem] "
                      >
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex justify-start items-center gap-[0.5rem]">
                      {store.fax && (
                        <>
                          <Image
                            className="!relative !w-[1.5rem] !h-[1.5rem]"
                            src="/assets/image/Locations/printer.svg"
                            alt="fax"
                            fill
                          />
                          <a
                            href={`tel:${store.fax}`}
                            className="text-[var(--secondary-500-main)] text-[1.125rem] "
                          >
                            {store.fax}
                          </a>
                        </>
                      )}
                    </div>
                    {renderStatus(store.id)}
                  </div>
                </div>
                <div className="flex-[1.2] flex flex-col items-end justify-between gap-[0.5rem] h-[-webkit-fill-available]">
                  {isMyStore ? (
                    <span className="w-fit h-fit p-[0.5rem] flex items-center justify-center gap-[0.5rem] rounded-[var(--Radius-md)] bg-[var(--secondary-500-main)] w-[3rem] h-[3rem] cursor-default">
                      <IoCheckmark className="text-white !w-[1rem] !h-[1rem]" />
                      <p className="text-white text-[0.875rem]">My Store</p>
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedStore(store.id)}
                      className="w-full !py-[0.5rem] !px-[0.75rem] rounded-[var(--Radius-md)] bg-[var(--Colors-Neutral-50)] text-black cursor-pointer"
                    >
                      <p className="text-black text-[0.875rem]">
                        Set as My Store
                      </p>
                    </Button>
                  )}
                  <p className="font-semibold text-[0.875rem] ">2.4 miles</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 w-full h-[-webkit-fill-available]">
          <Map size="large" />
        </div>
      </div>
    </div>

  );
}

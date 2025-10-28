'use client';

import { useState, useMemo } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import { teamMembers } from '@/Data/Team';

type TabType =
  | 'All'
  | 'Ownership'
  | 'General Manager'
  | 'Office Manager'
  | 'Purchasing'
  | 'Accounting'
  | 'IT';

const tabs: TabType[] = [
  'All',
  'Ownership',
  'General Manager',
  'Office Manager',
  'Purchasing',
  'Accounting',
  'IT',
];

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState<TabType>('All');

  const filteredMembers = useMemo(() => {
    if (activeTab === 'All') {
      return teamMembers;
    }
    return teamMembers.filter((member) => member.category === activeTab);
  }, [activeTab]);

  return (
    <div className='baseContainer py-[3rem]'>
      <div className='bg-[var(--Secondary-100)] rounded-[var(--Radius-md)] p-[1.5rem] sm:p-[2rem] md:p-[2.5rem]'>
        <div className='flex flex-col gap-[1.5rem] w-full'>
          {/* Title */}
          <h2 className='font-bold text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] tracking-[0.05rem] text-black text-center w-full font-[family-name:var(--font-sora)]'>
            Meet Our Team
          </h2>

          {/* Tab Bar */}
          <div className='bg-[var(--Secondary-50)] p-[0.75rem] rounded-[var(--Radius-md)] flex items-center justify-center overflow-x-auto gap-[0.5rem]'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                                    flex-1 min-w-fit whitespace-nowrap flex gap-[0.5rem] items-center justify-center 
                                    px-[1.5rem] py-[1rem] rounded-[var(--Radius-md)] 
                                    font-medium text-[0.875rem] leading-[1.5] tracking-[0.0175rem] 
                                    text-black transition-all cursor-pointer
                                    ${
                                      activeTab === tab
                                        ? 'bg-[var(--Secondary-100)]'
                                        : 'bg-transparent hover:bg-[var(--Secondary-100)] hover:bg-opacity-50'
                                    }
                                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[1.25rem] w-full'>
            {filteredMembers.map((member, index) => {
              // Last 3 members span 2 columns on desktop when showing all members
              const isLastThree =
                activeTab === 'All' && index >= filteredMembers.length - 3;
              return (
                <div
                  key={member.id}
                  className={isLastThree ? 'lg:col-span-2' : ''}
                >
                  <TeamCard
                    name={member.name}
                    position={member.position}
                    phone={member.phone}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import ExternalResources from '../ExternalResources/ExternalResources';

const calculatorLinks = [
  {
    title: 'Quikcrete calculators',
    image: '/assets/image/Resources/quikrete.svg',
    url: 'https://www.quikrete.com/calculator.asp',
  },
  {
    title: 'Sloan calculators',
    image: '/assets/image/Resources/sloan.svg',
    url: 'https://www.sloan.com/resources/calculators',
  },
  {
    title: 'Southwire calculators',
    image: '/assets/image/Resources/southwire.svg',
    url: 'https://www.southwire.com/calculator-to-conduit-fill',
  },
];

export default function UsefulLinks() {
  return (
    <section className='w-full bg-white py-10'>
      <div className='baseContainer'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          {/* Useful Links Card - Left Side */}
          <div className='bg-[#181464] rounded-2xl p-6 md:p-10 lg:row-span-2'>
            <div className='flex flex-col gap-10 h-full justify-center py-4'>
              <h2 className='font-bold text-white text-[2rem] sm:text-[2.5rem] leading-[1.2] tracking-[0.05rem]'>
                Useful links for quick calculations
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1'>
                {calculatorLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`bg-white/15 rounded-2xl p-4 flex flex-col gap-4 hover:bg-white/20 transition-colors group ${index === 2 ? 'sm:col-span-2' : ''
                      }`}
                  >
                    <div className='relative w-full h-[-webkit-fill-available] min-h-[10rem] rounded-xl overflow-hidden bg-white/5'>
                      <Image
                        src={link.image}
                        alt={link.title}
                        fill
                        className='object-contain p-4'
                      />
                    </div>

                    <div className='flex items-center justify-center gap-2 py-4'>
                      <span className='font-semibold text-white text-[1.125rem] leading-[1.2] tracking-[0.0225rem]'>
                        {link.title}
                      </span>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='shrink-0'
                      >
                        <path
                          d='M3.5 12.5L12.5 3.5M12.5 3.5H3.5M12.5 3.5V12.5'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* External Resources - Right Side on Desktop */}
          <ExternalResources />
        </div>
      </div>
    </section>
  );
}

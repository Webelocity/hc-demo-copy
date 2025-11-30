'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ExternalResources() {
  return (
    <>
      {/* Wilsonart Visualizer Card */}
      <div className='bg-[#181464] rounded-2xl p-6 md:p-10 flex flex-col gap-8 md:gap-12'>
        <div className='w-[5.06rem] h-[-webkit-fill-available] min-h-[5.06rem] md:w-[7.33rem] md:h-[7.33rem] relative'>
          <Image
            src='/assets/image/Resources/wilsonart-logo.svg'
            alt='Wilsonart Visualizer'
            fill
            className='object-contain'
          />
        </div>

        <div className='flex flex-col gap-6'>
          <h2 className=' font-bold text-white text-[1.5rem] md:text-[2.5rem] leading-[1.2] tracking-[0.05rem]'>
            Visualize Before You Buy
          </h2>

          <Link
            href='https://visualizapro.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 py-4 hover:opacity-80 transition-opacity group w-fit'
          >
            <span className='font-figtree font-medium text-white text-[1rem] leading-[1.2] tracking-[0.02rem]'>
              Wilsonart Visualizer
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
          </Link>
        </div>
      </div>

      {/* Blocklayer Card */}
      <div className='bg-[#181464] rounded-2xl p-6 md:p-10 flex flex-col gap-8 md:gap-12'>
        <div className='flex items-center gap-2 md:gap-3 bg-white/5 rounded-[1.09rem] p-[0.56rem] md:p-[0.82rem] w-fit'>
          <div className='w-[2.35rem] h-[2.35rem] md:w-[3.41rem] md:h-[3.41rem] relative rounded overflow-hidden'>
            <Image
              src='/assets/image/Resources/blocklayer-icon.svg'
              alt='Blocklayer'
              fill
              className='object-cover'
            />
          </div>
          <div className='flex items-baseline gap-1 md:gap-2 font-figtree font-bold italic'>
            <span className='text-[1.5rem] md:text-[2.55rem] leading-[1.2] tracking-[0.051rem] text-[#A52A2A]'>
              blocklayer
            </span>
            <span className='text-[0.89rem] md:text-[1.53rem] leading-[1.2] tracking-[0.031rem] text-[#A52A2A]'>
              .com
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <h2 className=' font-bold text-white text-[1.5rem] md:text-[2.5rem] leading-[1.2] tracking-[0.05rem]'>
            Calculators, Plans, and Templates for Contractors
          </h2>

          <Link
            href='http://blocklayer.com'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 py-4 hover:opacity-80 transition-opacity group w-fit'
          >
            <span className='font-figtree font-medium text-white text-[1rem] leading-[1.2] tracking-[0.02rem]'>
              Blocklayer.com
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
          </Link>
        </div>
      </div>
    </>
  );
}

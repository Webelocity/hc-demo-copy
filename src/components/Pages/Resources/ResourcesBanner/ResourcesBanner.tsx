'use client';

export default function ResourcesBanner() {
  return (
    <section className='w-full baseContainer bg-white py-6'>
      <div className='maxWidth'>
        <div className='relative flex items-center justify-center rounded-2xl px-10 py-20 min-h-[25rem]'>
          {/* Background layers with exact positioning */}
          <div
            aria-hidden='true'
            className='absolute inset-0 pointer-events-none rounded-2xl'
          >
            {/* Base background color */}
            <div className='absolute bg-[#841618] inset-0 rounded-2xl' />

            {/* Calculator Image Container - positioned exactly as Figma */}
            <div className='absolute inset-0 overflow-hidden rounded-2xl'>
              {/* Mobile: centered and contained */}
              <img
                src='/assets/image/Resources/calculator.png'
                alt=''
                className='absolute inset-0 w-full h-full object-contain object-center md:hidden'
              />
              {/* Desktop: positioned on the right */}
              <img
                src='/assets/image/Resources/calculator.png'
                alt=''
                className='absolute max-w-none hidden md:block'
                style={{
                  left: '57.78%',
                  top: '-9.08%',
                  width: '46.32%',
                  height: '173.01%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Dark overlay */}
            <div className='absolute bg-black/20 inset-0 rounded-2xl' />
          </div>

          {/* Content */}
          <div className='relative z-10 flex flex-col gap-4 items-center max-w-[50rem] w-full'>
            <h1 className='font-bold text-white text-[2rem] md:text-[3rem] leading-[1.2] tracking-[0.06rem] text-center max-w-[32.625rem] whitespace-pre-wrap'>
              Tools & Resources for Contractors and DIY Projects
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

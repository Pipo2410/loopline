import { AnimatedGroup } from '@workspace/ui/components/animated-group';
import { Button } from '@workspace/ui/components/button';
import { TextEffect } from '@workspace/ui/components/text-effect';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import ArcjetLogo from '@/public/companies/arcjet.png';
import KindeLogo from '@/public/companies/kinde.png';
import MotionLogo from '@/public/companies/motion-logo.png';
import NeonLogo from '@/public/companies/neondb.png';
import OrpcLogo from '@/public/companies/orpc.webp';
import PrismaLogo from '@/public/companies/prisma-logo.svg';
import VercelLogo from '@/public/companies/vercel-logo.svg';
import BackgroundImage from '@/public/night-background.webp';
import HeroDark from '@/public/screenshot-dark.png';
import HeroLight from '@/public/screenshot-light.png';

const transitionVariants = {
  item: {
    hidden: {
      filter: 'blur(12px)',
      opacity: 0,
      y: 12,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      transition: {
        bounce: 0.3,
        duration: 1.5,
        type: 'spring' as const,
      },
      y: 0,
    },
  },
};

export const HeroSection = () => (
  <>
    <main className='overflow-hidden'>
      <div
        aria-hidden
        className='absolute inset-0 isolate hidden opacity-65 contain-strict lg:block'
      >
        <div className='w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]' />
        <div className='h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]' />
        <div className='h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]' />
      </div>
      <section>
        <div className='relative pt-24 md:pt-36'>
          <AnimatedGroup
            className='mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32'
            variants={{
              container: {
                visible: {
                  transition: {
                    delayChildren: 1,
                  },
                },
              },
              item: {
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    bounce: 0.3,
                    duration: 2,
                  },
                },
              },
            }}
          >
            <Image
              alt='background'
              className='hidden size-full dark:block'
              height='4095'
              src={BackgroundImage}
              width='3276'
            />
          </AnimatedGroup>

          <div
            aria-hidden
            className='absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]'
          />

          <div className='mx-auto max-w-7xl px-6'>
            <div className='text-center sm:mx-auto lg:mr-auto lg:mt-0'>
              <AnimatedGroup variants={transitionVariants}>
                <Link
                  className='hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950'
                  href='#link'
                >
                  <span className='text-foreground text-sm'>
                    Introducing new AI features
                  </span>
                  <span className='dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700'></span>

                  <div className='bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500'>
                    <div className='flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0'>
                      <span className='flex size-6'>
                        <ArrowRight className='m-auto size-3' />
                      </span>
                      <span className='flex size-6'>
                        <ArrowRight className='m-auto size-3' />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedGroup>

              <TextEffect
                as='h1'
                className='mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]'
                preset='fade-in-blur'
                speedSegment={0.3}
              >
                The AI-ready home for team communication
              </TextEffect>
              <TextEffect
                as='p'
                className='mx-auto mt-8 max-w-2xl text-balance text-lg'
                delay={0.5}
                per='line'
                preset='fade-in-blur'
                speedSegment={0.3}
              >
                Loopline organizes conversations into channels with threads, is
                realtime and uses AI to keep teams in sync.
              </TextEffect>

              <AnimatedGroup
                className='mt-12 flex flex-col items-center justify-center gap-5 md:flex-row'
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
              >
                <div
                  className='bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5'
                  key={1}
                >
                  <Button
                    asChild
                    className='rounded-xl px-5 text-base'
                    size='lg'
                  >
                    <Link href='#link'>
                      <span className='text-nowrap'>Try it out</span>
                    </Link>
                  </Button>
                </div>
                <Button
                  asChild
                  className='h-10.5 rounded-xl px-5'
                  key={2}
                  size='lg'
                  variant='secondary'
                >
                  <Link href='#link'>
                    <span className='text-nowrap'>Request a demo</span>
                  </Link>
                </Button>
              </AnimatedGroup>
            </div>
          </div>

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className='mask-b-from-55% relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20'>
              <div className='inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1'>
                <Image
                  alt='app screen'
                  className='bg-background aspect-15/8 relative hidden rounded-2xl dark:block object-contain object-top'
                  height='1440'
                  src={HeroDark}
                  width='2700'
                />
                <Image
                  alt='app screen'
                  className='z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden object-contain object-top'
                  height='1440'
                  src={HeroLight}
                  width='2700'
                />
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>
      <section className='bg-background pb-16 pt-16 md:pb-32'>
        <div className='group relative m-auto max-w-5xl px-6'>
          <div className='absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100'>
            <Link
              className='block text-sm duration-150 hover:opacity-75'
              href='/'
            >
              <span> Meet Our Customers</span>

              <ChevronRight className='ml-1 inline-block size-3' />
            </Link>
          </div>
          <div className='group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14'>
            <div className='flex'>
              <Image
                alt='Arcjet Logo'
                className='mx-auto h-7 object-contain dark:invert'
                src={ArcjetLogo}
              />
            </div>

            <div className='flex'>
              <Image
                alt='Kinde Logo'
                className='mx-auto h-4 w-fit dark:invert'
                src={KindeLogo}
              />
            </div>
            <div className='flex'>
              <Image
                alt='Vercel Logo'
                className='mx-auto h-4 w-fit dark:invert'
                src={VercelLogo}
              />
            </div>
            <div className='flex'>
              <Image
                alt='Neon Logo'
                className='mx-auto h-5 w-fit invert dark:invert-0'
                src={NeonLogo}
              />
            </div>
            <div className='flex'>
              <Image
                alt='Orpc Logo'
                className='mx-auto h-6 w-fit'
                src={OrpcLogo}
              />
            </div>
            <div className='flex'>
              <Image
                alt='Prisma Logo'
                className='mx-auto h-6 w-fit dark:invert'
                src={PrismaLogo}
              />
            </div>
            <div className='flex'>
              <Image
                alt='Motion Logo'
                className='mx-auto h-7 w-fit invert dark:invert-0'
                src={MotionLogo}
              />
            </div>

            <div className='flex'>
              <img
                alt='OpenAI Logo'
                className='mx-auto h-6 w-fit dark:invert'
                height='24'
                src='https://html.tailus.io/blocks/customers/openai.svg'
                width='auto'
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
);

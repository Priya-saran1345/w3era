import React from 'react'
import Button from '@/components/button'
import Image from 'next/image'
import Link from 'next/link'
const index = ({ props }: any) => {
    return (
        <div className='w-full bg-lightblue py-10 text-white  lg:py-16'>
            <div className='xl:w-[75%] px-4 mx-auto flex flex-col gap-10'>
                <div className='md:w-[80%] flex flex-col gap-4 mx-auto'>

                    <p className=' text-[32px] text-center lg:text-[38px] font-bold text-homeblack leading-[45px]'>{props?.title || ''}</p>
                    <p className=' text-center text-[18px]  text-homegrey '>{props?.description ||
                     '  '}</p>
                </div>

                <div className='flex justify-center gap-5 flex-wrap'>
                    {
                        props?.card?.map((elem: any, i:number) => (
                            <div key={i} className='rounded-xl p-8  sm:w-[45%] lg:w-[31%]  flex flex-col gap-2 justify-between bg-white hover:shadow-xl'>

                                {
                                    elem?.icon &&
                                    <div className='p-4 size-[72px] flex justify-center items-center rounded-lg bg-lightblue'>
                                        <Image
                                            src={elem?.icon || ''}
                                            alt={''}
                                            height={48}
                                            width={36}
                                            className={''}
                                        />
                                    </div>
                                }
                                <p className='text-[26px] font-medium text-homeblack leading-[31px]'>{elem?.title}</p>
                                <p
                                    className='text-[16px] text-homegrey leading-[22px]'
                                    dangerouslySetInnerHTML={{ __html: elem?.description   }}
                                />
                                <div>
                                   
                                </div>
                            </div>

                        ))
                    }
                </div>
                <div className='flex justify-center'>
                    <Link href={'/get-a-free-quote'}>
                    <Button content={'Get a Quote Now!'} />
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default index
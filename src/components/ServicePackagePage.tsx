"use client"
import Header from '@/components/header'
import Navbar from '@/components/navbar'
import Image from 'next/image'
import Footer from '@/components/footer'
import Revenue from '@/components/revenue'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '@/util/api'
import { usePathname, useRouter } from 'next/navigation';
import Blogs from '@/components/blogs'
import React from 'react'
import QuickLinks from '@/components/quickLinks'
import Faq from '@/components/faqComp'
import Choose from '@/components/Choose'
import ClientSays from '@/components/clientSays'
import Button from '@/components/button'
import SeoService from '@/components/seoService'
import MarketingServices from '@/components/marketingServices'
import TrustedPartner from '@/components/trustedPartner'
import CluthRating from '@/components/cluthRating'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import WebsiteReport from '@/components/websiteReport'
import Cricial from '@/components/crucial'
import Visiblity from '@/components/visiblity'
import CommonBanner from '@/components/Common-Banner'
import Loader from '@/components/loader'
import { Useapi } from '@/helpers/apiContext';
import { IoCheckmark } from 'react-icons/io5'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Packages from '@/components/Packages/index'
import Link from 'next/link'
import Other from '@/components/OtherPage'

const Service_Pkackages = () => {
    const { basic_details } = Useapi();
    const { cluth } = Useapi()
    const [data, setdata] = useState<any>()
    const pathname = usePathname();
    const segments = pathname.replace(/\/$/, '').split('/');
    const lastsegment = segments.pop();
    const [result, setresult] = useState<any>(null);
    const [packageCards, setPackageCards] = useState<any>([]);
    const [expanded, setExpanded] = useState<number | null>(0); // To track which card is expanded
    const [activePlan, setActivePlan] = useState<string | null>('Professional'); // Default to "Professional"
    const router = useRouter();
const [quicklinks, setquicklinks] = useState<any>()
    const fetchPackages = async () => {
        try {
            const response = await axios.get(`${BASE_URL}service-packages/${lastsegment}/`);
            setresult(response.data);
        } catch (error: any) {
            console.log('service ,package error', error);
            if (error?.response?.status === 404) {
                router.push('/not/found')
            }}
        try {
            const response = await axios.get(`${BASE_URL}quick-link/${lastsegment}/`);
            console.log('quick links',(response.data.link_category
            ))
            setquicklinks(response.data.link_category);
        } catch (error: any) {
            console.log('quicklinks error', error);  
        }
    };
    // Effect to fetch data
    useEffect(() => {
        fetchPackages();
    }, []);
    // Effect to filter and set package cards
    useEffect(() => {
        setPackageCards(result?.data?.packagecategory?.filter((elem: any, index: number) => index > 0));
    }, [result]);
    // Toggle expand/collapse for cards
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    console.log('packages data-------------------',packageCards)
    // Function to toggle a particular card's expanded state
    const toggleExpand = (index: number) => {
        if (expandedIndices.includes(index)) {
            setExpandedIndices(expandedIndices.filter((i) => i !== index));
        } else {
            setExpandedIndices([...expandedIndices, index]);
        }
    };

    // Function to handle the plan selection
    const handleSelectPlan = (plan: string) => {
        setActivePlan(plan);
    };

    useEffect(() => {
        setdata(result?.data)
    }, [result])

    const renderCell = (value: string, planType: string) => {
        const lowerValue = value?.toLowerCase();
        const isActive = activePlan === planType; // Check if the current plan type is active
        const cellClasses = `flex flex-1 items-center justify-center p-2 font-medium ${isActive ? 'bg-lightblue' : ''
            }`;
        if (lowerValue === 'true') {
            return <div className={cellClasses}><IoCheckmark className="text-[24px] text-blue"/></div>;
        }
         else if (lowerValue === 'false') {
            return <div className={cellClasses}><RxCross2 className="text-[24px] font-semibold text-homegrey"/></div>;
        }
        return <div className={cellClasses}>{value?value:
            <Link href={'/get-a-free-quote'}>
        <Button content='Get a quote'/>
        </Link>}</div>;
    };
    
    return (
        <div >
            {
                !result &&
                <Loader />
            }
            {
                result &&
                <div>
                    {result?.pagetype == 'service' &&
                        <div className=''>
                            <Header />
                            <Navbar />
                            <CommonBanner status={'true'} title={data?.title} description={data?.description} image={data?.image} btntext={data?.link_text} btnlink={data?.link_url} />
                            {
                            data?.aboutservice?.title || data?.aboutservice?.subtitle || data?.aboutservice?.description ? (
                                <div className='bg-white mt-12 mb-8 xl:w-[75%] px-4 xl:px-0 mx-auto'>
                                    <p className='text-homeblack text-[28px] text-center font-bold lg:text-[38px]'>
                                        {data?.aboutservice?.title || ''}
                                    </p>
                                    <div className='flex justify-between items-center  lg:gap-16'>
                                            {data?.aboutservice?.image && (
                                        <div className=' hidden lg:block min-w-[377px]'>
                                                <Image
                                                    src={data?.aboutservice?.image || ''}
                                                    height={377}
                                                    width={545}
                                                    alt=''
                                                    className=''
                                                />
                                        </div>
                                    )}
                                        </div>
                                        <StyledWrapper>
                                        <div className='w-full '>
                                            <p className='text-homeblack text-[24px] font-semibold leading-[29px]'>
                                                {data?.aboutservice?.subtitle || ''}
                                            </p>
                                            <p
                                                className='text-homegrey text-[18px] mt-4'
                                                dangerouslySetInnerHTML={{ __html: data?.aboutservice?.description || '' }}
                                            />
                                        </div>
                                            </StyledWrapper>
                                    </div>
                                // </div>
                            ) : null
                            }

                            {
                                data?.clients_say &&
                                <ClientSays props={data?.clients_say} />
                            }
                            {/* content 1 section */}
                            {
                                data?.contentsection1?.description &&
                                <div className='w-full mx-auto xl:w-[75%] flex flex-col gap-4 px-6 xl:px-2 py-12'>

                                    <StyledWrapper>
                                        <p
                                            className="text-homegrey text-[18px]"
                                            dangerouslySetInnerHTML={{ __html: data?.contentsection1?.description || '' }}
                                        />
                                    </StyledWrapper>
                                </div>

                            }

                            {
                                data?.service_card1.length > 0 &&
                                <SeoService props={data?.service_card1[0]} />
                            }
                            {/* content 2 section */}
                            {data?.contentsection2?.description &&

                                <div className='xl:w-[75%] px-6 mx-auto py-12 flex flex-col gap-8  lg:py-16'>
                                    {/* <p className='text-center text-[28px] lg:text-[38px] text-homeblack font-bold'>{data?.contentsection2[0]?.title}</p> */}
                                    <StyledWrapper>
                                        <p className='text-[18px] text-homegrey ' dangerouslySetInnerHTML={{ __html: data?.contentsection2?.description || '' }} />
                                    </StyledWrapper>
                                </div>

                            }
                            <div className='w-full bg-blue py-10 text-white  lg:py-16'>
                                <div className=' md:w-[75%] mx-auto xl:w-[50%]'>
                                    <p className=' text-[28px] font-bold text-center lg:leading-[46px] lg:text-[38px]'>Get A Top Rank on Google Search Results,
                                        Qualified Leads and Increased Sales
                                    </p>
                                    <div className='flex flex-wrap mt-8 justify-center gap-4'>
                                        <Link href='/get-a-free-quote'>
                                        <Button content={'Get a Quote Now!'} />
                                        </Link>
                                        <Link href='/get-a-free-strategy-review'>
                                        <Button content={'Analyse my Website for Free!'} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {data?.contentsection3?.description && (
                                <div className='w-full mx-auto xl:w-[75%] flex flex-col gap-4 px-6 xl:px-2 py-12'>
                                    <div>
                                        {/* Uncomment this if you want to show the title */}
                                        {/* <p className='text-[28px] text-homeblack font-semibold lg:text-[38px]'>{data?.contentsection3?.title}</p> */}
                                        <StyledWrapper>
                                            <p className='text-homegrey text-[18px]' dangerouslySetInnerHTML={{ __html: data.contentsection3.description || '' }} />
                                        </StyledWrapper>
                                    </div>
                                </div>
                            )}
                            {
                                data?.service_card2.length > 0 &&
                                <MarketingServices props={data?.service_card2[0]} />
                            }
                            {data?.service_type.length > 0 && (
                                <TrustedPartner props={data?.service_type[0]} />
                            )}
                            <Revenue />
                            {data?.why_choose  &&
                                <Choose props={data?.why_choose} />
                            }
                            {
                                data?.our_package.length > 0 &&
                                <Packages props={data?.our_package} />
                            }
                            <CluthRating props={cluth} />
                            {
                                data?.marketing_agency.length > 0 &&
                                <Faq props={data?.marketing_agency} />
                            }
                            { quicklinks&&
                                <QuickLinks props={quicklinks } />
                            }
                            {
                                data?.service_card3.length > 0 &&
                                <MarketingServices props={data?.service_card3[0]} />
                            }
                            <Blogs props={data?.blog} />
                            <Footer />
                        </div>
                    }
                    {
                        result?.pagetype == 'package' &&
                        <div className='w-full'>
                            <Header />
                            <Navbar />
                            <CommonBanner title={data?.title}
                             status={'true'}
                                description={data?.description} image={data?.image} btntext={data?.link_text} btnlink={data?.link_url} />
                            <div className='bg-white  w-full px-4 xl:w-[75%] mx-auto py-10 lg:py-16'>
                                <div className='mt-16'>
                                    <div className='shadow-lg  p-5 border-slate-200 border-[1px]  rounded-2xl mb-4'>
                                        <div className='overflow-x-auto'>
                                            <div className='flex justify-start mb-14'>
                                                <div className='min-w-[25%] min-h-full flex  items-center '>   <p className="text-[24px] font-semibold">{data?.packagecategory[0]?.title || ''}</p></div>
                                                <div className='w-full min-w-[800px] flex justify-around '>
                                                    {['Basic', 'Advanced', 'Professional', 'Premium'].map((plan, index) => (
                                                        <div key={index} className='flex flex-col items-center'>
                                                            <div className='w-fit ' onClick={() => handleSelectPlan(plan)}>
                                                                < Button content={`${plan}`} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <table className='w-full min-w-[900px] '>
                                                <tbody className='text-[18px] font-medium flex flex-col gap-3 text-textGrey'>
                                                    {data?.packagecategory[0]?.card.map((item: any, cardIndex: any) => (
                                                        <tr className='border-b-2 flex border-slate-200  ' key={cardIndex}>
                                                            <td className='w-[30%] p-2'>{item?.title}</td>
                                                            <div className='w-full flex justify-around'>
                                                                <td className="flex flex-1 items-center justify-center   p-2 font-medium">
                                                                    {/* {renderCell(item?.basic_type)} */}
                                                                    {renderCell(item.basic_type, "Basic")}

                                                                </td>
                                                                <td className="flex flex-1 items-center  p-2 justify-center font-medium">
                                                                    {/* {renderCell(item?.advance_type)} */}
                                                                    {renderCell(item.advance_type, "Advanced")}

                                                                </td>
                                                                <td className="flex flex-1 items-center  p-2 justify-center font-medium">
                                                                    {/* {renderCell(item?.professional_type)} */}
                                                                    {renderCell(item.professional_type, "Professional")}

                                                                </td>
                                                                <td className="flex flex-1 items-center p-2 justify-center font-medium">
                                                                    {/* {renderCell(item?.premium_type)} */}
                                                                    {renderCell(item.premium_type, "Premium")}

                                                                </td>
                                                            </div>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        {packageCards?.map((elem: any, index: any) => (
                                            <motion.div
                                                key={elem.id}
                                                className="mb-4 rounded-2xl border-[1px] border-slate-200 p-2 shadow-lg"
                                                initial={false}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div
                                                    className="flex cursor-pointer items-center gap-3 p-4"
                                                    onClick={() => toggleExpand(index)}
                                                >
                                                    <p className="text-[20px] font-semibold">{elem.title}</p>
                                                    <motion.div
                                                        animate={{ rotate: expandedIndices.includes(index) ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {expandedIndices.includes(index) ? (
                                                            <FaMinus className="rounded-md bg-grey p-2 text-[36px]" />
                                                        ) : (
                                                            <FaPlus className="rounded-md bg-grey p-2 text-[36px]" />
                                                        )}
                                                    </motion.div>
                                                </div>
                                                <AnimatePresence initial={false}>
                                                    {expandedIndices.includes(index) && (
                                                        <motion.div
                                                            key="content"
                                                            initial="collapsed"
                                                            animate="open"
                                                            exit="collapsed"
                                                            variants={{
                                                                open: { opacity: 1, height: "auto" },
                                                                collapsed: { opacity: 0, height: 0 }
                                                            }}
                                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                        >
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                                className="overflow-x-auto p-4"
                                                            >
                                                                <table className="w-full min-w-[900px]">
                                                                    <tbody className="flex flex-col  gap-3 text-[18px] text-textGrey">
                                                                        {elem?.card?.map((item: any, cardIndex: number) => (
                                                                            <tr key={cardIndex} className="flex border-b-2 border-slate-200">
                                                                                <td className="w-[30%] p-2 font-medium">{item.title}</td>
                                                                                {/* Apply renderCell with plan type */}
                                                                                <td className="flex flex-1 items-center justify-center p-2 font-medium">
                                                                                    {renderCell(item.basic_type, "Basic")}
                                                                                </td>
                                                                                <td className="flex flex-1 items-center justify-center p-2 font-medium">
                                                                                    {renderCell(item.advance_type, "Advanced")}
                                                                                </td>
                                                                                <td className="flex flex-1 items-center justify-center p-2 font-medium">
                                                                                    {renderCell(item.professional_type, "Professional")}
                                                                                </td>
                                                                                <td className="flex flex-1 items-center justify-center p-2 font-medium">
                                                                                    {renderCell(item.premium_type, "Premium")}
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </motion.div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {
                                data?.clients_say &&
                                <ClientSays props={data?.clients_say} />
                            }
                            <div className='w-full bg-blue py-10 text-white  lg:py-16'>
                                <div className=' md:w-[75%] mx-auto xl:w-[50%]'>
                                    <p className=' text-[28px] font-bold text-center lg:leading-[46px] lg:text-[38px]'>Get A Top Rank on Google Search Results,
                                        Qualified Leads and Increased Sales
                                    </p>
                                    <div className='flex flex-wrap mt-8 justify-center gap-4'>
                                        <Link href='/get-a-free-quote'>
                                        <Button content={'Get a Quote Now!'} />
                                        </Link>
                                        <Link href='/get-a-free-strategy-review'>
                                        </Link>
                                        <Link href='/get-a-free-strategy-review'>
                                        <Button content={'Analyse my Website for Free!'} />
                                        </Link>
                                    </div>
                                   
                                </div>
                            </div>
                            {
                                data?.contentsection1?.description &&
                                <div className='w-full mx-auto xl:w-[75%] flex flex-col gap-4 px-6  py-12'>
                                    {/* <p className='text-[ 28px] text-homeblack font-semibold lg:text-[38px]'>Affordable SEO Pricing Packages</p> */}
                                    <p
                                        className='text-homegrey text-[18px]'
                                        dangerouslySetInnerHTML={{ __html: data?.contentsection1?.description }}
                                    />
                                </div>
                            }
                            {
                                data?.packagecard1.card?.length > 0 &&
                                <Visiblity props={data?.packagecard1} />
                            }
                            <Revenue />
                            {data?.marketing_agency.length > 0 &&

                                <Faq props={data?.marketing_agency} />
                            }
                            <WebsiteReport />
                            {
                                data?.why_choose &&
                                <Choose props={data?.why_choose} />
                            }
                            {
                                data?.our_package.length > 0 &&
                                <Packages props={data?.our_package} />
                            }
                            {
                                data?.packagecard2.card?.length > 0 &&
                                <Cricial props={data?.packagecard2} />
                            }
                            <div className='bg-blue text-white w-full py-12 lg:py-16'>
                                <div className=' mx-auto w-full md:w-[75%] lg:w-[55%]'>
                                    <p className=' text-[28px] leading-tight md:leading-normal mb-4 md:text-[38px] font-semibold text-center'>Want to know the SEO score of your website for free?</p>
                                    <p className='text-[18px] text-center leading-[21px]'>Try our free Website Analyzer Tool that will show you the SEO report. In this report, you will discover
                                        whether your website is optimized for the keywords you have used.</p>
                                    <div className='flex justify-center items-center mt-9'>
                                        <Link href={'/get-a-free-quote'}>
                                        <Button content={'Get a Free SEO Report'} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {
quicklinks&&
                            <QuickLinks props={quicklinks} />
                            }
                            <Blogs props={data?.blog} />
                          
                            <Footer />
                        </div>
                    }
                    {
                        result?.pagetype == 'other_pages' &&
                        <Other props={result}/>

                    }
                </div>
            }
        </div>
    )
}
export default Service_Pkackages

const StyledWrapper = styled.div`
  ul {
    list-style: disc;
  }

 
    h2 ,h1{

    font-size: 28px !important; /* 36px */
    font-weight: 700; /* Bold */
  }

  h3 {

    font-size: 1.5rem; /* 24px */
    font-weight: 600; /* Semi-Bold */
  }

  h4 {

    font-size: 1.25rem; /* 20px */
    font-weight: 600; /* Semi-Bold */
  }

  h5 {

    font-size: 5rem; /* 16px */
    font-weight: 500; /* Medium */
  }

  h6 {

    font-size: 0.875rem; /* 14px */
    font-weight: 400; /* Medium */
  }
 p {
  font-size: 1rem; /* 16px */
  font-weight: 400; /* Regular */
  color: #535353; /* Replace with your color */
}
  ol, ul {
    padding-left: 1.5rem;
    list-style-type:disc;
  }
    table{
    border:1px solid black;
    margin-top:26px ;
    margin-bottom:26px
    width:100% ;
    }
    td{
    padding-x:10px;
    border:1px solid black;}
    a{
    color:red;
    font-weight:500;}
`


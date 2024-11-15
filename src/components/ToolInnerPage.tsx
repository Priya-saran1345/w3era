"use client";
import Footer from '@/components/footer';
import Header from '@/components/header';
import Navbar from '@/components/navbar';
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/util/api';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import Button from '@/components/button';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import Loader from '@/components/loader';
import { div } from 'framer-motion/client';

const Tool = () => {
    const [innerloading, setinnerloading] = useState<any>(false)
    const pathname = usePathname();
    const segments = pathname.replace(/\/$/, '').split('/');
    const lastSegment = segments.pop();
    const [url, setUrl] = useState<string>(''); // Specify type as string
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const [result, setResult] = useState<any>(null); // Result state
    const [tools, setTools] = useState<any[]>([]);
    const [currentTool, setCurrentTool] = useState<any[]>([]);
    const [showresult, setshowresult] = useState<any>(false)
    const [keywords, setkeywords] = useState<any>()
    const [MetaTitle, setMetaTitle] = useState<any>()
    const [description, setdescription] = useState<any>()
    const [depth, setdepth] = useState<any>()
    const [pageno, setpageno] = useState<any>()
    const [tools_body, settools_body] = useState<any>()
    const [useragent, setuseragent] = useState<any>()
    const [allowpath, setallowpath] = useState<any>()
    const [disallowpath, setdisallowpath] = useState<any>()
    const [crawlDelay, setcrawlDelay] = useState<any>()
    const [sitemapUrl, setsitemapUrl] = useState<any>()
    // Function to fetch tools from the API
    const fetchTools = async () => {
        try {
            const response = await axios.get(`${BASE_URL}tools/`);
            setTools(response.data);
        } catch (error: any) {
            console.log("tools error", error.message);
        }
        try {
            const response = await axios.get(`${BASE_URL}tools/${lastSegment}`);
            settools_body(response.data);
        } catch (error: any) {
            console.log("tool body error", error.message);
        }
    };
    useEffect(() => {
        fetchTools();
    }, []);
    useEffect(() => {
        setCurrentTool(
            tools?.filter((elem: any) => elem?.slug_link === lastSegment)
        );
    }, [tools, lastSegment]);
    const fetchResult = async () => {
        setshowresult(true)
        setLoading(true); // Set loading to true
        setError(null); // Reset error state

        try {
            const response = await axios.post(`${BASE_URL}tools/${lastSegment}`, {
                url, keywords, MetaTitle, description, pageno, depth, useragent, disallowpath, allowpath ,sitemapUrl,crawlDelay
            }); // Send URL in payload
            setResult(response.data); // Save result in state
            setinnerloading(true)
            console.log(response);
        } catch (error: any) {
            setError(error.message); // Set error message
            console.log("Service error", error.message);
        }
        finally {
            setLoading(false); // Set loading to false
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        // Prevent default form submission
        fetchResult(); // Call fetch on submit
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };
    const handleKeyword = (e: any) => {
        setkeywords(e.target.value)
    }
    const handleuseragent = (e: any) => {
        setuseragent(e.target.value)
    }
    const handleMetatitle = (e: any) => {
        setMetaTitle(e.target.value)
    }
    const handleDescription = (e: any) => {
        setdescription(e.target.value)
    }
    const handleDepth = (e: any) => {
        setdepth(e.target.value)
    }
    const handlePageno = (e: any) => {
        setpageno(e.target.value)
    }
    const handleDisallowpaths = (e: any) => {
        setdisallowpath(e.target.value)
    }
    const handleallowpaths = (e: any) => {
        setallowpath(e.target.value)
    }
    const handleCrawldelay = (e: any) => {
        setcrawlDelay(e.target.value)
    }
    const handleSitemapurl = (e: any) => {
        setsitemapUrl(e.target.value)
    }
    const handleClear = () => {
        setUrl('');
        setkeywords('');
        setMetaTitle('');
        setdescription('');
        setdepth('');
        setpageno('');
        disallowpath('');
        crawlDelay('');
        setsitemapUrl('');
        setResult(null);
        setshowresult(false);
    };

    return (
        <>
            {
                !tools &&
                <Loader />
            }
            {
                tools &&
                <div>
                    <Header />
                    <Navbar />
                    <div className='w-full'>
                        <div className='w-full bg-no-repeat bg-center bg-[url("/images/tool-bg.png")] py-9 flex flex-col justify-center items-center'>
                            <p className='text-[32px] lg:text-[44px] font-bold text-white'>{currentTool[0]?.title || 'This is'}</p>
                            {/* <div className='rounded-full w-1/3 flex justify-between items-center p-3 px-6 mt-4 bg-white'>
                        <input
                            type="text"
                            className='text-textGrey w-full border-none outline-none text-[18px]'
                            placeholder='Type any word to search SEO tools'
                            onChange={handleChange}
                            value={url} // Control input value
                        />
                    </div> */}
                        </div>
                    </div>
                    <div className='mt-4 w-full px-4 xl:px-0 xl:w-[75%] mx-auto'>
                        <div className='flex  gap-3'>

                            <div className='w-fit'>
                                <Link href={'/tool'}>
                                    <button className='bg-lightpink text-pink mb-7 p-2 px-4 text-[18px] font-medium flex justify-center gap-3 rounded-lg items-center'>
                                        <IoReturnUpBackOutline className='text-[24px]' /> Back
                                    </button>
                                </Link>
                            </div>
                            <button onClick={handleClear} className=' h-fit px-7 py-[9px] rounded-md bg-lightpink text-pink font-medium  hover:bg-pink hover:text-white duration-200'>Clear</button>
                        </div>
                        <div className='rounded-xl p-7 shadow-xl border-slate-100 border-[1px]'>
                            <div className='bg-grey p-4 rounded-lg w-full flex items-center gap-3'>
                                <div className='size-[53px] rounded-full flex justify-center items-center'>
                                    <Image src={currentTool?.[0]?.image || ''} height={53} width={53} alt='' />
                                </div>
                                <div>
                                    <p className='text-homeblack text-[20px]'>{currentTool?.[0]?.title}</p>
                                    {/* <p className='text-homegrey'>Paste (Ctrl + V) your article below then click Check for Plagiarism!</p> */}
                                </div>
                            </div>
                            {
                                !(currentTool[0]?.slug_link === 'keywords-suggestion-tool' || currentTool[0]?.slug_link === 'robots-txt-generator') && (
                                    <div className='rounded-lg w-full border-grey border-[2px] flex justify-between items-center p-3 px-6 mt-4 bg-white'>
                                        <input
                                            type="text"
                                            className='text-textGrey w-full border-none outline-none text-[18px]'
                                            placeholder='Enter url'
                                            onChange={handleChange}
                                            value={url} // Control input value
                                        />
                                    </div>
                                )
                            }

                            {

                                (currentTool[0]?.slug_link === 'keyword-position-checker' || currentTool[0]?.slug_link === 'keywords-suggestion-tool' || currentTool[0]?.slug_link ===
                                    'meta-tag-generator') &&
                                (<div className='mt-4 border-grey border-[2px] rounded-lg p-6 w-full '>
                                    <input type="text" placeholder='Enter Keywords Seprated By Coma(,)' className='w-full  border-none outline-none' onChange={handleKeyword} />
                                </div>)
                            }
                            {
                                (currentTool[0]?.slug_link === 'meta-tag-generator') &&
                                (<div className='mt-4 border-grey border-[2px] rounded-lg p-6 w-full '>
                                    <input type="text" placeholder='Enter Meta Title' className='w-full  border-none outline-none' onChange={handleMetatitle} />
                                </div>)


                            }
                            {
                                (currentTool[0]?.slug_link === 'meta-tag-generator') &&
                                (<div className='mt-4 border-grey border-[2px] rounded-lg p-6 w-full '>
                                    <input type="text" placeholder='Enter Meta Description' className='w-full  border-none outline-none' onChange={handleDescription} />
                                </div>)


                            }
                            {
                                (currentTool[0]?.slug_link === 'spider-simulator') &&
                                (<div className='mt-4 border-grey flex justify-between border-[2px] rounded-lg p-6 w-full '>
                                    <input type="number" placeholder='Enter Crawler Depth' className='w-full  border-none outline-none' onChange={handleDepth} />

                                </div>)


                            }
                            {
                                (currentTool[0]?.slug_link === 'spider-simulator') &&
                                (<div className='mt-4 border-grey flex justify-between border-[2px] rounded-lg p-6 w-full '>
                                    <input type="number" placeholder='Enter Number of Pages' className='w-full  border-none outline-none' onChange={handlePageno} />

                                </div>)


                            }
                            {

                                (currentTool[0]?.slug_link === 'robots-txt-generator') &&
                                (<div className='mt-4 border-grey border-[2px] rounded-lg p-6 w-full '>
                                    <input type="text" placeholder=' Enter user agents Seprated By Coma(,)' className='w-full  border-none outline-none' onChange={handleuseragent} />
                                </div>)
                            }
                            {

                                (currentTool[0]?.slug_link === 'robots-txt-generator') &&
                                (<div className='mt-4 border-grey border-[2px] rounded-lg p-6 w-full '>
                                    <input type="text" placeholder='   Enter disallow paths Seprated By Coma(,)' className='w-full  border-none outline-none' onChange={handleDisallowpaths} />
                                </div>)
                            }
                            {

                                (currentTool[0]?.slug_link === 'robots-txt-generator') &&
                                (<div className='mt-4 border-grey border-[2px] rounded-lg p-6 w-full '>
                                    <input type="text" placeholder='   Enter allow paths Seprated By Coma(,)' className='w-full  border-none outline-none' onChange={handleallowpaths} />
                                </div>)
                            }
                                 {

(currentTool[0]?.slug_link === 'robots-txt-generator') &&
(<div className='mt-4 border-grey border-[2px] rounded-lg p-6 w-full '>
    <input type="text" placeholder='   Enter Crawler Delay' className='w-full  border-none outline-none' onChange={handleCrawldelay} />
</div>)
}
{

(currentTool[0]?.slug_link === 'robots-txt-generator') &&
(<div className='mt-4 border-grey border-[2px] rounded-lg p-6 w-full '>
    <input type="text" placeholder='    Enter sitemap URL' className='w-full  border-none outline-none' onChange={handleSitemapurl} />
</div>)
}
                            {showresult && <div className=' rounded-xl p-7  mt-5 border-slate-100 border-[1px]'>
                                {loading && <p className="text-center text-gray-700">Loading...</p>}
                                {error && <p className="text-center text-red-500">{error}</p>}
                                {result && (
                                    <div className="p-4 overflow-auto">
                                        <p className='text-homeblack text-[24px] font-medium'>Results:</p>
                                        <pre className="text-gray-700">{JSON.stringify(result, null, 2)}</pre>
                                    </div>
                                )}
                            </div>}
                            <div className='flex justify-start items-center gap-2'>

                                <div className='mt-4 w-fit' onClick={handleSubmit} >
                                    <Button content={'Check'} type="submit" />
                                </div>
                                {/* <div className='mt-4 w-fit' onClick={handleClear}> */}
                                <button onClick={handleClear} className=' h-fit px-7 py-2 rounded-md bg-grey text-homeblack  font-medium hover:bg-pink hover:text-white duration-200'>Clear</button>

                                {/* </div> */}
                            </div>
                        </div>
                    </div>

                    <div className='bg-white flex justify-between gap-3 xl:w-[77%] mx-auto px-4 w-full my-10'>

                        <div className='w-full rounded-xl border-slate-100 border-[1px] h-full py-8 px-6 shadow-lg'>

                            <div>

                                <div className='border-b-[2px] border-slate-200'>
                                    <p className='text-[24px] font-medium text-homeblack mb-3'>About SEO Tools</p>
                                </div>
                                <div className='my-8 px-4'>
                                    <div dangerouslySetInnerHTML={{ __html: tools_body?.body || 'body is null' }} />
                                </div>
                            </div>

                        </div>

                        <div className='w-[394px] hidden md:block border-slate-100 border-[1px] py-8 px-4 rounded-md shadow-lg'>
                            <div className='border-b-[1px] border-slate-200'>
                                <p className='text-[24px] font-medium text-homeblack mb-3'>Package</p>
                            </div>
                            <div className='flex flex-col my-4 gap-2'>
                                <div className='bg-white w-[364px] rounded-lg shadow-sm border-[.5px] border-slate-100'>
                                    <div className='rounded-t-lg justify-between flex'>
                                        <div className='bg-blue py-2 h-fit rounded-tl-lg rounded-br-lg w-fit  px-5'>
                                            <p className='text-[14px]  text-white uppercase font-medium'>STARTER</p>
                                        </div>
                                        <BsBoxArrowUpRight className='m-2 text-[20px] text-pink' />

                                    </div>
                                    <div className='flex  justify-between items-end p-3 mt-2'>
                                        <div>
                                            <p className='text-textGrey font-medium'>Backlinks range niche</p>
                                            <p className='text-[18px] font-medium text-blue'>100 10-20  Any</p>
                                        </div>
                                        <div>
                                            <p className='text-black font-medium'>₹4,000</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-white w-[364px] rounded-lg shadow-sm border-[.5px] border-slate-100'>
                                    <div className='rounded-t-lg justify-between flex'>
                                        <div className='bg-blue py-2 h-fit rounded-tl-lg rounded-br-lg w-fit  px-5'>
                                            <p className='text-[14px]  text-white uppercase font-medium'>Intermediate</p>
                                        </div>
                                        <BsBoxArrowUpRight className='m-2 text-[20px] text-pink' />

                                    </div>
                                    <div className='flex  justify-between items-end p-3 mt-2'>
                                        <div>
                                            <p className='text-textGrey font-medium'>Backlinks range niche</p>
                                            <p className='text-[18px] font-medium text-blue'>100 10-20  Any</p>
                                        </div>
                                        <div>
                                            <p className='text-black font-medium'>₹4,000</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='border-b-[1px] border-slate-200'>
                                <p className='text-[24px] font-medium text-homeblack mb-3 leading-[28px]'>Double Your Organic Traffic With Our SEO Services</p>
                            </div>
                            <form className='text-homegrey'>
                                <input type="text" required placeholder='Please Enter Your Name*' className='my-2 w-full p-3 rounded-lg border-[2px] border-grey outline-none' />
                                <input type="email" required placeholder='Email Address*' className='my-2 w-full p-3 rounded-lg border-[2px] border-grey outline-none' />
                                <input type="number" required placeholder='Contact No.*' className='my-2 w-full p-3 rounded-lg border-[2px] border-grey outline-none' />
                                <input type="text" required placeholder='Website URL (if any)' className='my-2 w-full p-3 rounded-lg border-[2px] border-grey outline-none' />
                                <textarea required className='my-2 w-full p-3 rounded-lg border-[2px] border-grey outline-none' />
                                <button className='bg-pink text-white text-[14px] w-[133px] h-[44px] flex justify-center items-center rounded-lg'>SUBMIT NOW</button>
                            </form>
                            <div className='border-b-[1px] border-slate-200 mt-5 mb-3'>
                                <p className='text-[24px] font-medium text-homeblack mb-3'>Trendy SEO Tools</p>
                            </div>
                            <div className='px-4'>
                                <ul className='flex flex-col gap-4'>
                                    <Link href={'/tool/backlink-checker'}><li className='text-textGrey flex gap-2 font-semibold'>Backlink Checker <HiArrowTopRightOnSquare className='text-[24px]' /></li></Link>
                                    <Link href={'/tool/article-rewriter'}><li className='text-textGrey flex gap-2 font-semibold'>Article Rewriter <HiArrowTopRightOnSquare className='text-[24px]' /></li></Link>
                                    <Link href={'/tool/keyword-ranking-checker'}><li className='text-textGrey flex gap-2 font-semibold'>Keyword Ranking Checker <HiArrowTopRightOnSquare className='text-[24px]' /></li></Link>
                                    <Link href={'/tool/word-counter'}><li className='text-textGrey flex gap-2 font-semibold'>Word Counter <HiArrowTopRightOnSquare className='text-[24px]' /></li></Link>
                                    <Link href={'/tool/domain-authority-checker'}><li className='text-textGrey flex gap-2 font-semibold'>Domain Authority Checker <HiArrowTopRightOnSquare className='text-[24px]' /></li></Link>
                                    <Link href={'/tool/xml-sitemap-generator'}><li className='text-textGrey flex gap-2 font-semibold'>XML Sitemap Generator <HiArrowTopRightOnSquare className='text-[24px]' /></li></Link>
                                    <Link href={'/tool/google-cache-checker'}><li className='text-textGrey flex gap-2 font-semibold'>Google Cache Checker <HiArrowTopRightOnSquare className='text-[24px]' /></li></Link>
                                    <Link href={'/tool/mozrank-checker'}><li className='text-textGrey flex gap-2 font-semibold'>Mozrank Checker <HiArrowTopRightOnSquare className='text-[24px]' /></li></Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    );
}

export default Tool;

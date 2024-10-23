import React, { useState } from 'react';
import faqImage from '../assets/faq.png'

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full text-black dark:text-white">

            <button
                className="w-full text-left p-4 focus:outline-none"
                onClick={toggleAccordion}
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-[#14303A] dark:text-white">{title}</h3>
                    <span>{isOpen ? '-' : '+'}</span>
                </div>
            </button>
            {isOpen && (
                <div className="p-4 text-black dark:text-white">
                    <p dangerouslySetInnerHTML={{ __html: content }}></p>
                </div>
            )}
        </div>
    );
};

const Faq = () => {
    const accordionData = [
        {
            title: '1. How can I schedule a test drive?',
            content: "You can easily schedule a test drive by visiting our Test Drive page and selecting the model you're interested in. Simply choose your preferred time and date, and one of our team members will confirm your appointment.",
        },
        {
            title: '2. Do you offer financing options?',
            content: 'Yes, we offer a variety of financing options tailored to fit your budget. Visit our Financing page to explore loan terms, rates, and pre-approval options. Our financial advisors are available to help you find the best solution.',
        },
        {
            title: '3. What warranty is available with your cars?',
            content: 'All new vehicles come with a comprehensive manufacturer’s warranty, typically covering 3 years or 36,000 miles, whichever comes first. For used vehicles, extended warranties may be available. Contact us for more specific details on the warranty for each model.',
        },
        {
            title: '4. Can I trade in my current car?',
            content: 'Yes, we accept trade-ins. You can use our Trade-In Value Calculator to estimate the value of your current vehicle, or visit our dealership for an on-site evaluation.',
        },
        {
            title: '5. What safety features are included in your cars?',
            content: 'Our vehicles come equipped with advanced safety features such as adaptive cruise control, lane-keeping assist, blind-spot monitoring, and automatic emergency braking. Each model may vary, so please check the specifications page for detailed information on specific safety technologies.',
        },
        {
            title: '6. What is the process for buying a car online?',
            content: 'You can start the car-buying process online by exploring our inventory, applying for financing, and scheduling a virtual consultation. Once you’ve selected a vehicle, we can arrange home delivery or dealership pickup, based on your preference.',
        },
        {
            title: '7. How often should I service my vehicle?',
            content: 'We recommend servicing your vehicle every 6 months or 5,000 miles, whichever comes first. Regular maintenance ensures optimal performance and helps extend the life of your car. Visit our Service Center for maintenance packages and scheduling.',
        },
        

    ];

    return (

        <div className="lg:w-5/6 mx-auto">
            <h1 className="text-center text-[#00ABE4] text-xl font-bold dark:text-white mb-6">Frequently Asked Questions</h1>
            <h1 className="text-center text-black text-lg dark:text-white tracking-tight mb-6">
                This FAQ section is designed to address common customer concerns about purchasing a vehicle,
                service, and additional features available at the dealership.
                You can tailor the questions and answers based on your specific services or car models.
            </h1>
            <div className="grid max-w-screen-xl mb-0 px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className=" lg:mt-0 lg:col-span-4 lg:flex">
                    <img src={faqImage} alt="mockup" />
                </div>
                <div className="order-first lg:mt-0 lg:col-span-8">
                    {accordionData.map((item, index) => (
                        <AccordionItem key={index} title={item.title} content={item.content} />
                    ))}
                </div>
            </div>

        </div>

    );
};

export default Faq;
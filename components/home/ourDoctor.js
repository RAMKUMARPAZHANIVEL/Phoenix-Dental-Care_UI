import React from 'react'
import DoctorProfile from "../../public/images/doctor_profile.svg";
import { whatsappUrl } from '../../app/utils/config';

const OurDoctor = () => {
  return (
    <>
     {/* <div className='p-5 max-w-[100%] lg:max-w-[80%] mx-auto'> */}
     <div className='lg:px-6'> 
        <h3 className="text-primary text-3xl font-bold text-center mb-10">Doctors</h3> 
        <div className='flex flex-row justify-center items-center gap-10'>
            <div className='flex flex-col gap-5 w-[100%] lg:w-[70%]'>
                <div>
                    <h3 className="text-3xl font-bold mb-2"> <strong>Dr. Divya S</strong> </h3>
                    <h5 className='text-xl font-semibold'>BDS, MDS – Pediatric and Preventive Dentistry Founder & Chief Dentist</h5>
                </div>
                <p>               
                    A passionate and dedicated dental professional committed to providing high-quality, gentle, and child-friendly care.
                    With specialized training in Pediatric and Preventive Dentistry, she focuses on creating positive dental experiences for children and families alike.
                    Her calm and caring approach, combined with advanced clinical skills, helps patients overcome dental fear and enjoy a lifetime of healthy smiles.
                </p>

                 <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit inline-block bg-primary text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
                >
                    Book Appointment
                </a>
            </div>
            <div>
                <img className='w-80 hidden lg:block' src="../../images/doctor_profile.svg" />
            </div>
        </div>
     </div>
    <div className='mx-auto mt-20'>
        <h3 className="text-primary text-3xl font-bold text-center mb-10">Our Dental Team</h3> 
        <div>
            <p className='font-medium my-3'>
                Behind every smile we create is a team of qualified dental professionals and caring support staff.
                Together, we ensure:
            </p>
            <ul className='list-disc list-inside flex flex-col gap-2'>
            <li>Precise diagnosis and treatment using modern dental technology</li>
            <li>Patient-centered care in a warm, hygienic, and friendly environment</li>
            <li>A gentle approach that prioritizes comfort, trust, and long-term oral health</li>
            </ul>               
        </div>
    </div>

    <div className='flex flex-col lg:flex-row items-center justify-center gap-9 lg:my-16 mt-20'>
        <h3 className="text-3xl font-bold text-primary text-center my-5">Our Philosophy</h3> 
        <p className='max-w-xl font-semibold border-l-[3px]  border-slate-400 p-5'>
            We believe dentistry is not just about treating teeth — it’s about building confidence, comfort, and trust.
            Every patient is treated like family, and every smile receives the attention it truly deserves.
        </p>
    </div>
     {/* </div> */}
    </>
  )
}

export default OurDoctor
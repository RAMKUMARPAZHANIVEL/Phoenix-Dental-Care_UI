import React from 'react'
import DoctorProfile from "../../public/images/doctor_profile.svg";

const OurDoctor = () => {
  return (
    <div className='flex flex-row justify-center items-center gap-10 p-5 max-w-[80%] mx-auto'>
        <div className='flex flex-col gap-5 w-[70%]'>
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
                href="https://wa.me/919003226380"
                className="w-fit bg-primary text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
            >
                Book Appointment
            </a>
        </div>
        <div>
            <img className='w-80' src="../../images/doctor_profile.svg" />
        </div>
    </div>
  )
}

export default OurDoctor
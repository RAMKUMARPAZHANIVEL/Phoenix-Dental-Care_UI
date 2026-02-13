export const Experience_count = 10;
export const Client_count = 1000;

export const Offers = [
    "Free consultation on your first visit",
    "Upto 700 on your first treatment",
    "Referal program: Refer three family and friendsand they get three polishing on their first visit",
]

const message = `
Hello Phoenix Dental Clinic 👋

I would like to book an appointment.

Name:
Mobile Number:
Preferred Date:
Preferred Time:
Treatment Required:

Thank you.
`;

export const whatsappUrl = `https://wa.me/919003226380?text=${encodeURIComponent(message)}`;
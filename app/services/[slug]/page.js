import { notFound } from "next/navigation";
import services from "../../../data/services";
import { practiceInfo } from "../../utils/config";
import Breadcrumb from "../../../components/Breadcrumb";
import JsonLd from "../../../components/seo/JsonLd";
import TreatmentHero from "../../../components/services/TreatmentHero";
import TreatmentOverview from "../../../components/services/TreatmentOverview";
import TreatmentBenefits from "../../../components/services/TreatmentBenefits";
import TreatmentProcedure from "../../../components/services/TreatmentProcedure";
import TreatmentFAQ from "../../../components/services/TreatmentFAQ";
import TreatmentGallery from "../../../components/services/TreatmentGallery";
import TreatmentTestimonials from "../../../components/services/TreatmentTestimonials";
import TreatmentDoctor from "../../../components/services/TreatmentDoctor";
import TreatmentCTA from "../../../components/services/TreatmentCTA";
import RelatedTreatments from "../../../components/services/RelatedTreatments";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const canonicalUrl = `https://www.phoenixdentalcare.in/services/${slug}`;
  return {
    title: service.metaTitle || service.name,
    description: service.metaDescription || service.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle || service.name,
      description: service.metaDescription || service.summary,
      url: canonicalUrl,
      images: [{ url: `https://www.phoenixdentalcare.in${service.imageSrc}` }],
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const baseUrl = "https://www.phoenixdentalcare.in";
  const pageUrl = `${baseUrl}/services/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.name },
    ],
  };

  const medicalProcedureJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.description,
    procedureType: "Therapeutic",
    url: pageUrl,
    provider: {
      "@type": "Dentist",
      name: practiceInfo.name,
      address: practiceInfo.address,
    },
  };

  const serviceNames = { [service.slug]: service.name };

  return (
    <main className="bg-[#F8F9FA] min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={medicalProcedureJsonLd} />
      {service.faqs && service.faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
      )}

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Breadcrumb serviceNames={serviceNames} />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <TreatmentHero
          name={service.name}
          imageSrc={service.imageSrc}
          heroAlt={service.heroAlt || service.name}
          category={service.category}
        />

        <TreatmentOverview description={service.description} />

        <TreatmentBenefits benefits={service.benefits} />

        <TreatmentProcedure procedureSteps={service.procedureSteps} />

        <TreatmentFAQ faqs={service.faqs} />

        <TreatmentGallery beforeAfterImages={service.beforeAfterImages} />

        <TreatmentTestimonials />

        <TreatmentDoctor doctorId={service.doctorId} />

        <TreatmentCTA treatmentName={service.name} />

        <RelatedTreatments
          relatedSlugs={service.relatedSlugs}
          allTreatments={services}
        />
      </div>
    </main>
  );
}

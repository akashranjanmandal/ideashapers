import LegalPage from "../legal/LegalPage";

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      effectiveDate="10/01/2026"
      lastUpdated="11/07/2026"
      intro="Welcome to IdeaShapers. By accessing or using https://ideashapers.org/, you agree to these Terms & Conditions. If you do not agree, please do not use our website."
      sections={[
        {
          heading: "1. Website Use",
          body: "You agree to use this website only for lawful purposes and not to engage in any activity that may harm the website, its users, or IdeaShapers.",
        },
        {
          heading: "2. Intellectual Property",
          body: "All content on this website, including text, graphics, logos, images, and other materials, is the property of IdeaShapers unless otherwise stated. No content may be copied, reproduced, or distributed without prior written permission.",
        },
        {
          heading: "3. Services",
          body: "The information provided on this website is for general information only and does not constitute a binding offer. Services, pricing, and availability are subject to change without prior notice.",
        },
        {
          heading: "4. Third-Party Links",
          body: "Our website may contain links to third-party websites. IdeaShapers is not responsible for the content, policies, or practices of those websites.",
        },
        {
          heading: "5. Limitation of Liability",
          body: "IdeaShapers shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of, or inability to use, this website or its content.",
        },
        {
          heading: "6. Privacy",
          body: "Your use of this website is also governed by our Privacy Policy and Cookie Policy.",
        },
        {
          heading: "7. Changes to These Terms",
          body: "We may update these Terms & Conditions at any time. Continued use of the website after changes are posted constitutes your acceptance of the revised terms.",
        },
        {
          heading: "8. Governing Law",
          body: "These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.",
        },
        {
          heading: "9. Contact Us",
          body: "IdeaShapers\nWebsite: https://ideashapers.org/\nEmail: info@ideashapers.org",
        },
      ]}
    />
  );
}

import LegalPage from "../legal/LegalPage";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="10/01/2026"
      lastUpdated="11/07/2026"
      intro={`Welcome to IdeaShapers ("we", "our", "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website https://ideashapers.org/ or use our services.\n\nBy using our website, you agree to the terms of this Privacy Policy.`}
      sections={[
        {
          heading: "1. Information We Collect",
          body: "We may collect the following types of information:",
          subsections: [
            {
              heading: "Personal Information",
              body: "When you contact us, submit an inquiry, register for workshops, subscribe to newsletters or use our contact forms, we may collect: Full Name, Email Address, Phone Number, Organization/Institution, Job Title, City/Location, and any information you voluntarily provide in messages or forms.",
            },
            {
              heading: "Non-Personal Information",
              body: "When you browse our website, we may automatically collect: IP Address, Browser Type, Device Information, Operating System, Date & Time of Visit, Pages Viewed, Referral Source, and Website Usage Statistics.",
            },
          ],
        },
        {
          heading: "2. How We Use Your Information",
          body: "We use the collected information to:",
          bullets: [
            "Respond to your inquiries",
            "Provide consultancy, training, mentoring and writing services",
            "Process workshop or program registrations",
            "Improve our website and services",
            "Send newsletters and promotional communications (only if you opt in)",
            "Maintain website security",
            "Comply with legal obligations",
          ],
        },
        {
          heading: "3. Third-Party Services",
          body: "We may use trusted third-party service providers for:",
          bullets: [
            "Website hosting",
            "Email communication",
            "Analytics (such as Google Analytics)",
            "Contact forms",
            "Cloud storage",
            "Payment processing (if applicable)",
          ],
          afterBullets: "These providers only receive information necessary to perform their services and are required to maintain confidentiality.",
        },
        {
          heading: "4. Data Sharing",
          body: "We do not sell, rent or trade your personal information. We may share information only:",
          bullets: [
            "When required by law",
            "To protect our legal rights",
            "With trusted service providers working on our behalf",
            "During business restructuring or merger (if applicable)",
          ],
        },
        {
          heading: "5. Data Security",
          body: "We implement reasonable administrative, technical and physical safeguards to protect your personal information against:",
          bullets: ["Unauthorized access", "Loss", "Misuse", "Alteration", "Disclosure"],
          afterBullets: "However, no method of internet transmission or electronic storage is completely secure.",
        },
        {
          heading: "6. Data Retention",
          body: "We retain personal information only for as long as necessary to:",
          bullets: [
            "Provide requested services",
            "Meet legal requirements",
            "Resolve disputes",
            "Enforce agreements",
          ],
          afterBullets: "After this period, your information will be securely deleted or anonymized.",
        },
        {
          heading: "7. Your Rights",
          body: "Depending on applicable law, you may have the right to:",
          bullets: [
            "Access your personal information",
            "Correct inaccurate information",
            "Request deletion of your information",
            "Withdraw consent",
            "Object to certain processing activities",
            "Request data portability",
          ],
          afterBullets: "To exercise these rights, please contact us using the details below.",
        },
        {
          heading: "8. Children's Privacy",
          body: "Our services are not directed toward children under the age of 13 without parental or guardian consent. If we become aware that we have collected information from a child without appropriate consent, we will promptly delete such information.",
        },
        {
          heading: "9. International Users",
          body: "If you access our website from outside India, please note that your information may be processed and stored in India or other jurisdictions where our service providers operate.",
        },
        {
          heading: "10. External Links",
          body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external websites. We encourage users to review their respective privacy policies.",
        },
        {
          heading: "11. Email Communications",
          body: "If you subscribe to our newsletter or updates, you may receive:",
          bullets: ["Newsletters", "Event announcements", "Program updates", "Marketing communications"],
          afterBullets: `You can unsubscribe at any time by clicking the "Unsubscribe" link in our emails or by contacting us directly.`,
        },
        {
          heading: "12. Changes to This Privacy Policy",
          body: "We may update this Privacy Policy from time to time. Changes will become effective immediately upon posting on this page. We encourage users to review this page periodically.",
        },
        {
          heading: "13. Contact Us",
          body: "If you have any questions regarding this Privacy Policy or your personal information, please contact us:\n\nIdeaShapers\nWebsite: https://ideashapers.org/\nEmail: info@ideashapers.org",
        },
        {
          heading: "14. Compliance with Indian Law",
          body: "This Privacy Policy is intended to comply with applicable Indian laws, including the Digital Personal Data Protection Act, 2023 (DPDP Act), where applicable. Users may contact us to exercise rights available under applicable data protection laws.",
        },
      ]}
    />
  );
}

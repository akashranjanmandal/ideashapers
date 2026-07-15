import LegalPage from "../legal/LegalPage";

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      effectiveDate="10/01/2026"
      lastUpdated="11/07/2026"
      sections={[
        {
          heading: "1. What Are Cookies?",
          body: "Cookies are small text files stored on your device when you visit our website. They help improve your browsing experience by remembering your preferences and providing insights into how our website is used.",
        },
        {
          heading: "2. How We Use Cookies",
          body: "IdeaShapers uses cookies and similar technologies to:",
          bullets: [
            "Improve user experience",
            "Remember user preferences",
            "Analyze website traffic",
            "Measure website performance",
          ],
        },
        {
          heading: "3. Types of Cookies We May Use",
          subsections: [
            {
              heading: "Essential Cookies",
              body: "These cookies are necessary for the proper functioning of the website.",
            },
            {
              heading: "Performance & Analytics Cookies",
              body: "These cookies help us understand how visitors interact with our website by collecting anonymous usage information (for example, through Google Analytics).",
            },
            {
              heading: "Preference Cookies",
              body: "These cookies remember your settings and preferences to provide a more personalized experience.",
            },
          ],
        },
        {
          heading: "4. Managing Cookies",
          body: "Most web browsers allow you to control or disable cookies through their settings. Please note that disabling cookies may affect the functionality of certain features of our website.",
        },
        {
          heading: "5. Third-Party Cookies",
          body: "Some cookies may be placed by trusted third-party service providers, including analytics providers and other services that help us improve our website. These third parties process information in accordance with their own privacy policies.",
        },
        {
          heading: "6. Changes to This Cookie Policy",
          body: "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date.",
        },
        {
          heading: "7. Contact Us",
          body: "If you have any questions about our use of cookies, please contact us:\n\nIdeaShapers\nWebsite: https://ideashapers.org/\nEmail: info@ideashapers.org",
        },
      ]}
    />
  );
}

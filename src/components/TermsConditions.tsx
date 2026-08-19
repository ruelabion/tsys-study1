export default function TermsConditions({ onBack }: { onBack: () => void }) {
  return (
    <div className="pt-[100px] pb-20">
      {/* Page Hero */}
      <div className="bg-deep-blue text-white py-14">
        <div className="max-w-[1440px] mx-auto px-margin">
          <button onClick={onBack} className="label-caps text-white/50 block mb-3 tracking-widest hover:text-white/80 transition-colors">
            ← Back to Home
          </button>
          <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tight mb-3">TERMS &amp; CONDITIONS</h1>
          <div className="h-1 w-12 bg-primary"></div>
          <p className="mt-5 text-white/70 max-w-xl text-sm leading-relaxed">
            Last updated: August 19, 2026
          </p>
        </div>
      </div>

      <div className="max-w-[840px] mx-auto px-margin py-16">
        <div className="prose-content space-y-10 text-sm leading-relaxed text-secondary">
          <section>
            <p>
              These Terms and Conditions ("Terms") govern your access to and use of the T'sys Industrial Controls
              Inc. ("T'sys," "we," "us," or "our") website. By accessing or using this website, you agree to be bound
              by these Terms. If you do not agree, please discontinue use of this website.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">1. About This Website</h2>
            <p>
              This website is provided to present information about T'sys, our authorized product lines (including
              HIMEL low-voltage electrical products and Fuji Electric variable frequency drives and instrumentation),
              our custom fabrication capabilities (switchgear, panelboards, busway, and cable tray systems), and to
              facilitate inquiries and requests for quotation.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">2. Acceptable Use</h2>
            <p className="mb-3">You agree to use this website only for lawful purposes. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use this website in any way that violates applicable Philippine or international law</li>
              <li>Attempt to gain unauthorized access to any part of this website or its underlying systems</li>
              <li>Introduce viruses, malware, or other harmful code</li>
              <li>Scrape, harvest, or systematically extract content from this website without our written consent</li>
              <li>Impersonate T'sys or misrepresent your affiliation with us</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">3. Product Information, Pricing, and Quotations</h2>
            <p className="mb-3">
              Product descriptions, specifications, images, and stock information on this website are provided for
              general reference and are subject to change without notice, including changes made by our manufacturer
              partners (HIMEL, Fuji Electric, and others). This website does not display pricing and is not an online
              store — no purchase, sale, or binding offer is made or accepted through this website.
            </p>
            <p>
              Submitting a "Get a Quote" or contact form request does not create a contract. All quotations, pricing,
              specifications, lead times, and stock availability are subject to confirmation by our sales team and
              will be governed by the separate commercial terms agreed with you at the time of a formal quotation or
              purchase order.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">4. Intellectual Property</h2>
            <p className="mb-3">
              The content of this website — including text, graphics, logos, and layout — is owned by or licensed to
              T'sys Industrial Controls Inc. and is protected by applicable intellectual property laws. You may view
              and print pages of this website for personal, non-commercial reference, provided you do not modify the
              content or remove any copyright or trademark notices.
            </p>
            <p>
              HIMEL, Fuji Electric, and other third-party product and brand names referenced on this website are
              trademarks of their respective owners. Their appearance on this website does not imply any transfer of
              ownership and is used solely to identify products that T'sys distributes or is authorized to represent.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">5. No Warranty; Accuracy of Information</h2>
            <p>
              While we make reasonable efforts to keep information on this website accurate and up to date, this
              website and its content are provided "as is" and "as available" without warranties of any kind, express
              or implied, including as to accuracy, completeness, or fitness for a particular purpose. Technical
              specifications should always be verified with our sales or engineering team before being relied upon
              for procurement or system design decisions.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by Philippine law, T'sys Industrial Controls Inc. shall not be liable
              for any indirect, incidental, special, or consequential damages arising out of or in connection with
              your use of, or inability to use, this website, even if we have been advised of the possibility of such
              damages. Nothing in these Terms limits any liability that cannot be limited or excluded under applicable
              law.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">7. Third-Party Links</h2>
            <p>
              This website may link to third-party websites, such as our official Facebook page or the websites of
              brands we distribute. We do not control and are not responsible for the content, accuracy, or practices
              of any linked third-party website.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">8. Changes to These Terms</h2>
            <p>
              We may revise these Terms from time to time. Changes will be posted on this page with an updated "Last
              updated" date. Your continued use of this website after changes are posted constitutes acceptance of
              the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">9. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Republic of the
              Philippines, without regard to conflict-of-law principles. Any dispute arising from these Terms or your
              use of this website shall be subject to the exclusive jurisdiction of the competent courts of Quezon
              City, Philippines.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">10. Contact Us</h2>
            <p className="mb-3">Questions about these Terms and Conditions can be directed to:</p>
            <div className="border border-surface-container bg-surface-container-low p-6 space-y-1 text-on-surface">
              <p className="font-headline font-bold">T'sys Industrial Controls Inc.</p>
              <p>1F Torre Venezia Bldg., Timog Avenue cor. Sct. Santiago St.,</p>
              <p>Brgy. Laging Handa, Quezon City, Philippines 1103</p>
              <p>Email: <a href="mailto:manager@tsys.com.ph" className="text-primary hover:underline">manager@tsys.com.ph</a></p>
              <p>Phone: <a href="tel:+639175395654" className="text-primary hover:underline">0917 539 5654</a></p>
            </div>
          </section>

          <p className="text-xs text-secondary/70 border-t border-surface-container pt-6">
            These Terms and Conditions are a general template intended to reasonably reflect standard use of a
            corporate B2B website and do not constitute legal advice. Businesses with specific commercial or
            compliance requirements should have this document reviewed by qualified legal counsel.
          </p>
        </div>
      </div>
    </div>
  );
}

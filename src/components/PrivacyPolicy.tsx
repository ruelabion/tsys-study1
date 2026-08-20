import { useSEO } from '../lib/seo';

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  useSEO({
    title: 'Privacy Policy',
    description: "How T'sys Industrial Controls Inc. collects, uses, and protects the personal data submitted through this website, in line with the Data Privacy Act of 2012 (RA 10173).",
    path: '/privacy',
  });

  return (
    <div className="pt-[100px] pb-20">
      {/* Page Hero */}
      <div className="bg-deep-blue text-white py-14">
        <div className="max-w-[1440px] mx-auto px-margin">
          <button onClick={onBack} className="label-caps text-white/50 block mb-3 tracking-widest hover:text-white/80 transition-colors">
            ← Back to Home
          </button>
          <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tight mb-3">PRIVACY POLICY</h1>
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
              T'sys Industrial Controls Inc. ("T'sys," "we," "us," or "our") respects your privacy and is committed to
              protecting the personal information of visitors to this website and individuals who contact us for
              product inquiries, quotations, or business purposes. This Privacy Policy explains what information we
              collect, how we use it, and the choices you have, in accordance with the Philippine Data Privacy Act of
              2012 (Republic Act No. 10173) and its Implementing Rules and Regulations.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect information you voluntarily provide to us, primarily through our Contact Us form, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>Company name (optional)</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Subject and message content of your inquiry</li>
            </ul>
            <p className="mt-3">
              We do not currently use cookies, analytics trackers, or advertising pixels on this website. If this
              changes in the future, this Privacy Policy will be updated accordingly before any such technology is
              deployed.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information you provide solely to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Respond to product inquiries, requests for quotation, and technical consultations</li>
              <li>Provide after-sales support and system integration assistance</li>
              <li>Communicate with you regarding your inquiry or business relationship with T'sys</li>
              <li>Maintain records for legitimate business, accounting, and legal purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">3. How We Share Your Information</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. Your information may be
              processed by trusted service providers who help us operate this website and deliver your inquiry to
              our sales team (for example, our website hosting and form-delivery infrastructure), acting only on our
              instructions and under confidentiality obligations. We may also disclose information where required by
              Philippine law, regulation, or a valid legal order.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">4. Data Storage and Security</h2>
            <p>
              We take reasonable organizational, physical, and technical measures to protect the personal information
              we collect from unauthorized access, use, alteration, or disclosure. Contact form submissions are
              transmitted over an encrypted (HTTPS) connection. However, no method of electronic transmission or
              storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">5. Data Retention</h2>
            <p>
              We retain personal information collected through this website only for as long as necessary to fulfill
              the purposes described in this Policy, or as required to comply with legal, accounting, or reporting
              obligations, after which it is securely disposed of or anonymized.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">6. Your Rights</h2>
            <p className="mb-3">
              Under the Data Privacy Act of 2012, you have the right to be informed, to access, to object, to
              rectify, to erasure or blocking, to data portability, and to file a complaint with the National Privacy
              Commission. To exercise any of these rights regarding information you have submitted to us, please
              contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">7. Children's Privacy</h2>
            <p>
              This website is intended for business and commercial audiences. We do not knowingly collect personal
              information from children, and this website is not directed at individuals under the age of 18.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">8. Third-Party Links</h2>
            <p>
              This website may contain links to third-party websites, such as our official Facebook page or the
              websites of the brands we distribute (HIMEL, Fuji Electric, and others). We are not responsible for the
              privacy practices or content of those third-party sites. We encourage you to review their respective
              privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal or
              regulatory reasons. Any changes will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="font-headline font-bold text-on-surface text-xl mb-3">10. Contact Us</h2>
            <p className="mb-3">
              If you have questions about this Privacy Policy or how we handle your personal information, please
              contact us:
            </p>
            <div className="border border-surface-container bg-surface-container-low p-6 space-y-1 text-on-surface">
              <p className="font-headline font-bold">T'sys Industrial Controls Inc.</p>
              <p>1F Torre Venezia Bldg., Timog Avenue cor. Sct. Santiago St.,</p>
              <p>Brgy. Laging Handa, Quezon City, Philippines 1103</p>
              <p>Email: <a href="mailto:manager@tsys.com.ph" className="text-primary hover:underline">manager@tsys.com.ph</a></p>
              <p>Phone: <a href="tel:+639175395654" className="text-primary hover:underline">0917 539 5654</a></p>
            </div>
          </section>

          <p className="text-xs text-secondary/70 border-t border-surface-container pt-6">
            This Privacy Policy is a general template intended to reflect this website's current data practices in
            good faith and does not constitute legal advice. Businesses with specific or evolving compliance
            requirements should have this document reviewed by qualified legal counsel.
          </p>
        </div>
      </div>
    </div>
  );
}

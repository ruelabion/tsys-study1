const quickLinks = ['Home', 'Products', 'Services', 'About Us', 'Downloads', 'Contact Us'];
const productCategories = ['Industrial Automation', 'Electrical Control', 'Industrial Communication', 'Panel & System Components', 'Accessories'];

export default function Footer() {
  return (
    <footer>
      <div className="bg-deep-blue text-white py-16">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="text-base font-black font-headline mb-3 leading-snug">T'sys Industrial Controls Inc.</div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">The Best Alternative to Your Current Needs</p>
              <a href="#" className="text-white/50 hover:text-white transition-colors text-sm underline underline-offset-2">
                Facebook
              </a>
            </div>

            <div>
              <h4 className="label-caps text-white/80 text-[11px] mb-5 border-b border-white/20 pb-3">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-caps text-white/80 text-[11px] mb-5 border-b border-white/20 pb-3">Product Categories</h4>
              <ul className="space-y-3">
                {productCategories.map(cat => (
                  <li key={cat}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">{cat}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-caps text-white/80 text-[11px] mb-5 border-b border-white/20 pb-3">Contact Us</h4>
              <div className="space-y-3 text-white/60 text-sm">
                <p>(02) 8687 3006</p>
                <p>0917 563 1925</p>
                <p>sales@tsys.com.ph</p>
                <p className="leading-relaxed">
                  Unit 4, 2F LRC Bldg., 179 Mayon St.,<br />
                  Brgy. Silangan, Quezon City, Philippines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-deep-blue-dark border-t border-white/10 py-4">
        <div className="max-w-[1440px] mx-auto px-margin flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <span>© 2024 T'sys Industrial Controls Inc. All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

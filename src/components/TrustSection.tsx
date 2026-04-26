import { Shield, Headphones, CheckCircle, Users } from 'lucide-react';

const pillars = [
  {
    icon: Shield,
    title: 'Quality Products',
    desc: 'We source reliable and industry-proven components.',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    desc: 'Our experienced team is ready to assist you.',
  },
  {
    icon: CheckCircle,
    title: 'Reliable Solutions',
    desc: 'Solutions that help your operations run smoothly.',
  },
  {
    icon: Users,
    title: 'Customer Focused',
    desc: 'We build long-term partnerships with our clients.',
  },
];

export default function TrustSection() {
  return (
    <section className="bg-surface-container border-y border-surface-container-high py-14">
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 border border-surface-container-high flex items-center justify-center bg-white">
                <Icon className="text-secondary" size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-headline font-bold text-on-surface text-sm mb-1">{title}</h4>
                <p className="text-sm text-secondary leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import PageHeader from '@/components/layout/PageHeader';
import SectionCard from '@/components/common/SectionCard';
import { User, Phone, MapPin } from 'lucide-react';

const references = [
  {
    id: 1,
    name: 'Dr. Amit Kumar',
    relation: 'Family Friend',
    phone: '+91 98765 44444',
    address: '789 College Road, Academic Zone, Mumbai - 400002',
    occupation: 'Professor',
  },
  {
    id: 2,
    name: 'Mrs. Priya Mehta',
    relation: 'Neighbor',
    phone: '+91 98765 55555',
    address: '124 Main Street, Sector 15, Mumbai - 400001',
    occupation: 'Doctor',
  },
  {
    id: 3,
    name: 'Mr. Suresh Patel',
    relation: 'Family Friend',
    phone: '+91 98765 66666',
    address: '567 Business Park, Andheri, Mumbai - 400069',
    occupation: 'Businessman',
  },
];

export default function ReferenceInfo() {
  return (
    <div className="animate-fade-in max-w-4xl">
      <PageHeader
        title="Reference Information"
        subtitle="Emergency contacts and references"
        breadcrumbs={[
          { label: 'Profile', path: '/profile/basic' },
          { label: 'References' },
        ]}
      />

      <div className="grid gap-6">
        {references.map((ref, index) => (
          <SectionCard key={ref.id} title={`Reference ${index + 1}`}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <User className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold">{ref.name}</h3>
                <p className="text-sm text-muted-foreground">{ref.relation} • {ref.occupation}</p>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{ref.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span>{ref.address}</span>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

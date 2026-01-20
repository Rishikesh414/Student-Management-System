import PageHeader from '@/components/layout/PageHeader';
import SectionCard from '@/components/common/SectionCard';
import { User, Phone, Briefcase } from 'lucide-react';

const parentData = {
  father: {
    name: 'Rajesh Sharma',
    occupation: 'Business Owner',
    phone: '+91 98765 11111',
    email: 'rajesh.sharma@email.com',
    qualification: 'MBA',
    annualIncome: '₹12,00,000',
  },
  mother: {
    name: 'Sunita Sharma',
    occupation: 'Teacher',
    phone: '+91 98765 22222',
    email: 'sunita.sharma@email.com',
    qualification: 'M.Ed',
    annualIncome: '₹6,00,000',
  },
  guardian: {
    name: 'Vikram Sharma',
    relation: 'Uncle',
    phone: '+91 98765 33333',
    address: '456 Park Avenue, Sector 10, Mumbai',
  },
};

interface ParentCardProps {
  title: string;
  data: typeof parentData.father;
}

function ParentCard({ title, data }: ParentCardProps) {
  return (
    <SectionCard title={title}>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{data.name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{data.occupation}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Phone Number</label>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <p className="font-medium">{data.phone}</p>
          </div>
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Email</label>
          <p className="font-medium">{data.email}</p>
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Qualification</label>
          <p className="font-medium">{data.qualification}</p>
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Annual Income</label>
          <p className="font-medium">{data.annualIncome}</p>
        </div>
      </div>
    </SectionCard>
  );
}

export default function ParentInfo() {
  return (
    <div className="animate-fade-in max-w-4xl">
      <PageHeader
        title="Parent Information"
        subtitle="Family and guardian details"
        breadcrumbs={[
          { label: 'Profile', path: '/profile/basic' },
          { label: 'Parent Info' },
        ]}
      />

      <div className="grid gap-6">
        <ParentCard title="Father's Details" data={parentData.father} />
        <ParentCard title="Mother's Details" data={parentData.mother} />

        <SectionCard title="Guardian Details">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Name</label>
              <p className="font-medium">{parentData.guardian.name}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Relation</label>
              <p className="font-medium">{parentData.guardian.relation}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Phone</label>
              <p className="font-medium">{parentData.guardian.phone}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Address</label>
              <p className="font-medium">{parentData.guardian.address}</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

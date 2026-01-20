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
        <SectionCard title="Parent & Guardian Details">
          <div className="space-y-8">
            {/* Father & Mother in a single responsive row */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Father */}
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                      Father
                    </p>
                    <h3 className="font-semibold">{parentData.father.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Briefcase className="w-3 h-3" />
                      <span>{parentData.father.occupation}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Phone</span>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{parentData.father.phone}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Email</span>
                    <p className="font-medium break-all">{parentData.father.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-muted-foreground text-xs">Qualification</span>
                      <p className="font-medium">{parentData.father.qualification}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Annual Income</span>
                      <p className="font-medium">{parentData.father.annualIncome}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mother */}
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                      Mother
                    </p>
                    <h3 className="font-semibold">{parentData.mother.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Briefcase className="w-3 h-3" />
                      <span>{parentData.mother.occupation}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Phone</span>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{parentData.mother.phone}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Email</span>
                    <p className="font-medium break-all">{parentData.mother.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-muted-foreground text-xs">Qualification</span>
                      <p className="font-medium">{parentData.mother.qualification}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Annual Income</span>
                      <p className="font-medium">{parentData.mother.annualIncome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guardian block below */}
            <div className="rounded-xl border border-dashed border-border/60 bg-background/40 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                Local Guardian (if any)
              </p>
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Name</label>
                  <p className="font-medium">{parentData.guardian.name}</p>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Relation</label>
                  <p className="font-medium">{parentData.guardian.relation}</p>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Phone</label>
                  <p className="font-medium">{parentData.guardian.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-muted-foreground mb-1">Address</label>
                  <p className="font-medium">{parentData.guardian.address}</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import SectionCard from '@/components/common/SectionCard';
import ProfileNavBar from '@/components/layout/ProfileNavBar';
import { User, Phone, Briefcase, Users, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  siblings: [
    {
      name: 'Arjun Sharma',
      age: 19,
      education: 'B.Tech Computer Science',
      phone: '+91 98765 77777',
    },
    {
      name: 'Anjali Sharma',
      age: 16,
      education: '12th Grade',
      phone: '+91 98765 88888',
    },
  ],
};

export default function ParentInfo() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    father: { ...parentData.father },
    mother: { ...parentData.mother },
    guardian: { ...parentData.guardian },
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    toast({
      title: 'Success',
      description: 'Parent information updated successfully.',
    });
  };

  const handleCancel = () => {
    setFormData({
      father: { ...parentData.father },
      mother: { ...parentData.mother },
      guardian: { ...parentData.guardian },
    });
    setIsEditing(false);
  };

  const handleInputChange = (parent: 'father' | 'mother' | 'guardian', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

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

      <ProfileNavBar />

      <div className="grid gap-6">
        <SectionCard 
          title="Parent & Guardian Details"
          actions={
            isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary flex items-center gap-2"
                >
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors flex items-center gap-2"
                title="Edit parent information"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )
          }
        >
          <div className="space-y-8">
            {/* Father & Mother in a single responsive row */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Father */}
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                      Father
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.father.name}
                        onChange={(e) => handleInputChange('father', 'name', e.target.value)}
                        className="font-semibold w-full px-2 py-1 rounded border border-input bg-background"
                      />
                    ) : (
                      <h3 className="font-semibold">{formData.father.name}</h3>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Briefcase className="w-3 h-3" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.father.occupation}
                          onChange={(e) => handleInputChange('father', 'occupation', e.target.value)}
                          className="text-xs px-2 py-1 rounded border border-input bg-background flex-1"
                        />
                      ) : (
                        <span>{formData.father.occupation}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Phone</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.father.phone}
                        onChange={(e) => handleInputChange('father', 'phone', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-input bg-background mt-1 font-medium"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{formData.father.phone}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Email</span>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.father.email}
                        onChange={(e) => handleInputChange('father', 'email', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-input bg-background mt-1 font-medium"
                      />
                    ) : (
                      <p className="font-medium break-all">{formData.father.email}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-muted-foreground text-xs">Qualification</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.father.qualification}
                          onChange={(e) => handleInputChange('father', 'qualification', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-input bg-background mt-1 font-medium"
                        />
                      ) : (
                        <p className="font-medium">{formData.father.qualification}</p>
                      )}
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Annual Income</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.father.annualIncome}
                          onChange={(e) => handleInputChange('father', 'annualIncome', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-input bg-background mt-1 font-medium"
                        />
                      ) : (
                        <p className="font-medium">{formData.father.annualIncome}</p>
                      )}
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
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                      Mother
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.mother.name}
                        onChange={(e) => handleInputChange('mother', 'name', e.target.value)}
                        className="font-semibold w-full px-2 py-1 rounded border border-input bg-background"
                      />
                    ) : (
                      <h3 className="font-semibold">{formData.mother.name}</h3>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Briefcase className="w-3 h-3" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.mother.occupation}
                          onChange={(e) => handleInputChange('mother', 'occupation', e.target.value)}
                          className="text-xs px-2 py-1 rounded border border-input bg-background flex-1"
                        />
                      ) : (
                        <span>{formData.mother.occupation}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Phone</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.mother.phone}
                        onChange={(e) => handleInputChange('mother', 'phone', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-input bg-background mt-1 font-medium"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{formData.mother.phone}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Email</span>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.mother.email}
                        onChange={(e) => handleInputChange('mother', 'email', e.target.value)}
                        className="w-full px-2 py-1 rounded border border-input bg-background mt-1 font-medium"
                      />
                    ) : (
                      <p className="font-medium break-all">{formData.mother.email}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-muted-foreground text-xs">Qualification</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.mother.qualification}
                          onChange={(e) => handleInputChange('mother', 'qualification', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-input bg-background mt-1 font-medium"
                        />
                      ) : (
                        <p className="font-medium">{formData.mother.qualification}</p>
                      )}
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Annual Income</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.mother.annualIncome}
                          onChange={(e) => handleInputChange('mother', 'annualIncome', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-input bg-background mt-1 font-medium"
                        />
                      ) : (
                        <p className="font-medium">{formData.mother.annualIncome}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guardian block */}
            <div className="rounded-xl border border-dashed border-border/60 bg-background/40 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                Local Guardian (if any)
              </p>
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.guardian.name}
                      onChange={(e) => handleInputChange('guardian', 'name', e.target.value)}
                      className="w-full px-2 py-1 rounded border border-input bg-background font-medium"
                    />
                  ) : (
                    <p className="font-medium">{formData.guardian.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Relation</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.guardian.relation}
                      onChange={(e) => handleInputChange('guardian', 'relation', e.target.value)}
                      className="w-full px-2 py-1 rounded border border-input bg-background font-medium"
                    />
                  ) : (
                    <p className="font-medium">{formData.guardian.relation}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.guardian.phone}
                      onChange={(e) => handleInputChange('guardian', 'phone', e.target.value)}
                      className="w-full px-2 py-1 rounded border border-input bg-background font-medium"
                    />
                  ) : (
                    <p className="font-medium">{formData.guardian.phone}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-muted-foreground mb-1">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.guardian.address}
                      onChange={(e) => handleInputChange('guardian', 'address', e.target.value)}
                      className="w-full px-2 py-1 rounded border border-input bg-background font-medium"
                    />
                  ) : (
                    <p className="font-medium">{formData.guardian.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Siblings */}
            {parentData.siblings && parentData.siblings.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3 font-semibold">Siblings</p>
                <div className="grid gap-4 md:grid-cols-2">
                  {parentData.siblings.map((sibling, index) => (
                    <div key={index} className="rounded-xl border border-border/60 bg-muted/20 p-4">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{sibling.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">Age: {sibling.age}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground text-xs">Education</span>
                          <p className="font-medium">{sibling.education}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">Phone</span>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{sibling.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

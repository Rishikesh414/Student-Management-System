import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import SectionCard from '@/components/common/SectionCard';
import { Save, X, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const personalData = {
  email: 'rahul.sharma@student.university.edu',
  phone: '+91 98765 43210',
  alternatePhone: '+91 87654 32109',
  address: '123 Main Street, Sector 15',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  nationality: 'Indian',
  religion: 'Hindu',
  category: 'General',
  aadharNo: 'XXXX XXXX 1234',
  dob: '2003-05-15',
  gender: 'Male',
  bloodGroup: 'O+',
  motherTongue: 'Hindi',
};

export default function PersonalInfo() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: personalData.email,
    phone: personalData.phone,
    alternatePhone: personalData.alternatePhone,
    address: personalData.address,
    city: personalData.city,
    state: personalData.state,
    pincode: personalData.pincode,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    toast({
      title: 'Success',
      description: 'Personal information updated successfully.',
    });
  };

  const handleCancel = () => {
    setFormData({
      email: personalData.email,
      phone: personalData.phone,
      alternatePhone: personalData.alternatePhone,
      address: personalData.address,
      city: personalData.city,
      state: personalData.state,
      pincode: personalData.pincode,
    });
    setIsEditing(false);
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <PageHeader
        title="Personal Information"
        subtitle="Manage your contact details"
        breadcrumbs={[
          { label: 'Profile', path: '/profile/basic' },
          { label: 'Personal Info' },
        ]}
      />

      <div className="grid gap-6">
        {/* Unified Personal Details Card */}
        <SectionCard 
          title="Personal Details"
          subtitle="Manage your personal, contact, and address information"
          actions={
            isEditing && (
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
            )
          }
        >
          <div className="space-y-6">
            {/* Core personal details (read-only) */}
            <div className="grid gap-4 sm:grid-cols-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Date of Birth</label>
                <p className="font-medium">{personalData.dob}</p>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Gender</label>
                <p className="font-medium">{personalData.gender}</p>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Blood Group</label>
                <p className="font-medium">{personalData.bloodGroup}</p>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Mother Tongue</label>
                <p className="font-medium">{personalData.motherTongue}</p>
              </div>
            </div>

            {/* Contact information (editable) */}
            <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
              ) : (
                <p className="py-2.5">{formData.email}</p>
              )}
            </div>
              <div className="grid gap-4 sm:grid-cols-2">
            <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                />
              ) : (
                <p className="py-2.5">{formData.phone}</p>
              )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Alternate Mobile Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.alternatePhone}
                      onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                      className="input-field"
                    />
                  ) : (
                    <p className="py-2.5">{formData.alternatePhone}</p>
                  )}
                </div>
            </div>
          </div>

            {/* Address details (editable) */}
          <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Street Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="py-2.5">{formData.address}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="py-2.5">{formData.city}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">State</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="py-2.5">{formData.state}</p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Pin Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="py-2.5">{formData.pincode}</p>
                )}
            </div>
          </div>

            {/* Other details (read-only) */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Nationality</label>
              <p className="font-medium">{personalData.nationality}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Religion</label>
              <p className="font-medium">{personalData.religion}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Category</label>
              <p className="font-medium">{personalData.category}</p>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Aadhar Number</label>
              <p className="font-medium">{personalData.aadharNo}</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

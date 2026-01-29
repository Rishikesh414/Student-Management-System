import { useAuth } from '@/context/AuthContext';
import PageHeader from '@/components/layout/PageHeader';
import SectionCard from '@/components/common/SectionCard';
import ProfileNavBar from '@/components/layout/ProfileNavBar';
import { User, Upload, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Mock additional data
const basicInfoData = {
  rollNo: '21CS101',
  registerNo: '921023104008',
  admissionNo: 'ADM2021-001',
  name: 'Rahul Sharma',
  department: 'Computer Science',
  year: 3,
  semester: 5,
  section: 'A',
  dob: '2003-05-15',
  gender: 'Male',
  admissionDate: '2021-08-01',
  batch: '2021-2025',
  bloodGroup: 'O+',
  residenceType: 'Hostel',
};

interface InfoRowProps {
  label: string;
  value: string | number;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground sm:w-40 mb-1 sm:mb-0">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default function BasicInfo() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes('pdf') && !file.type.includes('document') && !file.name.endsWith('.pdf')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    // Simulate file upload
    const reader = new FileReader();
    reader.onload = async (event) => {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResumeFile(file.name);
      setUploading(false);
      setPendingRequest(true);
      toast({
        title: 'Request Submitted',
        description: 'Your resume has been submitted to faculty for approval.',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <PageHeader
        title="Basic Information"
        subtitle="Your academic profile details"
        breadcrumbs={[
          { label: 'Profile', path: '/profile/basic' },
          { label: 'Basic Info' },
        ]}
      />

      <ProfileNavBar />

      {pendingRequest && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 mb-6">
          <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900">Change Request Pending</h3>
            <p className="text-sm text-amber-800 mt-1">
              Your changes have been submitted to faculty for approval. You cannot make new changes until they respond.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {/* Profile Header */}
        <div className="section-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold">{basicInfoData.name}</h2>
                <p className="text-muted-foreground">{basicInfoData.rollNo}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="badge badge-info">{basicInfoData.department}</span>
                  <span className="badge badge-success">Active</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {resumeFile && (
                <span className="text-sm text-muted-foreground">
                  Resume: <span className="font-medium">{resumeFile}</span>
                </span>
              )}
              <label className="cursor-pointer">
                <Button
                  disabled={pendingRequest}
                  className="flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  asChild
                >
                  <span>
                    <Upload className="w-4 h-4" />
                    {resumeFile ? 'Change Resume' : 'Upload Resume'}
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  disabled={uploading || pendingRequest}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <SectionCard title="Academic Details">
          <div className="divide-y divide-border/50">
            <InfoRow label="Admission Number" value={basicInfoData.admissionNo} />
            <InfoRow label="Roll Number" value={basicInfoData.rollNo} />
            <InfoRow label="Register Number" value={basicInfoData.registerNo} />
            <InfoRow label="Full Name" value={basicInfoData.name} />
            <InfoRow label="Department" value={basicInfoData.department} />
            <InfoRow label="Year" value={`${basicInfoData.year} Year`} />
            <InfoRow label="Semester" value={`Semester ${basicInfoData.semester}`} />
            <InfoRow label="Section" value={basicInfoData.section} />
            <InfoRow label="Batch" value={basicInfoData.batch} />
            <InfoRow label="Admission Date" value={basicInfoData.admissionDate} />
            <InfoRow label="Nature of Residence" value={basicInfoData.residenceType} />
          </div>
        </SectionCard>

      </div>
    </div>
  );
}

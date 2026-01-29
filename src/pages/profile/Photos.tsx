import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import SectionCard from '@/components/common/SectionCard';
import ProfileNavBar from '@/components/layout/ProfileNavBar';
import { Upload, Camera, Users, X, Check, Edit, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Photos() {
  const { toast } = useToast();
  const [studentPhoto, setStudentPhoto] = useState<string | null>(null);
  const [familyPhoto, setFamilyPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState<'student' | 'family' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'student' | 'family') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPG, PNG, or WebP image.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(type);

    // Read file and create preview
    const reader = new FileReader();
    reader.onload = async (event) => {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (type === 'student') {
        setStudentPhoto(event.target?.result as string);
      } else {
        setFamilyPhoto(event.target?.result as string);
      }
      
      setUploading(null);
      setPendingRequest(true);
      toast({
        title: 'Request Submitted',
        description: 'Your photo has been submitted to faculty for approval.',
      });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (type: 'student' | 'family') => {
    if (type === 'student') {
      setStudentPhoto(null);
    } else {
      setFamilyPhoto(null);
    }
    toast({
      title: 'Photo removed',
      description: 'The photo has been removed.',
    });
  };

  interface PhotoUploadCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    photo: string | null;
    type: 'student' | 'family';
  }

  const PhotoUploadCard = ({ title, description, icon: Icon, photo, type }: PhotoUploadCardProps) => (
    <SectionCard 
      title={title} 
      subtitle={description}
    >
      <div className="flex flex-col items-center gap-4">
        {photo ? (
          <div className="relative">
            <img
              src={photo}
              alt={title}
              className="w-48 h-48 object-cover rounded-xl border-2 border-border"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
          </div>
        ) : (
          <div className="w-48 h-48 rounded-xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <Icon className="w-7 h-7 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">No photo uploaded</p>
              <p className="text-xs text-muted-foreground">Photo will appear here</p>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );

  return (
    <div className="animate-fade-in max-w-4xl">
      <PageHeader
        title="Photos"
        subtitle="Upload and manage your photos"
        breadcrumbs={[
          { label: 'Profile', path: '/profile/basic' },
          { label: 'Photos' },
        ]}
      />

      <ProfileNavBar />

      {pendingRequest && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 mb-6">
          <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900">Change Request Pending</h3>
            <p className="text-sm text-amber-800 mt-1">
              Your photos have been submitted to faculty for approval. You cannot make new changes until they respond.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <PhotoUploadCard
          title="Student Photo"
          description="Your official profile photo"
          icon={Camera}
          photo={studentPhoto}
          type="student"
        />
        <PhotoUploadCard
          title="Family Photo"
          description="Photo with your family"
          icon={Users}
          photo={familyPhoto}
          type="family"
        />
      </div>
    </div>
  );
}

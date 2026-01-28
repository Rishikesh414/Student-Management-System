import { useAuth } from '@/context/AuthContext';
import PageHeader from '@/components/layout/PageHeader';
import SectionCard from '@/components/common/SectionCard';
import ProfileNavBar from '@/components/layout/ProfileNavBar';
import { User, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const handleDownloadResume = () => {
    // Create a sample resume content in PDF format
    const resumeContent = `
RAHUL SHARMA
Roll No: 21CS101 | Email: rahul.sharma@college.edu | Phone: +91 9876543210

SUMMARY
Dedicated Computer Science student with strong academic performance and passion for software development. 
Proficient in multiple programming languages and frameworks with hands-on experience in various projects.

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science
College/University Name | Expected Graduation: 2025
Current Semester: 5 (3rd Year) | GPA: 8.5/10 | Section: A

TECHNICAL SKILLS
Languages: Python, Java, C++, JavaScript, HTML/CSS
Frameworks & Tools: React, Node.js, SQL, Git, Linux
Specializations: Web Development, Data Structures, Database Management

ACADEMIC ACHIEVEMENTS
• Dean's List for excellent academic performance
• Active participant in coding competitions
• Technical event organizer at college functions

PROJECTS
• Student Management System - Built using React and Node.js
• E-Commerce Platform - Full-stack development project
• Data Visualization Dashboard - Python and D3.js

EXTRACURRICULAR ACTIVITIES
• Football Team Member
• Cultural Fest Participant
• Technical Club Coordinator

CERTIFICATIONS & TRAINING
• Python Programming - Completed
• Web Development Bootcamp - In Progress
    `;

    // Create a blob and download it as a text file
    // In a real application, this would be a PDF file
    const element = document.createElement('a');
    const file = new Blob([resumeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Rahul_Sharma_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
            <Button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
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

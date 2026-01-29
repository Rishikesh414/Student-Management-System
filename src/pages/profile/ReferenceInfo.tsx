import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import SectionCard from '@/components/common/SectionCard';
import ProfileNavBar from '@/components/layout/ProfileNavBar';
import { User, Phone, MapPin, Plus, ChevronDown, X, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [referenceList, setReferenceList] = useState(references);
  const [filter, setFilter] = useState<'all' | 'references' | 'relatives'>('all');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [addType, setAddType] = useState<'reference' | 'relative'>('reference');
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    occupation: '',
    countryCode: '+91',
    phone: '',
    address: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const relationshipOptions = [
    'Parent',
    'Sibling',
    'Relative',
    'Friend',
    'Family Friend',
    'Neighbor',
    'Teacher',
    'Colleague',
    'Other',
  ];

  const handleAddClick = (type: 'reference' | 'relative') => {
    setAddType(type);
    setFormData({
      name: '',
      relationship: '',
      occupation: '',
      countryCode: '+91',
      phone: '',
      address: '',
    });
    setShowDialog(true);
    setShowAddMenu(false);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Full Name is required.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.relationship) {
      toast({
        title: 'Error',
        description: 'Relationship is required.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.phone.trim()) {
      toast({
        title: 'Error',
        description: 'Mobile Number is required.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (editingId) {
      // Update existing reference
      setReferenceList(referenceList.map(ref =>
        ref.id === editingId
          ? {
              ...ref,
              name: formData.name,
              relation: formData.relationship,
              phone: `${formData.countryCode} ${formData.phone}`,
              address: formData.address,
              occupation: formData.occupation,
            }
          : ref
      ));
      setIsSaving(false);
      setShowDialog(false);
      setEditingId(null);
      toast({
        title: 'Success',
        description: 'Reference updated successfully.',
      });
    } else {
      // Add new reference
      const newReference = {
        id: Math.max(...referenceList.map(r => r.id), 0) + 1,
        name: formData.name,
        relation: formData.relationship,
        phone: `${formData.countryCode} ${formData.phone}`,
        address: formData.address,
        occupation: formData.occupation,
      };

      setReferenceList([...referenceList, newReference]);
      setIsSaving(false);
      setShowDialog(false);

      toast({
        title: 'Success',
        description: `${addType === 'reference' ? 'Reference' : 'Relative'} added successfully.`,
      });
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setEditingId(null);
    setFormData({
      name: '',
      relationship: '',
      occupation: '',
      countryCode: '+91',
      phone: '',
      address: '',
    });
  };

  const handleEditClick = (reference: typeof referenceList[0]) => {
    const [countryCode, ...phoneParts] = reference.phone.split(' ');
    const phone = phoneParts.join(' ');
    
    setEditingId(reference.id);
    setFormData({
      name: reference.name,
      relationship: reference.relation,
      occupation: reference.occupation,
      countryCode: countryCode,
      phone: phone,
      address: reference.address,
    });
    setShowDialog(true);
    setOpenMenuId(null);
  };

  const handleDeleteClick = async (id: number) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setReferenceList(referenceList.filter(ref => ref.id !== id));
    setIsSaving(false);
    setOpenMenuId(null);
    toast({
      title: 'Success',
      description: 'Reference deleted successfully.',
    });
  };

  const categorizedReferences = referenceList.map((ref, index) => ({
    ...ref,
    type: index < 2 ? 'references' : 'relatives',
  }));

  const filtered = categorizedReferences.filter((ref) => {
    if (filter === 'all') return true;
    return ref.type === filter;
  });

  return (
    <div className="animate-fade-in max-w-4xl">
      <PageHeader
        title="Reference and Relatives in this Institution"
        subtitle="Emergency contacts and references"
        breadcrumbs={[
          { label: 'Profile', path: '/profile/basic' },
          { label: 'References' },
        ]}
      />

      <ProfileNavBar />

      {/* Add button with dropdown */}
      <div className="relative mb-6">
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
          <ChevronDown className="w-4 h-4" />
        </button>

        {showAddMenu && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-10">
            <button
              onClick={() => handleAddClick('reference')}
              className="w-full text-left px-4 py-2 hover:bg-muted transition-colors first:rounded-t-lg"
            >
              <User className="w-4 h-4 inline mr-2" />
              Add Reference
            </button>
            <button
              onClick={() => handleAddClick('relative')}
              className="w-full text-left px-4 py-2 hover:bg-muted transition-colors last:rounded-b-lg border-t border-border"
            >
              <User className="w-4 h-4 inline mr-2" />
              Add Relative
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No {filter !== 'all' ? filter : 'references or relatives'} to show.</p>
          </div>
        ) : (
          filtered.map((ref, index) => (
            <div key={ref.id} className="relative">
              <SectionCard 
                title={`${ref.type === 'references' ? 'Reference' : 'Relative'} ${index + 1}`}
                actions={
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(ref)}
                      className="px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors flex items-center gap-2"
                      title="Edit reference"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                }
              >
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
            </div>
          ))
        )}

        {/* Dialog for adding/editing references */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit Reference' : `Add New ${addType === 'reference' ? 'Reference' : 'Relative'}`}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Relationship *</label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                >
                  <option value="">Select relationship</option>
                  {relationshipOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Occupation</label>
                <input
                  type="text"
                  placeholder="Enter occupation"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="+91"
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="w-20 px-3 py-2 border border-input rounded-lg bg-background"
                  />
                  <input
                    type="text"
                    placeholder="10 digits"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 px-3 py-2 border border-input rounded-lg bg-background"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div className="flex gap-2 justify-end mt-6">
                <DialogClose asChild>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                </DialogClose>
                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="btn-primary"
                >
                  {isSaving ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

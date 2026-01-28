import SectionCard from '@/components/common/SectionCard';
import Badge from '@/components/common/Badge';

interface Sport {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'inactive';
  joinedDate: string;
}

const initialSports: Sport[] = [
  {
    id: '1',
    name: 'Football',
    category: 'Team Sports',
    status: 'active',
    joinedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Basketball',
    category: 'Team Sports',
    status: 'active',
    joinedDate: '2024-02-01',
  },
  {
    id: '3',
    name: 'Tennis',
    category: 'Individual Sports',
    status: 'inactive',
    joinedDate: '2023-06-10',
  },
];

export default function Sports() {
  return (
    <div className="grid gap-4">
      {initialSports.map((sport) => (
        <SectionCard key={sport.id} title={sport.name} className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Category: {sport.category}</p>
              <p className="text-sm text-muted-foreground">Joined: {sport.joinedDate}</p>
            </div>
            <Badge variant={sport.status === 'active' ? 'success' : 'secondary'}>
              {sport.status}
            </Badge>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

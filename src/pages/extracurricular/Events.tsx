import SectionCard from '@/components/common/SectionCard';
import Badge from '@/components/common/Badge';

interface Event {
  id: string;
  name: string;
  date: string;
  category: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
}

const initialEvents: Event[] = [
  {
    id: '1',
    name: 'Annual Sports Day',
    date: '2024-03-15',
    category: 'Sports',
    status: 'upcoming',
    location: 'Main Ground',
  },
  {
    id: '2',
    name: 'Cultural Fest',
    date: '2024-04-20',
    category: 'Cultural',
    status: 'upcoming',
    location: 'Auditorium',
  },
  {
    id: '3',
    name: 'Debate Competition',
    date: '2024-02-10',
    category: 'Academic',
    status: 'completed',
    location: 'Conference Hall',
  },
];

export default function Events() {
  return (
    <div className="grid gap-4">
      {initialEvents.map((event) => (
        <SectionCard key={event.id} title={event.name} className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Date: {event.date}</p>
              <p className="text-sm text-muted-foreground">Location: {event.location}</p>
              <p className="text-sm text-muted-foreground">Category: {event.category}</p>
            </div>
            <Badge variant={event.status === 'upcoming' ? 'default' : event.status === 'completed' ? 'success' : 'destructive'}>
              {event.status}
            </Badge>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

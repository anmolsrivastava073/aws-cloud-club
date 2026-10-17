export interface Speaker {
  name: string;
  designation: string;
  image: string;
  bio?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  shortDescription: string;
  fullDescription: string;
  registrationOpen: boolean;
  meetupLink?: string;
  speakers: Speaker[];
  recap?: {
    title: string;
    paragraphs: string[];
    photos: string[];
  };
}

export interface Registration {
  name: string;
  reg_id: string;
  email: string;
  branch_section: string;
  missed_classes: string;
  faculty_names: string;
}

export interface Member {
  id: string;
  name: string;
  position: string;
  category: string[]; 
  image?: string;
  number?: string;
  role?: 'captain' | 'co-captain' | 'lead' | 'co-lead' | 'swt';
}

export interface Faculty {
  id: string;
  name: string;
  position: string;
  image?: string;
  department?: string;
  email?: string;
}

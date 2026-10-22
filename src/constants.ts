import { Event, Member, Faculty } from './types';

export const FACULTY: Faculty[] = [
  {
    id: 'f1',
    name: 'Dr. Vaishali Chauhan',
    position: 'Assistant Professor(Senior Scale)',
    department: 'Department of Computer Science Engineering',
    email: 'vaishali.chauhan@jaipur.manipal.edu',
    image: '/people/vaishali.png', 
  }
];

export const EVENTS: Event[] = [
  {
    id: '3',
    title: 'Cloud Quest - Exploring Cloud Technologies',
    date: 'October 26, 2026',
    time: '12:30 PM - 2:30 PM',
    venue: 'Hybrid Mode (LHC, MUJ & MS Teams)',
    shortDescription: 'Join the AWS Student Builder Group at Manipal University Jaipur for CLOUD QUEST: Exploring Cloud Technologies. Led by former AWS Senior Solutions Architect Mr. Chetan Agrawal, this hybrid session offers a deep dive into real-world cloud applications, essential industry skills, and placement insights. Open to students of all academic years!',
    fullDescription: `The AWS Student Builder Group at Manipal University Jaipur proudly presents CLOUD QUEST: Exploring Cloud Technologies, an interactive hybrid session designed to bridge the gap between foundational concepts and industry expectations in the cloud computing space.

Whether you are just starting your tech journey or looking to sharpen your placement strategy, this event provides direct access to expert knowledge. We are thrilled to host Mr. Chetan Agrawal, an AWS Educator, Cloud Consultant, and former Senior Solutions Architect at AWS, who will share his extensive industry experience and roadmap for success.

What You Will Take Away:
• Real-World Cloud Applications: Understand how global businesses actually leverage cloud technologies to scale and innovate.
• Career & Placement Insights: Get actionable advice on navigating the current job market and positioning yourself for top tech roles.
• Industry-Relevant Skills: Identify the specific cloud skills, tools, and learning paths that employers are looking for right now.
• Interactive Q&A: Bring your questions for a direct, open discussion with a seasoned AWS veteran.`,
    meetupLink: 'https://www.meetup.com/aws-sbg-at-manipal-university-jaipur/events/317086295/rsvp/',
    registrationOpen: true,
    speakers: [
      {
        name: 'Mr. Chetan Agrawal',
        designation: 'AWS Educator | Cloud Consultant | Former Sr. Solutions Architect, AWS',
        image: '/images/chetanagrawal.jpg',
        bio: 'An esteemed AWS Educator, Cloud Consultant, and former Senior Solutions Architect at AWS. He brings extensive industry experience and will provide a strategic roadmap for students looking to build a successful career in cloud technologies.',
      },
    ],
    recap: {
      title: 'Test recap',
      paragraphs: [
        'paragraph 1',
        'paragraph 2',
        'paragraph 3',
      ],
      photos: [
        '/images/img1.jpeg',
        '/images/img2.png',
        '/images/img3.jpeg',
      ],
    },
  },
  {
    id: '2',
    title: 'Localhost to Cloud Host: Build & Deploy',
    date: 'April 1, 2026',
    time: '10:30 AM - 12:30 PM',
    venue: 'LHC 103',
    shortDescription: 'A hands-on AWS Student Builder Group workshop where participants build a backend application using Python and Flask while understanding real-world development workflows.',
    fullDescription: 'The "Localhost to Cloud Host: Build & Deploy" workshop is a hands-on session organized by the AWS Student Builder Group at Manipal University Jaipur. The workshop aims to provide participants with a practical understanding of how backend applications are developed and structured using modern technologies. During the session, participants will build a backend application using Python and Flask, gaining insight into how applications are designed, managed, and prepared for deployment. The focus is on understanding the development workflow and the key components involved in taking an application beyond the local environment. This workshop is conducted in a hybrid mode, allowing participants to join both offline and online, ensuring accessibility to a wider audience. The session will be led by Shubham Londhe, who will guide participants through the process with a focus on clarity and practical learning.',
    meetupLink: 'https://www.meetup.com/aws-cloud-club-at-manipal-university-jaipur/events/313966432/',
    registrationOpen: true,
    speakers: [
      {
        name: 'Shubham Londhe',
        designation: 'Senior Developer Advocate',
        image: '/images/shubhamlondhe.jpeg',
        bio: 'Senior Developer Advocate focused on helping developers build and ship cloud-native apps on AWS.',
      },
    ],
    recap: {
      title: 'Session Recap: Localhost to Cloud Host',
      paragraphs: [
        'The second session of AWS Student Builder Group MUJ was conducted seamlessly by Shubham Londhe Sir, covering the complete journey of deploying a backend application from a local machine to the cloud.',
        'Participants got hands-on experience building a Python Flask application, understanding project structure, environment setup, and the step-by-step deployment workflow using AWS services.',
        'The session was engaging, interactive, and packed with practical insights, from writing the first endpoint to watching it go live on the cloud. A big thank you to Shubham Londhe Sir for making complex concepts approachable and fun.',
      ],
      photos: [
        '/images/img1.jpg',
        '/images/img2.jpg',
        '/images/img3.jpg',
      ],
    },
  },
  {
    id: '1',
    title: 'LAUNCH EVENT',
    date: 'March 12, 2026',
    time: '10:30 AM - 12:30 PM',
    venue: 'LHC 103',
    shortDescription: 'We are excited to share that the AWS Student Builder Group at Manipal University Jaipur has been officially launched...',
    fullDescription: 'The AWS Student Builder Group MUJ was officially launched with an inspiring inaugural event, marking the beginning of a dynamic cloud-focused student community at Manipal University Jaipur. The event brought together enthusiastic students eager to explore cloud computing, AWS technologies, and future career opportunities in this domain. The session was graced by esteemed speakers Mr. Pawan Sharma and Mr. Somil Jain, who shared valuable insights into the world of cloud, industry trends, and practical career guidance. Their experiences and perspectives provided students with a clear understanding of real-world applications of AWS and the growing importance of cloud technologies. The event set a strong foundation for innovation, collaboration, and learning, encouraging students to actively engage, build projects, and grow within the AWS ecosystem.',
    meetupLink: '',
    registrationOpen: false,
    speakers: [
      {
        name: 'Mr. Pawan Sharma',
        designation: 'AWS Community Builder',
        image: '/images/pawansharma.jpeg',
        bio: 'Delivered an insightful session on AWS fundamentals.',
      },
      {
        name: 'Mr. Somil Jain',
        designation: 'Cloud Engineer at Celebal Technologies',
        image: '/images/somiljain.jpeg',
        bio: 'Shared practical industry experiences.',
      },
    ],
    recap: {
      title: 'Launch Event Recap',
      paragraphs: [
        'We are excited to share that the AWS Student Builder Group MUJ has been officially launched at Manipal University Jaipur.',
        'A special thank you to our esteemed speakers, Mr. Pawan Sharma and Mr. Somil Jain, for sharing their valuable insights and experiences.',
        'We would also like to extend our sincere gratitude to our Faculty Coordinator, Ms. Vaishali Chauhan, for helping the club function so seamlessly',
      ],
      photos: [
        '/images/aws-launch-event.jpeg',
        '/images/Pawansharmaspeaking.png',
        '/images/aws-launchevent-members.jpeg',
      ],
    },
  },
];

export interface TeamSession {
  id: string;                 
  label: string;              
  workingTeamLabel: string;   
  members: Member[];
}

const MEMBERS_2026_27: Member[] = [
  { id: 's26-1', name: 'Tanima Mishra', position: 'Club Captain', category: ['Core'], image: '/people/tanima.png' },
  { id: 's26-2', name: 'Reetikesh Chaudhary', position: 'Club Co-Captain', category: ['Core'], image: '/people/reetikesh.png' },
  { id: 's26-3', name: 'Saumya Dogra', position: 'Technical Lead', category: ['Core', 'Technical'], image: '/people/saumya.png' },
  { id: 's26-5', name: 'Kasmya Bhatia', position: 'Event Management Lead', category: ['Core', 'Event Management'], image: '/people/kasmya.png' },
  { id: 's26-7', name: 'Shivansh Yadav', position: 'Graphic Design Lead', category: ['Core', 'GDXSM'], image: '/people/shivansh.png' },
  { id: 's26-9', name: 'Hrishiraj Sarmah', position: 'Finance Lead', category: ['Core', 'Finance'], image: '/people/hrishiraj.png' },
  { id: 's26-4', name: 'Zehel Nehil', position: 'Technical Co-Lead', category: ['Core', 'Technical'], image: '/people/zehel.png' },
  { id: 's26-6', name: 'Shreyans Chordia', position: 'Event Management Co-Lead', category: ['Core', 'Event Management'], image: '/people/shreyans.png' },
  { id: 's26-8', name: 'Adarsh', position: 'Graphic Design Co-Lead', category: ['Core', 'GDXSM'], image: '/people/adarsh.png' },
  { id: 's26-10', name: 'Anmol Srivastava', position: 'Technical Team Member', category: ['Technical'], image: '/people/anmol.png' },
  { id: 's26-11', name: 'Shashwat Jindal', position: 'Technical Team Member', category: ['Technical'], image: '/people/shashwat.png' },
  { id: 's26-12', name: 'Dhruv Mittal', position: 'Technical Team Member', category: ['Technical'], image: '/people/dhruv.png' },
  { id: 's26-13', name: 'Vishwaswarup Rath', position: 'Technical Team Member', category: ['Technical'], image: '/people/vishwaswarup.png' },
  { id: 's26-14', name: 'Satyam Jha', position: 'Technical Team Member', category: ['Technical'], image: '/people/satyam.png' },
  { id: 's26-14', name: 'Aditya Raj', position: 'Events Team Member', category: ['Event Management'], image: '/people/aditya.png' },
  { id: 's26-15', name: 'Lavisha Rohra', position: 'Events Team Member', category: ['Event Management'], image: '/people/lavisha.png' },
];

const MEMBERS_2025_26: Member[] = [
  { id: '1', name: 'Aabha Rajpal', position: 'Club Captain', category: ['Core'], image: '/people/aabha.png' },
  { id: '2', name: 'Ayush Goyal', position: 'Club Co-Captain', category: ['Core'], image: '/people/ayush.png' },
  { id: '3', name: 'Aanya Singh Saini', position: 'Technical Lead', category: ['Core', 'Technical'], number: '+91 7982875604', image: '/people/aanya.png' },
  { id: '5', name: 'Shreyans Chordia', position: 'Event Management Lead', category: ['Core', 'Event Management'], number: '+91 6268088544', image: '/people/shreyans.png' },
  { id: '6', name: 'Lavisha Rohra', position: 'Event Management Co-Lead', category: ['Core', 'Event Management'], number: '+91 8595800533', image: '/people/lavisha.png' },
  { id: '7', name: 'Akhil Prakash', position: 'Social Media Lead', category: ['Core', 'GDXSM'], number: '+91 7858818551', image: '/people/akhil.png' },
  { id: '8', name: 'Praneel Kapoor', position: 'Graphic Design Lead', category: ['Core', 'GDXSM'], number: '+91 8726233333', image: '/people/praneel.png' },
  { id: '9', name: 'Varun Nevatia', position: 'Finance Lead', category: ['Core', 'Finance'], number: '+91 7987091622', image: '/people/varun.png' },
  { id: '10', name: 'Aditya Pathak', position: 'Finance Co-Lead', category: ['Core', 'Finance'], number: '+91 9902994004', image: '/people/adityapathak.png' },
  { id: '11', name: 'Anmol Srivastava', position: 'Technical SWT Member', category: ['Technical'], number: '+91 8429631456', image: '/people/anmol.png' },
  { id: '12', name: 'Bhargavi Chaudhary', position: 'Technical SWT Member', category: ['Technical'], number: '+91 9756007078', image: '/people/bhargavi.png' },
  { id: '13', name: 'Satyam Jha', position: 'Technical SWT Member', category: ['Technical'], image: '/people/satyam.png' },
  { id: '14', name: 'Prerna Vaidya', position: 'Event Management SWT Member', category: ['Event Management'], number: '+91 8487061509', image: '/people/prerna.png' },
  { id: '15', name: 'Aarush Modi', position: 'Event Management SWT Member', category: ['Event Management'], number: '+91 6396717971', image: '/people/aarush.png' },
  { id: '16', name: 'Shivang Ravindra Pratap Singh', position: 'Event Management SWT Member', category: ['Event Management'], number: '+91 7021769024', image: '/people/shivang.png' },
  { id: '17', name: 'Lakshita Annapareddy', position: 'GDXSM SWT Member', category: ['GDXSM'], number: '+91 7815859797', image: '/people/lakshita.png' },
  { id: '19', name: 'Shivansh Yadav', position: 'GDXSM SWT Member', category: ['GDXSM'], number: '+91 8825701627', image: '/people/shivansh.png' },
];

export const TEAM_SESSIONS: TeamSession[] = [
  {
    id: '2026-27',
    label: '2026–27',
    workingTeamLabel: 'Senior Working team',
    members: MEMBERS_2025_26,   
  },
  {
    id: '2025-26',
    label: '2025–26',
    workingTeamLabel: 'Team Members',
    members: MEMBERS_2026_27,   
  },
];

export const MEMBERS: Member[] = TEAM_SESSIONS[0].members;

export const LINKEDIN_URLS: Record<string, string> = {
  'Aabha Rajpal': 'https://www.linkedin.com/in/aabha-rajpal-630b41300/',
  'Ayush Goyal': 'https://www.linkedin.com/in/ayush-goyal-1875a832a/',
  'Aanya Singh Saini': 'https://www.linkedin.com/in/aanya-singh-b00352275/',
  'Shreyans Chordia': 'https://www.linkedin.com/in/shreyans-chordia-b7b897339/',
  'Lavisha Rohra': 'https://www.linkedin.com/in/lavisha-rohra-5a7570372/',
  'Akhil Prakash': 'https://www.linkedin.com/in/akhil-prakash-b08353308/',
  'Praneel Kapoor': 'https://www.linkedin.com/in/praneel-kapoor/',
  'Varun Nevatia': 'https://www.linkedin.com/in/varun-nevatia-9b978b304/',
  'Aditya Pathak': 'https://www.linkedin.com/in/aditya-pathak50032/',
  'Bhargavi Chaudhary': 'https://www.linkedin.com/in/bhargavi-chaudhary-55384936a/',
  'Anmol Srivastava': 'https://www.linkedin.com/in/anmol-srivastava-46430727a/',
  'Prerna Vaidya': 'https://www.linkedin.com/in/prerna-vaidya-9239a1377/',
  'Aarush Modi': 'https://www.linkedin.com/in/aarush-modi-4a8b43380/',
  'Shivang Ravindra Pratap Singh': 'https://www.linkedin.com/in/cipher3787-shivangsingh/',
  'Lakshita Annapareddy': 'https://www.linkedin.com/in/lakshita-annapareddy-385a9341a/',
  'Shivansh Yadav': 'https://www.linkedin.com/in/shivansh-yadav-82130a273/',
  'Tanima Mishra': 'https://www.linkedin.com/in/tanima-mishra/',
  'Reetikesh Chaudhary': 'https://www.linkedin.com/in/reetikesh-choudhury/',
  'Saumya Dogra': 'https://www.linkedin.com/in/saumya-dogra-029023236/',
  'Zehel Nehil': 'https://www.linkedin.com/in/zehel-nehil-45617428a/',
  'Kasmya Bhatia': 'https://www.linkedin.com/in/kasmya/',
  'Satyam Jha':'https://www.linkedin.com/in/satyam-jha-26b310301/',
  'Hrishiraj Sarmah': 'https://www.linkedin.com/in/hrishirajds/',
  'Shashwat Jindal': 'https://www.linkedin.com/in/shashwat-jindal-b6879a314/',
  'Vishwaswarup Rath': 'https://www.linkedin.com/in/vishwaswarup-rath/',
  'Dhruv Mittal':'https://www.linkedin.com/in/dhruv-21-17-25-n/',
  'Aditya Raj': 'https://www.linkedin.com/in/aditya-raj-b52584364/',
  'Anuj Bhardwaj': 'https://www.linkedin.com/in/anujbhardwaj2006/',
};

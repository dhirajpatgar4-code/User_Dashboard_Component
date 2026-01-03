const counsellorData = {
  Profiledata: {
    // profileImage: '../assets/doctor.png',
    name: 'Dr. Raghav Sinha',
    isVerified: 'true',
    specialization: 'Mental Health and Wellness & Therapy Specialist',
    languages: ['Hindi', 'English'],
    clientsHelped: 48000,
    rating: 4.8,
    reviewsCount: 1500,
    acceptingNewClients: true,
  },
  pricing: [
    {
      id: 'mental-health',
      name: 'Mental Health',
      price: 1199,
      currency: '₹',
    },
    {
      id: 'wellness-therapy',
      name: 'Wellness & Therapy',
      price: 1299,
      currency: '₹',
    },
  ],
  AboutCardInfo: {
    details: [
      {
        heading: '12+ years of experience',
        description:
          'Specialised in CBT, DBT, trauma-focused therapy, and behavioural interventions.',
      },
      {
        heading: '90% Recommendation',
        description:
          'Highly trusted for his empathetic approach and effective recovery outcomes.',
      },
      {
        heading: 'Online Consultation Ability',
        description:
          'Sessions via video, chat, or audio for convenience and privacy.',
      },
    ],
    buttonText: 'Book an Appointment',
  },
  bioPoints: [
    'Dr. Raghav Sinha is a trusted mental health expert known for his warm communication and evidence-based therapy methods.',
    'He specializes in treating anxiety, depression, stress-related issues, trauma recovery, OCD, ADHD, and relationship challenges.',
    'His sessions focus on helping patients gain clarity, emotional stability, and long-term mental resilience.',
  ],
};

export default counsellorData;

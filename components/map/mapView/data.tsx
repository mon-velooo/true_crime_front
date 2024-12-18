const data = {
  crimes: [
    {
      id: '1a2b3c4d-1234-5678-9abc-def123456789',
      start_date: '2024-06-01',
      start_time: '12:15:00',
      end_date: '2024-06-01',
      end_time: '12:45:00',
      latitude: 40.7128,
      longitude: -74.006,
      description: 'Vol à la tire dans un parc.',
      district: {
        id: 1,
        name: 'Manhattan'
      },
      location_description: {
        id: 1,
        description: 'Parc public'
      },
      location_type: {
        id: 1,
        label: 'Extérieur'
      },
      suspect: {
        id: 2,
        age_group: {
          id: 2,
          range: '25-34'
        },
        gender: {
          id: 1,
          label: 'M'
        }
      },
      victim: {
        id: 5,
        age_group: {
          id: 3,
          range: '18-24'
        },
        gender: {
          id: 2,
          label: 'F'
        }
      },
      status: {
        id: 1,
        label: 'En cours'
      },
      law_category: {
        id: 1,
        label: 'Larceny'
      }
    },
    {
      id: '5e6f7g8h-5678-1234-9abc-def987654321',
      start_date: '2024-06-02',
      start_time: '23:30:00',
      end_date: '2024-06-03',
      end_time: '00:15:00',
      latitude: 40.73061,
      longitude: -73.935242,
      description: 'Bagarre dans un bar de Brooklyn.',
      district: {
        id: 2,
        name: 'Brooklyn'
      },
      location_description: {
        id: 2,
        description: 'Bar'
      },
      location_type: {
        id: 2,
        label: 'Intérieur'
      },
      suspect: {
        id: 6,
        age_group: {
          id: 3,
          range: '18-24'
        },
        gender: {
          id: 1,
          label: 'M'
        }
      },
      victim: {
        id: 7,
        age_group: {
          id: 2,
          range: '25-34'
        },
        gender: {
          id: 2,
          label: 'F'
        }
      },
      status: {
        id: 2,
        label: 'Résolu'
      },
      law_category: {
        id: 2,
        label: 'Assaut'
      }
    },
    {
      id: '9i0j1k2l-9101-2345-6mno-def567890123',
      start_date: '2024-06-04',
      start_time: '15:00:00',
      end_date: '2024-06-04',
      end_time: '15:20:00',
      latitude: 40.678178,
      longitude: -73.944158,
      description: "Cambriolage d'une maison.",
      district: {
        id: 2,
        name: 'Brooklyn'
      },
      location_description: {
        id: 3,
        description: 'Résidence privée'
      },
      location_type: {
        id: 2,
        label: 'Intérieur'
      },
      suspect: {
        id: 8,
        age_group: {
          id: 4,
          range: '35-44'
        },
        gender: {
          id: 1,
          label: 'M'
        }
      },
      victim: {
        id: 9,
        age_group: {
          id: 4,
          range: '35-44'
        },
        gender: {
          id: 2,
          label: 'F'
        }
      },
      status: {
        id: 3,
        label: 'Enquête terminée'
      },
      law_category: {
        id: 3,
        label: 'Cambriolage'
      }
    }
  ]
};

export default data;

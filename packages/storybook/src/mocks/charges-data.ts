// TypeScript interfaces for charge data
export interface ChargeMoreInfo {
  transactions: number;
  ledgerRecords: number;
  documents: number;
}

export interface ChargeData {
  id: string;
  __typename: 'Common' | 'CreditCardBankCharge' | 'BusinessTripCharge' | 'ConversionCharge';
  date: string;
  amount: string;
  vat: string;
  counterparty: string;
  description: string;
  tags: string[];
  taxCategory: string;
  businessTrip: string | null;
  moreInfo: ChargeMoreInfo;
  accountantApproval: 'APPROVED' | 'PENDING' | 'UNAPPROVED';
  hasExtendedInfo: boolean;
  eventType: 'expense' | 'income' | 'tax-payment' | 'tax-refund' | 'financial-report' | 'special-event';
  category: string;
  invoiceNumber: string;
  vatRate: number;
  deductible: number;
  depreciation?: string;
}

// Comprehensive mock data for realistic accounting scenarios
export const mockChargesData: ChargeData[] = [
  // 1. RECURRING SOFTWARE SUBSCRIPTION
  {
    id: 'charge-1',
    __typename: 'Common',
    date: '2025-01-15',
    amount: '-$299.00',
    vat: '$0.00',
    counterparty: 'Microsoft Corporation',
    description: 'Office 365 Business Premium - Annual Subscription',
    tags: ['business', 'software', 'subscription', 'recurring'],
    taxCategory: 'Operational Tools',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'software',
    invoiceNumber: 'INV-MS-2025-001',
    vatRate: 0,
    deductible: 100,
  },
  
  // 2. CLOUD INFRASTRUCTURE EXPENSE
  {
    id: 'charge-2',
    __typename: 'CreditCardBankCharge',
    date: '2025-01-14',
    amount: '-$1,250.00',
    vat: '$0.00',
    counterparty: 'Amazon Web Services',
    description: 'Cloud Infrastructure & Database Services - January 2025',
    tags: ['business', 'cloud', 'tech', 'infrastructure'],
    taxCategory: 'R&D Tools',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 3, documents: 2 },
    accountantApproval: 'PENDING',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'cloud-services',
    invoiceNumber: 'AWS-INV-2025-001',
    vatRate: 0,
    deductible: 100,
  },

  // 3. PROFESSIONAL CONSULTING SERVICES
  {
    id: 'charge-3',
    __typename: 'Common',
    date: '2025-01-13',
    amount: '-₪2,800.00',
    vat: '₪476.00',
    counterparty: 'Deloitte Consulting Israel',
    description: 'Tax Advisory & Compliance Services - Q4 2024 Review',
    tags: ['business', 'consulting', 'tax', 'professional'],
    taxCategory: 'Professional Services',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 3 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'professional-services',
    invoiceNumber: 'DEL-2024-789',
    vatRate: 17,
    deductible: 100,
  },

  // 4. BUSINESS TRIP EXPENSE
  {
    id: 'charge-4',
    __typename: 'BusinessTripCharge',
    date: '2025-01-12',
    amount: '-$850.00',
    vat: '$0.00',
    counterparty: 'Marriott International',
    description: 'Business Trip - Tech Conference San Francisco',
    tags: ['business', 'travel', 'conference', 'trip'],
    taxCategory: 'Travel Expenses',
    businessTrip: 'TechCrunch Disrupt 2025',
    moreInfo: { transactions: 2, ledgerRecords: 4, documents: 2 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'travel',
    invoiceNumber: 'MAR-2025-001',
    vatRate: 0,
    deductible: 100,
  },

  // 5. PAYMENT PROCESSING FEES
  {
    id: 'charge-5',
    __typename: 'CreditCardBankCharge',
    date: '2025-01-11',
    amount: '-₪450.00',
    vat: '₪76.50',
    counterparty: 'Stripe Payments',
    description: 'Payment Processing Fees - December 2024',
    tags: ['business', 'financial', 'payments', 'fees'],
    taxCategory: 'Financial Services',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 1, documents: 1 },
    accountantApproval: 'UNAPPROVED',
    hasExtendedInfo: false,
    eventType: 'expense',
    category: 'financial-services',
    invoiceNumber: 'STR-2024-789',
    vatRate: 17,
    deductible: 100,
  },

  // 6. OFFICE SUPPLIES & EQUIPMENT
  {
    id: 'charge-6',
    __typename: 'Common',
    date: '2025-01-10',
    amount: '-₪1,200.00',
    vat: '₪204.00',
    counterparty: 'Staples Office Supplies Ltd.',
    description: 'Office Equipment & Stationery - Q1 2025',
    tags: ['business', 'office', 'supplies', 'equipment'],
    taxCategory: 'Office Expenses',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'office-supplies',
    invoiceNumber: 'STP-2025-001234',
    vatRate: 17,
    deductible: 100,
  },

  // 7. CO-WORKING SPACE RENT
  {
    id: 'charge-7',
    __typename: 'CreditCardBankCharge',
    date: '2025-01-09',
    amount: '-₪3,500.00',
    vat: '₪595.00',
    counterparty: 'WeWork Tel Aviv',
    description: 'Co-working Space Monthly Rent - January 2025',
    tags: ['business', 'rent', 'office', 'recurring'],
    taxCategory: 'Rent & Utilities',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'rent',
    invoiceNumber: 'WW-TLV-2025-01',
    vatRate: 17,
    deductible: 100,
  },

  // 8. COMMUNICATION PLATFORM SUBSCRIPTION
  {
    id: 'charge-8',
    __typename: 'Common',
    date: '2025-01-08',
    amount: '-$850.00',
    vat: '$127.50',
    counterparty: 'Slack Technologies Inc.',
    description: 'Team Communication Platform - Annual Subscription',
    tags: ['business', 'software', 'communication', 'recurring'],
    taxCategory: 'Operational Tools',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'software',
    invoiceNumber: 'SLK-2025-001',
    vatRate: 17,
    deductible: 100,
  },

  // 9. AI/ML SERVICES EXPENSE
  {
    id: 'charge-9',
    __typename: 'ConversionCharge',
    date: '2025-01-07',
    amount: '-$2,100.00',
    vat: '$315.00',
    counterparty: 'Google Cloud Platform',
    description: 'AI/ML Services & Data Processing - December 2024',
    tags: ['business', 'ai', 'cloud', 'tech', 'innovation'],
    taxCategory: 'R&D Tools',
    businessTrip: null,
    moreInfo: { transactions: 2, ledgerRecords: 3, documents: 2 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'cloud-services',
    invoiceNumber: 'GCP-2024-789',
    vatRate: 17,
    deductible: 100,
  },

  // 10. MARKETING & ADVERTISING EXPENSE
  {
    id: 'charge-10',
    __typename: 'Common',
    date: '2025-01-06',
    amount: '-₪1,800.00',
    vat: '₪306.00',
    counterparty: 'Google Ads',
    description: 'Digital Marketing Campaign - Q1 2025',
    tags: ['business', 'marketing', 'advertising', 'digital'],
    taxCategory: 'Marketing & Sales',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'marketing',
    invoiceNumber: 'GAD-2025-001',
    vatRate: 17,
    deductible: 100,
  },

  // 11. LEGAL SERVICES EXPENSE
  {
    id: 'charge-11',
    __typename: 'Common',
    date: '2025-01-05',
    amount: '-₪3,500.00',
    vat: '₪595.00',
    counterparty: 'Herzog Fox & Neeman',
    description: 'Legal Advisory Services - Contract Review & Compliance',
    tags: ['business', 'legal', 'consulting', 'compliance'],
    taxCategory: 'Professional Services',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'professional-services',
    invoiceNumber: 'HFN-2025-001',
    vatRate: 17,
    deductible: 100,
  },

  // 12. UTILITIES EXPENSE
  {
    id: 'charge-12',
    __typename: 'Common',
    date: '2025-01-04',
    amount: '-₪320.00',
    vat: '₪54.40',
    counterparty: 'Israel Electric Corporation',
    description: 'Office Electricity Bill - December 2024',
    tags: ['business', 'utilities', 'electricity', 'recurring'],
    taxCategory: 'Rent & Utilities',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'utilities',
    invoiceNumber: 'IEC-2024-789',
    vatRate: 17,
    deductible: 100,
  },

  // 13. INSURANCE EXPENSE
  {
    id: 'charge-13',
    __typename: 'Common',
    date: '2025-01-03',
    amount: '-₪1,100.00',
    vat: '₪187.00',
    counterparty: 'Harel Insurance Company',
    description: 'Business Liability Insurance - Annual Premium',
    tags: ['business', 'insurance', 'liability', 'annual'],
    taxCategory: 'Insurance & Risk',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'insurance',
    invoiceNumber: 'HAR-2025-001',
    vatRate: 17,
    deductible: 100,
  },

  // 14. BANKING FEES
  {
    id: 'charge-14',
    __typename: 'CreditCardBankCharge',
    date: '2025-01-02',
    amount: '-₪150.00',
    vat: '₪25.50',
    counterparty: 'Bank Hapoalim',
    description: 'Business Banking Fees - December 2024',
    tags: ['business', 'banking', 'fees', 'recurring'],
    taxCategory: 'Financial Services',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'banking',
    invoiceNumber: 'BHP-2024-789',
    vatRate: 17,
    deductible: 100,
  },

  // 15. TRAINING & EDUCATION EXPENSE
  {
    id: 'charge-15',
    __typename: 'Common',
    date: '2025-01-01',
    amount: '-₪2,400.00',
    vat: '₪408.00',
    counterparty: 'Coursera Inc.',
    description: 'Team Training & Professional Development Courses',
    tags: ['business', 'training', 'education', 'development'],
    taxCategory: 'Human Resources',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'training',
    invoiceNumber: 'CRS-2025-001',
    vatRate: 17,
    deductible: 100,
  },
];

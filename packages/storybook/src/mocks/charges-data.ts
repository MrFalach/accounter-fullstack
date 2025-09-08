// Enhanced TypeScript interfaces with more realistic scenarios
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

// Enhanced mock data with realistic complex scenarios
export const enhancedMockChargesData: ChargeData[] = [
  // 1. MULTI-MONTH SOFTWARE LICENSE WITH PARTIAL VAT
  {
    id: 'charge-101',
    __typename: 'Common',
    date: '2024-12-15',
    amount: '-₪8,520.00',
    vat: '₪1,448.40',
    counterparty: 'JetBrains s.r.o.',
    description: 'IntelliJ IDEA Ultimate - 10 User Annual Licenses',
    tags: ['business', 'software', 'development', 'recurring', 'team-tools'],
    taxCategory: 'Software & Technology',
    businessTrip: null,
    moreInfo: { transactions: 2, ledgerRecords: 4, documents: 3 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'software-licensing',
    invoiceNumber: 'JB-IL-2024-789654',
    vatRate: 17,
    deductible: 100,
    depreciation: '3-year-linear',
  },

  // 2. COMPLEX BUSINESS TRIP WITH MULTIPLE CURRENCIES
  {
    id: 'charge-102',
    __typename: 'BusinessTripCharge',
    date: '2024-12-10',
    amount: '-$2,847.50',
    vat: '€0.00',
    counterparty: 'Multiple Vendors',
    description: 'AWS re:Invent Conference - Las Vegas (Hotel, Flights, Meals)',
    tags: ['business', 'travel', 'conference', 'aws', 'international', 'multi-vendor'],
    taxCategory: 'Business Travel',
    businessTrip: 'AWS re:Invent 2024 - Las Vegas',
    moreInfo: { transactions: 7, ledgerRecords: 12, documents: 8 },
    accountantApproval: 'PENDING',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'business-travel',
    invoiceNumber: 'TRIP-2024-001',
    vatRate: 0,
    deductible: 85,
  },

  // 3. CRYPTOCURRENCY PAYMENT WITH CONVERSION
  {
    id: 'charge-103',
    __typename: 'ConversionCharge',
    date: '2024-12-08',
    amount: '-0.15 BTC',
    vat: '₪2,890.50',
    counterparty: 'Blockchain Development Ltd.',
    description: 'Smart Contract Development & Audit Services',
    tags: ['business', 'blockchain', 'crypto', 'development', 'audit', 'innovation'],
    taxCategory: 'Professional Services',
    businessTrip: null,
    moreInfo: { transactions: 3, ledgerRecords: 6, documents: 2 },
    accountantApproval: 'UNAPPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'blockchain-services',
    invoiceNumber: 'BDL-2024-0456',
    vatRate: 17,
    deductible: 100,
  },

  // 4. PARTIAL PAYMENT WITH OUTSTANDING BALANCE
  {
    id: 'charge-104',
    __typename: 'Common',
    date: '2024-12-05',
    amount: '-₪15,000.00',
    vat: '₪2,550.00',
    counterparty: 'Advanced Security Solutions Ltd.',
    description: 'Cybersecurity Infrastructure Setup - Partial Payment (60%)',
    tags: ['business', 'security', 'infrastructure', 'partial-payment', 'ongoing'],
    taxCategory: 'IT Security',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 3, documents: 4 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'cybersecurity',
    invoiceNumber: 'ASS-2024-789/P1',
    vatRate: 17,
    deductible: 100,
  },

  // 5. INCOME WITH CLIENT RETENTION AND BONUSES
  {
    id: 'charge-105',
    __typename: 'Common',
    date: '2024-12-02',
    amount: '+₪45,000.00',
    vat: '₪7,650.00',
    counterparty: 'FinTech Innovations Corp.',
    description: 'Q4 Development Milestone + Performance Bonus',
    tags: ['income', 'milestone', 'bonus', 'fintech', 'quarterly'],
    taxCategory: 'Service Revenue',
    businessTrip: null,
    moreInfo: { transactions: 2, ledgerRecords: 5, documents: 3 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'income',
    category: 'development-services',
    invoiceNumber: 'OUT-2024-Q4-001',
    vatRate: 17,
    deductible: 0,
  },

  // 6. EQUIPMENT PURCHASE WITH DEPRECIATION SCHEDULE
  {
    id: 'charge-106',
    __typename: 'Common',
    date: '2024-11-28',
    amount: '-₪28,500.00',
    vat: '₪4,845.00',
    counterparty: 'Apple Authorized Reseller IL',
    description: 'MacBook Pro M3 Max (4 units) + Studio Displays for Dev Team',
    tags: ['business', 'equipment', 'computers', 'team', 'hardware', 'capital'],
    taxCategory: 'Equipment & Hardware',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 4, documents: 2 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'computer-equipment',
    invoiceNumber: 'APL-IL-2024-5678',
    vatRate: 17,
    deductible: 100,
    depreciation: '4-year-linear',
  },

  // 7. SUBSCRIPTION WITH MID-YEAR PLAN CHANGE
  {
    id: 'charge-107',
    __typename: 'CreditCardBankCharge',
    date: '2024-11-25',
    amount: '-$1,299.00',
    vat: '$0.00',
    counterparty: 'GitHub Inc.',
    description: 'GitHub Enterprise - Upgrade from Team (Prorated + Annual)',
    tags: ['business', 'software', 'git', 'upgrade', 'prorated', 'development'],
    taxCategory: 'Development Tools',
    businessTrip: null,
    moreInfo: { transactions: 2, ledgerRecords: 3, documents: 2 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'development-tools',
    invoiceNumber: 'GH-ENT-2024-789456',
    vatRate: 0,
    deductible: 100,
  },

  // 8. BANK FEES WITH CURRENCY CONVERSION CHARGES
  {
    id: 'charge-108',
    __typename: 'CreditCardBankCharge',
    date: '2024-11-22',
    amount: '-₪340.50',
    vat: '₪57.89',
    counterparty: 'Bank Leumi',
    description: 'International Wire Transfer Fees + Currency Conversion (USD/EUR)',
    tags: ['business', 'banking', 'fees', 'wire-transfer', 'conversion', 'international'],
    taxCategory: 'Bank & Financial Fees',
    businessTrip: null,
    moreInfo: { transactions: 4, ledgerRecords: 6, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: false,
    eventType: 'expense',
    category: 'banking-fees',
    invoiceNumber: 'BL-FEES-2024-1122',
    vatRate: 17,
    deductible: 100,
  },

  // 9. TAX PAYMENT WITH PENALTIES
  {
    id: 'charge-109',
    __typename: 'Common',
    date: '2024-11-18',
    amount: '-₪12,450.00',
    vat: '₪0.00',
    counterparty: 'Israel Tax Authority',
    description: 'Income Tax Q3 2024 + Late Payment Penalty (₪450)',
    tags: ['tax', 'penalty', 'quarterly', 'late-payment', 'government'],
    taxCategory: 'Tax Payments',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 3, documents: 2 },
    accountantApproval: 'UNAPPROVED',
    hasExtendedInfo: true,
    eventType: 'tax-payment',
    category: 'tax-obligations',
    invoiceNumber: 'TAX-Q3-2024-PENALTY',
    vatRate: 0,
    deductible: 0,
  },

  // 10. COMPLEX CLIENT REFUND SCENARIO
  {
    id: 'charge-110',
    __typename: 'Common',
    date: '2024-11-15',
    amount: '+₪8,200.00',
    vat: '₪1,394.00',
    counterparty: 'Tech Startup Alpha Ltd.',
    description: 'Refund for Cancelled Project Phase 2 (50% of advance payment)',
    tags: ['refund', 'cancelled', 'advance', 'partial', 'client-relations'],
    taxCategory: 'Service Refunds',
    businessTrip: null,
    moreInfo: { transactions: 2, ledgerRecords: 4, documents: 3 },
    accountantApproval: 'PENDING',
    hasExtendedInfo: true,
    eventType: 'income',
    category: 'refunds',
    invoiceNumber: 'REFUND-2024-001',
    vatRate: 17,
    deductible: 0,
  },

  // 11. INSURANCE CLAIM REIMBURSEMENT
  {
    id: 'charge-111',
    __typename: 'Common',
    date: '2024-11-12',
    amount: '+₪6,750.00',
    vat: '₪0.00',
    counterparty: 'Harel Insurance Company',
    description: 'Equipment Damage Claim Reimbursement (Laptop theft)',
    tags: ['insurance', 'claim', 'reimbursement', 'theft', 'equipment'],
    taxCategory: 'Insurance Claims',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 5 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'income',
    category: 'insurance-claims',
    invoiceNumber: 'HAR-CLAIM-2024-4567',
    vatRate: 0,
    deductible: 0,
  },

  // 12. MULTI-VENDOR OFFICE SETUP
  {
    id: 'charge-112',
    __typename: 'Common',
    date: '2024-11-08',
    amount: '-₪23,680.00',
    vat: '₪4,025.60',
    counterparty: 'Office Solutions Pro Ltd.',
    description: 'Complete Office Setup: Furniture, Network, Security System',
    tags: ['business', 'office', 'furniture', 'network', 'security', 'setup', 'multi-item'],
    taxCategory: 'Office Setup',
    businessTrip: null,
    moreInfo: { transactions: 5, ledgerRecords: 8, documents: 7 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'office-infrastructure',
    invoiceNumber: 'OSP-SETUP-2024-001',
    vatRate: 17,
    deductible: 100,
    depreciation: '7-year-linear',
  },

  // 13. FREELANCER PAYMENT WITH TAX WITHHOLDING
  {
    id: 'charge-113',
    __typename: 'Common',
    date: '2024-11-05',
    amount: '-₪8,500.00',
    vat: '₪0.00',
    counterparty: 'John Smith (Freelancer)',
    description: 'UI/UX Design Services - Project Moonlight (Tax withheld: ₪850)',
    tags: ['business', 'freelancer', 'design', 'tax-withholding', 'ui-ux'],
    taxCategory: 'Contractor Payments',
    businessTrip: null,
    moreInfo: { transactions: 2, ledgerRecords: 4, documents: 2 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'contractor-services',
    invoiceNumber: 'FREELANCE-2024-JS-001',
    vatRate: 0,
    deductible: 100,
  },

  // 14. INVESTMENT IN STARTUP (CONVERTIBLE NOTE)
  {
    id: 'charge-114',
    __typename: 'Common',
    date: '2024-11-01',
    amount: '-$25,000.00',
    vat: '$0.00',
    counterparty: 'AI Startup Beta Inc.',
    description: 'Convertible Note Investment - Series A Bridge Round',
    tags: ['investment', 'startup', 'convertible-note', 'ai', 'strategic'],
    taxCategory: 'Investments',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 4 },
    accountantApproval: 'PENDING',
    hasExtendedInfo: true,
    eventType: 'special-event',
    category: 'strategic-investments',
    invoiceNumber: 'CONV-NOTE-2024-001',
    vatRate: 0,
    deductible: 0,
  },

  // 15. COMPLEX UTILITY BILL WITH MULTIPLE METERS
  {
    id: 'charge-115',
    __typename: 'Common',
    date: '2024-10-28',
    amount: '-₪1,847.30',
    vat: '₪314.04',
    counterparty: 'Israel Electric Corporation',
    description: 'Electricity Bill - 3 Meters (Office, Server Room, Workshop)',
    tags: ['business', 'utilities', 'electricity', 'multiple-meters', 'office'],
    taxCategory: 'Utilities',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 5, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'utilities',
    invoiceNumber: 'IEC-2024-MULTI-789',
    vatRate: 17,
    deductible: 100,
  },

  // 16. LATE VENDOR PAYMENT WITH DISCOUNT LOST
  {
    id: 'charge-116',
    __typename: 'Common',
    date: '2024-10-25',
    amount: '-₪18,700.00',
    vat: '₪3,179.00',
    counterparty: 'CloudTech Solutions Ltd.',
    description: 'Cloud Migration Services (Payment 15 days late - 3% discount lost)',
    tags: ['business', 'cloud', 'migration', 'late-payment', 'discount-lost'],
    taxCategory: 'IT Services',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 3, documents: 2 },
    accountantApproval: 'UNAPPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'cloud-services',
    invoiceNumber: 'CTS-2024-MIGRATION-001',
    vatRate: 17,
    deductible: 100,
  },

  // 17. EMPLOYEE TRAINING WITH CERTIFICATION
  {
    id: 'charge-117',
    __typename: 'BusinessTripCharge',
    date: '2024-10-22',
    amount: '-€3,200.00',
    vat: '€0.00',
    counterparty: 'AWS Training Center',
    description: 'AWS Solutions Architect Certification - 5 Employees (Berlin)',
    tags: ['business', 'training', 'certification', 'aws', 'international', 'team'],
    taxCategory: 'Training & Development',
    businessTrip: 'AWS Training Berlin 2024',
    moreInfo: { transactions: 8, ledgerRecords: 12, documents: 6 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'professional-development',
    invoiceNumber: 'AWS-TRAIN-2024-BER',
    vatRate: 0,
    deductible: 100,
  },

  // 18. VAT REFUND FROM TAX AUTHORITY
  {
    id: 'charge-118',
    __typename: 'Common',
    date: '2024-10-18',
    amount: '+₪4,280.50',
    vat: '₪0.00',
    counterparty: 'Israel Tax Authority',
    description: 'VAT Refund Q2 2024 - Export Services Overpayment',
    tags: ['tax', 'refund', 'vat', 'export', 'government'],
    taxCategory: 'Tax Refunds',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 3 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'tax-refund',
    category: 'tax-refunds',
    invoiceNumber: 'VAT-REFUND-Q2-2024',
    vatRate: 0,
    deductible: 0,
  },

  // 19. DOMAIN AND SSL CERTIFICATES - MULTI-YEAR
  {
    id: 'charge-119',
    __typename: 'CreditCardBankCharge',
    date: '2024-10-15',
    amount: '-$847.88',
    vat: '$0.00',
    counterparty: 'GoDaddy Operating Company',
    description: '15 Domain Names + Wildcard SSL Certificates (3-year prepaid)',
    tags: ['business', 'domains', 'ssl', 'certificates', 'prepaid', 'security'],
    taxCategory: 'Digital Assets',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 1 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'digital-infrastructure',
    invoiceNumber: 'GD-2024-DOMAINS-SSL',
    vatRate: 0,
    deductible: 100,
    depreciation: '3-year-linear',
  },

  // 20. FOREIGN CLIENT PAYMENT WITH CURRENCY FLUCTUATION
  {
    id: 'charge-120',
    __typename: 'ConversionCharge',
    date: '2024-10-12',
    amount: '+€12,500.00',
    vat: '€0.00',
    counterparty: 'European Tech Giant B.V.',
    description: 'Software Integration Services (EUR/ILS rate fluctuation: +₪320)',
    tags: ['income', 'international', 'euro', 'fluctuation', 'integration'],
    taxCategory: 'International Revenue',
    businessTrip: null,
    moreInfo: { transactions: 2, ledgerRecords: 4, documents: 2 },
    accountantApproval: 'APPROVED',
    hasExtendedInfo: true,
    eventType: 'income',
    category: 'international-services',
    invoiceNumber: 'INT-EUR-2024-001',
    vatRate: 0,
    deductible: 0,
  },
];

// Helper functions for generating realistic scenarios
export const generateRealisticScenarios = {
  // Generate a partial payment scenario
  generatePartialPayment: (originalAmount: number, percentage: number): Partial<ChargeData> => ({
    description: `Partial Payment (${percentage}%) - Remaining balance: ₪${(originalAmount * (100 - percentage) / 100).toFixed(2)}`,
    tags: ['partial-payment', 'outstanding-balance'],
    accountantApproval: 'PENDING' as const,
  }),

  // Generate multi-currency scenario
  generateMultiCurrency: (primaryCurrency: string, secondaryCurrency: string): Partial<ChargeData> => ({
    description: `Multi-currency transaction: ${primaryCurrency} + ${secondaryCurrency} conversion`,
    tags: ['multi-currency', 'conversion', 'international'],
    __typename: 'ConversionCharge' as const,
  }),

  // Generate recurring subscription with changes
  generateSubscriptionChange: (service: string, change: 'upgrade' | 'downgrade' | 'addon'): Partial<ChargeData> => ({
    description: `${service} - Subscription ${change} (prorated billing)`,
    tags: ['subscription', change, 'prorated'],
    moreInfo: { transactions: 2, ledgerRecords: 3, documents: 2 },
  }),

  // Generate tax-related complications
  generateTaxComplications: (): Partial<ChargeData> => ({
    tags: ['tax-complicated', 'withholding', 'cross-border'],
    accountantApproval: 'UNAPPROVED' as const,
    moreInfo: { transactions: 3, ledgerRecords: 5, documents: 4 },
  }),

  // Generate equipment with depreciation
  generateDepreciatingAsset: (years: number): Partial<ChargeData> => ({
    tags: ['capital-expense', 'depreciation', 'asset'],
    depreciation: `${years}-year-linear`,
    moreInfo: { transactions: 1, ledgerRecords: 4, documents: 2 },
  }),
};

// Real-world edge cases and complications
export const edgeCaseScenarios: ChargeData[] = [
  // 1. DISPUTED CHARGE UNDER INVESTIGATION
  {
    id: 'edge-001',
    __typename: 'CreditCardBankCharge',
    date: '2024-10-08',
    amount: '-$1,200.00',
    vat: '$0.00',
    counterparty: 'UNKNOWN MERCHANT 4539',
    description: 'DISPUTED CHARGE - Under investigation by bank (Fraudulent?)',
    tags: ['disputed', 'investigation', 'fraud-alert', 'unknown-merchant'],
    taxCategory: 'Disputed Charges',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 0, documents: 3 },
    accountantApproval: 'UNAPPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'disputed-transactions',
    invoiceNumber: 'DISPUTE-2024-001',
    vatRate: 0,
    deductible: 0,
  },

  // 2. INVOICE WITH CALCULATION ERROR
  {
    id: 'edge-002',
    __typename: 'Common',
    date: '2024-10-05',
    amount: '-₪5,670.00',
    vat: '₪1,200.90', // Wrong VAT calculation (should be ₪963.90)
    counterparty: 'Consulting Solutions Ltd.',
    description: 'Management Consulting - INVOICE ERROR: VAT miscalculated by vendor',
    tags: ['invoice-error', 'vat-miscalculation', 'vendor-error', 'correction-needed'],
    taxCategory: 'Professional Services',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 2, documents: 4 },
    accountantApproval: 'UNAPPROVED',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'consulting-services',
    invoiceNumber: 'CSL-2024-ERROR-789',
    vatRate: 17,
    deductible: 100,
  },

  // 3. CROSS-YEAR ACCRUAL
  {
    id: 'edge-003',
    __typename: 'Common',
    date: '2024-12-31',
    amount: '-₪15,000.00',
    vat: '₪2,550.00',
    counterparty: 'Year-End Services Inc.',
    description: 'December Services - Invoice received January 2025 (Accrual Entry)',
    tags: ['accrual', 'year-end', 'cross-year', 'timing-difference'],
    taxCategory: 'Accrued Expenses',
    businessTrip: null,
    moreInfo: { transactions: 1, ledgerRecords: 3, documents: 1 },
    accountantApproval: 'PENDING',
    hasExtendedInfo: true,
    eventType: 'expense',
    category: 'accrued-services',
    invoiceNumber: 'ACCRUAL-2024-DEC',
    vatRate: 17,
    deductible: 100,
  },
];

// Export the enhanced data as the default mock data
export const mockChargesData = enhancedMockChargesData;

export default {
  enhancedMockChargesData,
  generateRealisticScenarios,
  edgeCaseScenarios,
  mockChargesData,
};
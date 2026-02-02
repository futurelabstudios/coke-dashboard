// Sales Intelligence Data Types and Sample Data
// Based on Coca-Cola India RED LIVE Dashboard

export interface StoreData {
  id: string;
  globalId: string;
  month: string;
  auditDate: string;
  region: string;
  subUnit: string;
  bottler: string;
  unit: string;
  smName: string;
  asmName: string;
  seName: string;
  mdName: string;
  distributorName: string;
  outletName: string;
  archetype: string;
  vpoClass: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  outletType: string;
  townName: string;
  state: string;
  district: string;
  coolerPresence: boolean;
  visicoolerAccessible: number;
  purity: number;
  brandOrderCompliance: number;
  packOrderCompliance: number;
  coolerTotal: number;
  footfallDriverScore: number;
  transactionDriverScore: number;
  activationTotal: number;
  warmSoviScore: number;
  chilledSoviScore: number;
  totalSovi: number;
  ufAvailabilityScore: number;
  chilledUfAvailability: number;
  strategicPackScore: number;
  availabilityTotal: number;
  totalScore: number;
  ipsBonus: number;
  coolerDoorComplianceBonus: number;
  overallTotalScore: number;
  ufAvailabilityCount: number;
  ufChilledAvailableCount: number;
  coolerPurityPercent: number;
  top2ShelfFacingPurity: number;
}

export interface KPISummary {
  storeCount: number;
  avgAvailability: number;
  avgCooler: number;
  avgActivation: number;
  avgSovi: number;
  avgTotalScore: number;
  avgOverallScore: number;
  coolerPresenceRate: number;
  purityRate: number;
}

export interface RegionSummary {
  region: string;
  storeCount: number;
  avgScore: number;
  target: number;
  achievement: number;
  trend: 'up' | 'down' | 'stable';
}

export interface BottlerPerformance {
  bottler: string;
  storeCount: number;
  avgScore: number;
  availability: number;
  cooler: number;
  activation: number;
  sovi: number;
}

// Sample data based on the Excel file structure
export const storeData: StoreData[] = [
  {
    id: '1',
    globalId: '170105880',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'FBO',
    subUnit: 'HARYANA',
    bottler: 'Kandhari Global Beverages',
    unit: 'CHANDIGARH',
    smName: 'NITIN MEHTA',
    asmName: 'PAWAN KUMAR',
    seName: 'KULDEEP CHEEMA',
    mdName: 'MD VACANT',
    distributorName: 'RADHA KRISHNA ENTERPRISES',
    outletName: 'MOHAN FRUTE & JUICE',
    archetype: 'A3',
    vpoClass: 'BRONZE',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'JUNDLA',
    state: 'HARYANA',
    district: 'KARNAL',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 15,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 17,
    footfallDriverScore: 0,
    transactionDriverScore: 0,
    activationTotal: 0,
    warmSoviScore: 0,
    chilledSoviScore: 6,
    totalSovi: 6,
    ufAvailabilityScore: 11,
    chilledUfAvailability: 6,
    strategicPackScore: 0,
    availabilityTotal: 17,
    totalScore: 40,
    ipsBonus: 10,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 50,
    ufAvailabilityCount: 4,
    ufChilledAvailableCount: 4,
    coolerPurityPercent: 100,
    top2ShelfFacingPurity: 100,
  },
  {
    id: '2',
    globalId: '170105881',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'FBO',
    subUnit: 'HARYANA',
    bottler: 'Kandhari Global Beverages',
    unit: 'CHANDIGARH',
    smName: 'NITIN MEHTA',
    asmName: 'PAWAN KUMAR',
    seName: 'KULDEEP CHEEMA',
    mdName: 'MD VACANT',
    distributorName: 'RADHA KRISHNA ENTERPRISES',
    outletName: 'OM SWEETS',
    archetype: 'A3',
    vpoClass: 'BRONZE',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'JUNDLA',
    state: 'HARYANA',
    district: 'KARNAL',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 0,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 2,
    footfallDriverScore: 0,
    transactionDriverScore: 0,
    activationTotal: 0,
    warmSoviScore: 0,
    chilledSoviScore: 6,
    totalSovi: 6,
    ufAvailabilityScore: 0,
    chilledUfAvailability: 0,
    strategicPackScore: 0,
    availabilityTotal: 0,
    totalScore: 8,
    ipsBonus: 0,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 8,
    ufAvailabilityCount: 0,
    ufChilledAvailableCount: 0,
    coolerPurityPercent: 100,
    top2ShelfFacingPurity: 0,
  },
  {
    id: '3',
    globalId: '170105885',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'FBO',
    subUnit: 'HARYANA',
    bottler: 'Kandhari Global Beverages',
    unit: 'CHANDIGARH',
    smName: 'NITIN MEHTA',
    asmName: 'PAWAN KUMAR',
    seName: 'KULDEEP CHEEMA',
    mdName: 'MD VACANT',
    distributorName: 'RADHA KRISHNA ENTERPRISES',
    outletName: 'Ravi Tea Stall',
    archetype: 'A3',
    vpoClass: 'BRONZE',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'JUNDLA',
    state: 'HARYANA',
    district: 'KARNAL',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 15,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 17,
    footfallDriverScore: 5,
    transactionDriverScore: 0,
    activationTotal: 5,
    warmSoviScore: 0,
    chilledSoviScore: 6,
    totalSovi: 6,
    ufAvailabilityScore: 20,
    chilledUfAvailability: 30,
    strategicPackScore: 10,
    availabilityTotal: 60,
    totalScore: 88,
    ipsBonus: 10,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 98,
    ufAvailabilityCount: 7,
    ufChilledAvailableCount: 7,
    coolerPurityPercent: 90,
    top2ShelfFacingPurity: 100,
  },
  {
    id: '4',
    globalId: '170105886',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'FBO',
    subUnit: 'HARYANA',
    bottler: 'Kandhari Global Beverages',
    unit: 'CHANDIGARH',
    smName: 'NITIN MEHTA',
    asmName: 'PAWAN KUMAR',
    seName: 'KULDEEP CHEEMA',
    mdName: 'MD VACANT',
    distributorName: 'RADHA KRISHNA ENTERPRISES',
    outletName: 'SATISH KIRYANA STORE',
    archetype: 'A3',
    vpoClass: 'BRONZE',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'JUNDLA',
    state: 'HARYANA',
    district: 'KARNAL',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 0,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 2,
    footfallDriverScore: 0,
    transactionDriverScore: 0,
    activationTotal: 0,
    warmSoviScore: 0,
    chilledSoviScore: 0,
    totalSovi: 0,
    ufAvailabilityScore: 14,
    chilledUfAvailability: 18,
    strategicPackScore: 0,
    availabilityTotal: 32,
    totalScore: 34,
    ipsBonus: 0,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 34,
    ufAvailabilityCount: 5,
    ufChilledAvailableCount: 5,
    coolerPurityPercent: 18.6,
    top2ShelfFacingPurity: 50,
  },
  {
    id: '5',
    globalId: '170105890',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'FBO',
    subUnit: 'HARYANA',
    bottler: 'Kandhari Global Beverages',
    unit: 'CHANDIGARH',
    smName: 'NITIN MEHTA',
    asmName: 'PAWAN KUMAR',
    seName: 'KULDEEP CHEEMA',
    mdName: 'MD VACANT',
    distributorName: 'RADHA KRISHNA ENTERPRISES',
    outletName: 'SINGLA KIRYANA',
    archetype: 'A3',
    vpoClass: 'BRONZE',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'JUNDLA',
    state: 'HARYANA',
    district: 'KARNAL',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 15,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 17,
    footfallDriverScore: 0,
    transactionDriverScore: 0,
    activationTotal: 0,
    warmSoviScore: 0,
    chilledSoviScore: 6,
    totalSovi: 6,
    ufAvailabilityScore: 20,
    chilledUfAvailability: 30,
    strategicPackScore: 10,
    availabilityTotal: 60,
    totalScore: 83,
    ipsBonus: 10,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 93,
    ufAvailabilityCount: 7,
    ufChilledAvailableCount: 7,
    coolerPurityPercent: 100,
    top2ShelfFacingPurity: 100,
  },
  {
    id: '6',
    globalId: '170105892',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'FBO',
    subUnit: 'HARYANA',
    bottler: 'Kandhari Global Beverages',
    unit: 'CHANDIGARH',
    smName: 'NITIN MEHTA',
    asmName: 'PAWAN KUMAR',
    seName: 'KULDEEP CHEEMA',
    mdName: 'MD VACANT',
    distributorName: 'RADHA KRISHNA ENTERPRISES',
    outletName: 'PURI KIR',
    archetype: 'A3',
    vpoClass: 'BRONZE',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'JUNDLA',
    state: 'HARYANA',
    district: 'KARNAL',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 15,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 17,
    footfallDriverScore: 5,
    transactionDriverScore: 0,
    activationTotal: 5,
    warmSoviScore: 0,
    chilledSoviScore: 6,
    totalSovi: 6,
    ufAvailabilityScore: 20,
    chilledUfAvailability: 30,
    strategicPackScore: 10,
    availabilityTotal: 60,
    totalScore: 88,
    ipsBonus: 10,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 98,
    ufAvailabilityCount: 7,
    ufChilledAvailableCount: 7,
    coolerPurityPercent: 100,
    top2ShelfFacingPurity: 100,
  },
  {
    id: '7',
    globalId: '170105906',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'FBO',
    subUnit: 'HARYANA',
    bottler: 'Kandhari Global Beverages',
    unit: 'CHANDIGARH',
    smName: 'NITIN MEHTA',
    asmName: 'PAWAN KUMAR',
    seName: 'KULDEEP CHEEMA',
    mdName: 'MD VACANT',
    distributorName: 'RADHA KRISHNA ENTERPRISES',
    outletName: 'OM PARKESH KIRYANA STORE',
    archetype: 'A3',
    vpoClass: 'BRONZE',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'JUNDLA',
    state: 'HARYANA',
    district: 'KARNAL',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 15,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 17,
    footfallDriverScore: 0,
    transactionDriverScore: 0,
    activationTotal: 0,
    warmSoviScore: 0,
    chilledSoviScore: 6,
    totalSovi: 6,
    ufAvailabilityScore: 20,
    chilledUfAvailability: 30,
    strategicPackScore: 10,
    availabilityTotal: 60,
    totalScore: 83,
    ipsBonus: 10,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 93,
    ufAvailabilityCount: 7,
    ufChilledAvailableCount: 7,
    coolerPurityPercent: 100,
    top2ShelfFacingPurity: 100,
  },
  {
    id: '8',
    globalId: '170105907',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'FBO',
    subUnit: 'HARYANA',
    bottler: 'Kandhari Global Beverages',
    unit: 'CHANDIGARH',
    smName: 'NITIN MEHTA',
    asmName: 'PAWAN KUMAR',
    seName: 'KULDEEP CHEEMA',
    mdName: 'MD VACANT',
    distributorName: 'RADHA KRISHNA ENTERPRISES',
    outletName: 'PARVEEN KARYANA STORE',
    archetype: 'A3',
    vpoClass: 'BRONZE',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'JUNDLA',
    state: 'HARYANA',
    district: 'KARNAL',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 15,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 17,
    footfallDriverScore: 0,
    transactionDriverScore: 0,
    activationTotal: 0,
    warmSoviScore: 0,
    chilledSoviScore: 6,
    totalSovi: 6,
    ufAvailabilityScore: 17,
    chilledUfAvailability: 26,
    strategicPackScore: 0,
    availabilityTotal: 43,
    totalScore: 66,
    ipsBonus: 10,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 76,
    ufAvailabilityCount: 6,
    ufChilledAvailableCount: 6,
    coolerPurityPercent: 100,
    top2ShelfFacingPurity: 0,
  },
  {
    id: '9',
    globalId: '170105908',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'CBO',
    subUnit: 'GUJARAT',
    bottler: 'HCCB C2A',
    unit: 'GUJARAT',
    smName: 'AMIT SHARMA',
    asmName: 'RAJESH PATEL',
    seName: 'VIKRAM SINGH',
    mdName: 'SANJAY GUPTA',
    distributorName: 'PATEL DISTRIBUTORS',
    outletName: 'SONU KIRYANA',
    archetype: 'A3',
    vpoClass: 'SILVER',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'AHMEDABAD',
    state: 'GUJARAT',
    district: 'AHMEDABAD',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 0,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 2,
    footfallDriverScore: 0,
    transactionDriverScore: 0,
    activationTotal: 0,
    warmSoviScore: 0,
    chilledSoviScore: 0,
    totalSovi: 0,
    ufAvailabilityScore: 20,
    chilledUfAvailability: 30,
    strategicPackScore: 10,
    availabilityTotal: 60,
    totalScore: 62,
    ipsBonus: 10,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 72,
    ufAvailabilityCount: 7,
    ufChilledAvailableCount: 7,
    coolerPurityPercent: 29.4,
    top2ShelfFacingPurity: 53.8,
  },
  {
    id: '10',
    globalId: '170140965',
    month: 'DEC25',
    auditDate: '2025-12-13',
    region: 'CBO',
    subUnit: 'MUMBAI',
    bottler: 'HCCB C2A',
    unit: 'MUMBAI',
    smName: 'RAKESH SHARMA',
    asmName: 'SUNIL KUMAR',
    seName: 'ANIL VERMA',
    mdName: 'PRIYA SINGH',
    distributorName: 'MUMBAI BEVERAGES',
    outletName: 'DHAMIJA CONF.',
    archetype: 'A3',
    vpoClass: 'GOLD',
    outletType: 'GROCERY/ CONVENIENCE',
    townName: 'MUMBAI',
    state: 'MAHARASHTRA',
    district: 'MUMBAI',
    coolerPresence: true,
    visicoolerAccessible: 2,
    purity: 15,
    brandOrderCompliance: 0,
    packOrderCompliance: 0,
    coolerTotal: 17,
    footfallDriverScore: 5,
    transactionDriverScore: 0,
    activationTotal: 5,
    warmSoviScore: 0,
    chilledSoviScore: 6,
    totalSovi: 6,
    ufAvailabilityScore: 20,
    chilledUfAvailability: 30,
    strategicPackScore: 10,
    availabilityTotal: 60,
    totalScore: 88,
    ipsBonus: 10,
    coolerDoorComplianceBonus: 0,
    overallTotalScore: 98,
    ufAvailabilityCount: 7,
    ufChilledAvailableCount: 7,
    coolerPurityPercent: 100,
    top2ShelfFacingPurity: 100,
  },
];

// Regional summary data based on RED Dashboard Summary screenshot
export const regionSummaryData: RegionSummary[] = [
  { region: 'CBO', storeCount: 124075, avgScore: 55.0, target: 208685, achievement: 59.5, trend: 'up' },
  { region: 'FBO', storeCount: 45230, avgScore: 52.3, target: 75000, achievement: 60.3, trend: 'up' },
  { region: 'NORTH', storeCount: 32150, avgScore: 48.7, target: 55000, achievement: 58.5, trend: 'stable' },
  { region: 'SOUTH', storeCount: 28900, avgScore: 51.2, target: 48000, achievement: 60.2, trend: 'up' },
  { region: 'EAST', storeCount: 18500, avgScore: 45.8, target: 32000, achievement: 57.8, trend: 'down' },
  { region: 'WEST', storeCount: 22300, avgScore: 49.5, target: 38000, achievement: 58.7, trend: 'stable' },
];

// Bottler performance data
export const bottlerPerformanceData: BottlerPerformance[] = [
  { bottler: 'HCCB C1', storeCount: 45620, avgScore: 52.4, availability: 58.9, cooler: 66.3, activation: 104.8, sovi: 45.6 },
  { bottler: 'HCCB C2A', storeCount: 38450, avgScore: 47.7, availability: 66.3, cooler: 82.4, activation: 100.7, sovi: 41.7 },
  { bottler: 'HCCB C2B', storeCount: 25780, avgScore: 48.8, availability: 66.2, cooler: 103.7, activation: 87.1, sovi: 37.3 },
  { bottler: 'HCCB C3', storeCount: 32100, avgScore: 50.4, availability: 102.5, cooler: 104.6, activation: 103.0, sovi: 38.2 },
  { bottler: 'Kandhari Global', storeCount: 18920, avgScore: 45.2, availability: 75.3, cooler: 62.5, activation: 48.0, sovi: 24.0 },
  { bottler: 'Moon Beverages', storeCount: 15340, avgScore: 41.0, availability: 51.9, cooler: 94.5, activation: 93.1, sovi: 35.3 },
];

// Monthly trend data for charts
export const monthlyTrendData = [
  { month: 'Jul', availability: 42.5, cooler: 58.2, activation: 35.8, sovi: 22.4, overallScore: 48.2 },
  { month: 'Aug', availability: 44.8, cooler: 59.5, activation: 38.2, sovi: 24.1, overallScore: 49.8 },
  { month: 'Sep', availability: 46.2, cooler: 61.8, activation: 42.5, sovi: 26.8, overallScore: 51.5 },
  { month: 'Oct', availability: 48.5, cooler: 63.2, activation: 45.8, sovi: 28.5, overallScore: 53.2 },
  { month: 'Nov', availability: 52.8, cooler: 65.5, activation: 48.2, sovi: 31.2, overallScore: 55.8 },
  { month: 'Dec', availability: 55.0, cooler: 68.2, activation: 52.5, sovi: 34.8, overallScore: 58.2 },
];

// Brand performance data for availability
export const brandPerformanceData = [
  { brand: 'Coca-Cola', storeCount: 22226, availableStores: 8542, storePercent: 38.4, avgFacing: 2.3, avgSovi: 4.2 },
  { brand: 'Thums Up', storeCount: 22226, availableStores: 7854, storePercent: 35.3, avgFacing: 2.1, avgSovi: 3.8 },
  { brand: 'Sprite', storeCount: 22226, availableStores: 6932, storePercent: 31.2, avgFacing: 1.9, avgSovi: 3.2 },
  { brand: 'Fanta', storeCount: 22226, availableStores: 5428, storePercent: 24.4, avgFacing: 1.6, avgSovi: 2.5 },
  { brand: 'Limca', storeCount: 22226, availableStores: 4852, storePercent: 21.8, avgFacing: 1.4, avgSovi: 2.1 },
  { brand: 'Maaza', storeCount: 22226, availableStores: 4125, storePercent: 18.6, avgFacing: 1.2, avgSovi: 1.8 },
  { brand: 'Minute Maid', storeCount: 22226, availableStores: 3542, storePercent: 15.9, avgFacing: 1.1, avgSovi: 1.4 },
  { brand: 'Kinley', storeCount: 22226, availableStores: 2854, storePercent: 12.8, avgFacing: 0.9, avgSovi: 1.1 },
];

// Helper functions
export const calculateKPISummary = (data: StoreData[]): KPISummary => {
  const count = data.length;
  if (count === 0) {
    return {
      storeCount: 0,
      avgAvailability: 0,
      avgCooler: 0,
      avgActivation: 0,
      avgSovi: 0,
      avgTotalScore: 0,
      avgOverallScore: 0,
      coolerPresenceRate: 0,
      purityRate: 0,
    };
  }

  return {
    storeCount: count,
    avgAvailability: Number((data.reduce((sum, s) => sum + s.availabilityTotal, 0) / count).toFixed(1)),
    avgCooler: Number((data.reduce((sum, s) => sum + s.coolerTotal, 0) / count).toFixed(1)),
    avgActivation: Number((data.reduce((sum, s) => sum + s.activationTotal, 0) / count).toFixed(1)),
    avgSovi: Number((data.reduce((sum, s) => sum + s.totalSovi, 0) / count).toFixed(1)),
    avgTotalScore: Number((data.reduce((sum, s) => sum + s.totalScore, 0) / count).toFixed(1)),
    avgOverallScore: Number((data.reduce((sum, s) => sum + s.overallTotalScore, 0) / count).toFixed(1)),
    coolerPresenceRate: Number(((data.filter(s => s.coolerPresence).length / count) * 100).toFixed(1)),
    purityRate: Number((data.reduce((sum, s) => sum + s.coolerPurityPercent, 0) / count).toFixed(1)),
  };
};

export const getScoreStatus = (score: number, maxScore: number = 100): 'excellent' | 'good' | 'warning' | 'critical' => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'excellent';
  if (percentage >= 60) return 'good';
  if (percentage >= 40) return 'warning';
  return 'critical';
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const getUniqueValues = <T, K extends keyof T>(data: T[], key: K): T[K][] => {
  return [...new Set(data.map(item => item[key]))];
};

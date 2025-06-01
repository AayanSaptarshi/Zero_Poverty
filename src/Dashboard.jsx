import React, { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Enhanced mock data with new data from PDFs
const MOCK_DATA = {
  // Primary KPIs
  totalFamilies: 1233214, // Updated from PDFs
  povertyDistribution: [
    { name: "4/4", value: 48.0 },
    { name: "3/4", value: 34.9 },
    { name: "2/4", value: 11.3 },
    { name: "1/4", value: 3.7 },
    { name: "0/4", value: 2.1 },
  ],
  incomeDistribution: [
    { name: "No Income", value: 20.0 },
    { name: "< ₹500/ Month", value: 23.7 },
    { name: "₹500-1,000/ Month", value: 22.6 },
    { name: "₹1,000-2,000/ Month", value: 18.2 },
    { name: "> ₹2,000/ Month", value: 15.5 },
  ],
  rationCard: { yes: 73.2, no: 26.8 },
  pensionCoverage: { yes: 11.7, no: 88.3 },

  // Demographics & Household Profile
  genderOfHead: [
    { name: "Male", value: 28.7 },
    { name: "Female", value: 71.3 },
  ],
  socialClass: [
    { name: "SC", value: 40.8 },
    { name: "OBC", value: 44.1 },
    { name: "General", value: 9.3 },
    { name: "ST", value: 5.8 },
  ],
  mobilePhoneType: [
    { name: "Smartphone", value: 43.9 },
    { name: "Feature Phone", value: 56.1 },
  ],
  labourCard: { yes: 38.4, no: 61.6 },
  jobCard: { yes: 20.5, no: 79.5 },
  ayushmanBharat: { yes: 19.2, no: 80.8 },

  // Poverty Measurement & Vulnerabilities
  housingStatus: { homeless_kutcha: 84.8, others: 15.2 },
  landOwnership: { landless: 63.0, owns_land: 37.0 },
  basicNeedsShortage: { yes: 83.9, no: 16.1 },
  vulnerabilities: [
    { name: "Widow HoHh", value: 9.7 },
    { name: "Family member with disability", value: 2.8 },
    { name: "Migrant Worker", value: 20.6 },
  ],

  // Income, Livelihoods & Skilling
  productiveMembers: [
    { name: "1 Member", value: 64.4 },
    { name: "2 Members", value: 24.8 },
    { name: "3+ Members", value: 10.8 },
  ],
  livelihoodTraining: { yes: 12.3, no: 87.7 },
  honorariumReceived: { yes: 13.5, no: 86.5 },
  apprenticeship: { yes: 10.0, no: 90.0 },
  affordableLoan: { yes: 18.5, no: 81.5 },
  capitalSubvention: { yes: 17.4, no: 82.6 },
  willingToMigrate: { yes: 87.4, no: 12.6 },

  // Funding & Credit Access
  fundingSources: [
    { name: "Bank", value: 47.7 },
    { name: "Employer", value: 38.5 },
    { name: "Moneylender", value: 6.9 },
    { name: "Others", value: 6.9 },
  ],
  interestRateTiers: [
    { name: "Low Slab", value: 65.9 },
    { name: "Mid Slab", value: 20.9 },
    { name: "High Slab", value: 8.5 },
    { name: "Other/NA", value: 4.7 },
  ],
  collateralRequired: { yes: 18.4, no: 81.6 },

  // Social Security & Welfare Schemes
  nregaWorkAvailability: [
    { name: "Yes", value: 25.7 },
    { name: "No", value: 51.2 },
    { name: "Never Asked", value: 15.0 },
    { name: "Sometimes", value: 8.1 },
  ],
  pensionTypes: [
    { name: "Widow Pension", value: 48.2 },
    { name: "Disability Pension", value: 11.4 },
    { name: "Other/None", value: 40.4 },
  ],
  pensionReceiptQuality: [
    { name: "Full Amount", value: 37.4 },
    { name: "Cut Sometimes", value: 62.6 },
  ],
  rationQuality: {
    regularReceipt: { yes: 80.1, no: 19.9 },
    fullQualityReceived: { yes: 44.0, no: 56.0 },
  },
  ayushmanBharatCoverage: [
    { name: "All Members", value: 17.5 },
    { name: "Some Members", value: 14.2 },
    { name: "No Members", value: 68.3 },
  ],
  healthInfoViaMobile: { yes: 61.8, no: 38.2 },

  // New data from PDFs

  // Employability Indicators
  futureIncomePlans: [
    { name: "Children's Education", value: 52.1 },
    { name: "Skill Development", value: 37.4 },
    { name: "Literacy", value: 10.5 },
  ],
  migrationOpportunity: { yes: 27.4, no: 72.6 },
  startOwnBusiness: { yes: 22.8, no: 77.2 },
  familySkills: {
    anyMemberWithSkill: { yes: 11.2, no: 88.8 },
    obsoleteSkills: [
      { name: "Category 1", value: 25.1 },
      { name: "Category 2", value: 31.4 },
      { name: "Category 3", value: 33.9 },
      { name: "Category 4", value: 9.6 },
    ],
  },

  // Debt and Assets data
  debtStatus: { yes: 3.1, no: 96.9 },
  loanSources: [
    { name: "Government/Institutional", value: 33.2 },
    { name: "Private Banks/Societies", value: 27.0 },
    { name: "Moneylender/Local Lender", value: 26.9 },
    { name: "Other Non-Govt/Microfinance", value: 12.9 },
  ],
  interestRates: [
    { name: "1% per month", value: 29.7 },
    { name: "2% per month", value: 17.1 },
    { name: "3% per month", value: 15.5 },
    { name: "4% per month", value: 6.6 },
    { name: "5% per month", value: 15.7 },
    { name: "6-10% per month", value: 15.4 },
  ],
  loanPurpose: [
    { name: "No Access to Bank Loans", value: 30.4 },
    { name: "Essential Consumption Needs", value: 46.9 },
    { name: "Entertainment/Appliances", value: 5.1 },
    { name: "Social Obligations", value: 5.2 },
    { name: "Income-Generating Assets", value: 3.5 },
    { name: "Old Debt Repayment", value: 9.0 },
  ],
  loanAmount: [
    { name: "< ₹10,000", value: 32.8 },
    { name: "₹10,000-25,000", value: 21.7 },
    { name: "₹25,000-50,000", value: 18.2 },
    { name: "₹50,000-1 Lakh", value: 15.6 },
    { name: "> ₹1 Lakh", value: 11.7 },
  ],
  loanRepaymentFailureReason: [
    { name: "No Pressure", value: 16.7 },
    { name: "Insufficient Income", value: 52.1 },
    { name: "No Income", value: 17.2 },
    { name: "High Interest", value: 6.1 },
    { name: "No Collateral", value: 7.9 },
  ],
  loanRepaymentImpact: [
    { name: "No Impact", value: 20.4 },
    { name: "Major Impact - Earnings", value: 41.2 },
    { name: "Business/Home Improvement", value: 12.2 },
    { name: "Savings for Children/Future", value: 20.2 },
    { name: "Social/Family Discomfort", value: 6.0 },
  ],
  improvementNeeds: [
    { name: "Lower/Fixed Interest Rate", value: 37.9 },
    { name: "Shorter Loan Terms", value: 11.9 },
    { name: "Bank Loans without Hassle", value: 10.7 },
    { name: "Loan Relief Schemes", value: 22.0 },
    { name: "Income Generating Help", value: 17.4 },
  ],

  // Asset Ownership
  assetOwnership: {
    loanToOthers: { yes: 32.8, no: 67.2 },
    bankDeposits: { yes: 11.1, no: 88.9 },
    jewelry: { yes: 41.1, no: 58.9 },
    landProperty: { yes: 24.4, no: 75.6 },
    fans: { yes: 12.3, no: 87.7 },
    kitchenUtensils: { yes: 80.5, no: 19.5 },
    entertainment: { yes: 14.3, no: 85.7 },
    agriculturalEquipment: { yes: 15.0, no: 85.0 },
    vehicles: { yes: 26.3, no: 73.7 },
    livestock: {
      largeCattle: { yes: 30.3, no: 69.7 },
      smallAnimals: { yes: 17.9, no: 82.1 },
    },
    workTools: { yes: 31.8, no: 68.2 },
  },

  // Family Background
  parentalOccupation: [
    { name: "Scholarship", value: 3.0 },
    { name: "Labor/Farmer/Agriculture", value: 84.5 },
    { name: "Waste Collection/Ragpicker", value: 1.2 },
    { name: "Social Help/Community", value: 1.8 },
    { name: "Government Schemes/NREGA", value: 2.7 },
    { name: "Other", value: 2.3 },
    { name: "Small Business/Shop", value: 4.5 },
  ],
};

// Filter options
const DISTRICTS = ["All Districts", "District 1", "District 2", "District 3"];
const BLOCKS = ["All Blocks", "Block 1", "Block 2", "Block 3"];
const GPS = ["All GPs", "GP 1", "GP 2", "GP 3"];
const ASPIRATIONAL_BLOCKS = ["All", "Yes", "No"];

// Colors for charts
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

// Component for KPI cards
const KPICard = ({ title, value, unit = "", color = "#0088FE" }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold" style={{ color }}>
          {value}
        </span>
        {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );
};

// Updated Yes/No Indicator with horizontal segmented bar
const YesNoIndicator = ({ title, data, colors = ["#4285f4", "#34a853"] }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-gray-500 text-sm font-medium mb-4">{title}</h3>

      {/* Horizontal segmented bar */}
      <div className="mb-4">
        <div className="relative h-12 rounded-full overflow-hidden flex">
          <div
            className="h-full flex items-center justify-center text-white font-medium text-sm"
            style={{
              backgroundColor: colors[0],
              width: `${data.yes}%`,
              minWidth: data.yes > 15 ? "auto" : "0",
            }}
          >
            {data.yes > 15 && `Yes: ${data.yes}%`}
          </div>
          <div
            className="h-full flex items-center justify-center text-white font-medium text-sm"
            style={{
              backgroundColor: colors[1],
              width: `${data.no}%`,
              minWidth: data.no > 15 ? "auto" : "0",
            }}
          >
            {data.no > 15 && `No: ${data.no}%`}
          </div>
        </div>
      </div>

      {/* Percentage display */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: colors[0] }}>
            {data.yes}%
          </div>
          <div className="text-sm text-gray-600 font-medium">Yes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: colors[1] }}>
            {data.no}%
          </div>
          <div className="text-sm text-gray-600 font-medium">No</div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-2">
        Gender split within the survey responses
      </div>
    </div>
  );
};

// Fixed Horizontal Segmented Bar Component
const HorizontalSegmentBar = ({
  title,
  data,
  colors = ["#00C49F", "#FF8042"],
}) => {
  const chartData = [
    {
      name: title,
      Yes: data.yes,
      No: data.no,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis type="category" dataKey="name" width={150} />
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            <Bar dataKey="Yes" stackId="a" fill={colors[0]} />
            <Bar dataKey="No" stackId="a" fill={colors[1]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Component for distribution charts
const DistributionChart = ({ title, data, colors = COLORS }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Component for Pie charts
const PieChartCard = ({ title, data, colors = COLORS }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Main Dashboard Component
const ZeroPovertyDashboard = () => {
  // State for filters
  const [district, setDistrict] = useState("All Districts");
  const [block, setBlock] = useState("All Blocks");
  const [gp, setGp] = useState("All GPs");
  const [aspirationalBlock, setAspirationalBlock] = useState("All");

  // State for active section
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Zero Poverty Program Dashboard
      </h1>

      {/* Global Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Block
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
            >
              {BLOCKS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gram Panchayat (GP)
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={gp}
              onChange={(e) => setGp(e.target.value)}
            >
              {GPS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aspirational Block
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={aspirationalBlock}
              onChange={(e) => setAspirationalBlock(e.target.value)}
            >
              {ASPIRATIONAL_BLOCKS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary KPIs - Always Visible Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">At a glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <KPICard
            title="Total Marked Families"
            value={MOCK_DATA.totalFamilies.toLocaleString()}
            color="#0088FE"
          />
          <YesNoIndicator
            title="Ration Card Availibility"
            data={MOCK_DATA.rationCard}
          />
          <YesNoIndicator
            title="Pension Coverage (Cumulative)"
            data={MOCK_DATA.pensionCoverage}
          />
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-lg shadow p-4 h-full">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                Low Income Families
              </h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MOCK_DATA.incomeDistribution.slice(0, 5)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#FF8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === "overview"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === "demographics"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("demographics")}
        >
          Demographics
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === "poverty"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("poverty")}
        >
          Poverty Measurement
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === "income"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("income")}
        >
          Income & Livelihoods
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === "funding"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("funding")}
        >
          Funding & Assets
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === "welfare"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("welfare")}
        >
          Social Security
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeSection === "employability"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("employability")}
        >
          Employability
        </button>
      </div>

      {/* Dashboard Content - Changes based on active section */}
      {activeSection === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DistributionChart
            title="Poverty Measurement (against 4 parameters) - Scale to 50%"
            data={MOCK_DATA.povertyDistribution}
          />
          <DistributionChart
            title="Income Distribution"
            data={MOCK_DATA.incomeDistribution}
          />
        </div>
      )}

      {activeSection === "demographics" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PieChartCard
            title="Gender: Head of the Household (HoHh)"
            data={MOCK_DATA.genderOfHead}
            colors={["#0088FE", "#FF8042"]}
          />
          <PieChartCard
            title="Distribution Across Social Category"
            data={MOCK_DATA.socialClass}
          />
          <PieChartCard
            title="Mobile Phone Type"
            data={MOCK_DATA.mobilePhoneType}
            colors={["#00C49F", "#FFBB28"]}
          />
          <PieChartCard
            title="Parental Occupation"
            data={MOCK_DATA.parentalOccupation}
          />
          <YesNoIndicator
            title="BOCW Regn./ Labour Card Holders"
            data={MOCK_DATA.labourCard}
          />
          <YesNoIndicator
            title="Job Card (NREGA) Holders"
            data={MOCK_DATA.jobCard}
          />
          <YesNoIndicator
            title="Ayushman Bharat Coverage"
            data={MOCK_DATA.ayushmanBharat}
          />
        </div>
      )}

      {activeSection === "poverty" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <DistributionChart
              title="Overall Poverty Measure (Full Distribution)"
              data={MOCK_DATA.povertyDistribution}
            />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Homelessness
            </h3>
            <div className="h-40 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-red-500">
                  {MOCK_DATA.housingStatus.homeless_kutcha}%
                </div>
                <div className="text-sm text-gray-500">Homeless/ Kutcha</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Land Ownership
            </h3>
            <div className="h-40 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-red-500">
                  {MOCK_DATA.landOwnership.landless}%
                </div>
                <div className="text-sm text-gray-500">Landless</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Crisis of Basic Needs
            </h3>
            <div className="h-40 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-red-500">
                  {MOCK_DATA.basicNeedsShortage.yes}%
                </div>
                <div className="text-sm text-gray-500">
                  Food/ Clothing shortage across the year
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                Poverty vulnerabilities
              </h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MOCK_DATA.vulnerabilities}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "income" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PieChartCard
            title="Productive Members (18-55 yrs)"
            data={MOCK_DATA.productiveMembers}
          />
          <div className="md:col-span-2">
            <DistributionChart
              title="Average Income Categories"
              data={MOCK_DATA.incomeDistribution}
            />
          </div>
          <YesNoIndicator
            title="Livelihood Training Received"
            data={MOCK_DATA.livelihoodTraining}
          />
          <YesNoIndicator
            title="Honorarium Received"
            data={MOCK_DATA.honorariumReceived}
          />
          <YesNoIndicator
            title="Apprenticeship Post-Training"
            data={MOCK_DATA.apprenticeship}
          />
          <YesNoIndicator
            title="Affordable Loan Uptake"
            data={MOCK_DATA.affordableLoan}
          />
          <YesNoIndicator
            title="Capital Subvention Received"
            data={MOCK_DATA.capitalSubvention}
          />
          <YesNoIndicator
            title="Willingness to Migrate for Work"
            data={MOCK_DATA.willingToMigrate}
          />
        </div>
      )}

      {activeSection === "funding" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PieChartCard
            title="Primary source of borrowing"
            data={MOCK_DATA.loanSources}
          />
          <DistributionChart
            title="Monthly Interest Rate"
            data={MOCK_DATA.interestRates}
          />
          <PieChartCard
            title="Loan Amount Distribution"
            data={MOCK_DATA.loanAmount}
            colors={["#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#8884d8"]}
          />
          <DistributionChart
            title="Purpose of Loan"
            data={MOCK_DATA.loanPurpose}
          />
          <YesNoIndicator
            title="Pledge/Collateral Required"
            data={MOCK_DATA.collateralRequired}
          />
          <YesNoIndicator title="Has Debt/Loan" data={MOCK_DATA.debtStatus} />
          <PieChartCard
            title="Reasons for Loan Repayment Failure"
            data={MOCK_DATA.loanRepaymentFailureReason}
          />
          <PieChartCard
            title="Impact of Loan Non-Payment"
            data={MOCK_DATA.loanRepaymentImpact}
          />
          <PieChartCard
            title="Needs for Loan Improvement"
            data={MOCK_DATA.improvementNeeds}
          />
        </div>
      )}

      {activeSection === "welfare" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <YesNoIndicator
            title="Pension Coverage (Any Scheme)"
            data={MOCK_DATA.pensionCoverage}
          />
          <YesNoIndicator
            title="Ration Card Ownership"
            data={MOCK_DATA.rationCard}
          />
          <PieChartCard
            title="NREGA Work Availability"
            data={MOCK_DATA.nregaWorkAvailability}
          />
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                Scheme-Specific Pension Uptake
              </h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MOCK_DATA.pensionTypes}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <PieChartCard
            title="Pension Receipt Quality"
            data={MOCK_DATA.pensionReceiptQuality}
            colors={["#00C49F", "#FF8042"]}
          />
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                Ration Quality & Regularity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <YesNoIndicator
                  title="Regular Receipt"
                  data={MOCK_DATA.rationQuality.regularReceipt}
                />
                <YesNoIndicator
                  title="Full Quality Received"
                  data={MOCK_DATA.rationQuality.fullQualityReceived}
                />
              </div>
            </div>
          </div>
          <PieChartCard
            title="Ayushman Bharat Coverage"
            data={MOCK_DATA.ayushmanBharatCoverage}
          />
          <YesNoIndicator
            title="Health Info Access via Mobile"
            data={MOCK_DATA.healthInfoViaMobile}
          />
        </div>
      )}

      {activeSection === "employability" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <DistributionChart
              title="Future Income Plans"
              data={MOCK_DATA.futureIncomePlans}
              colors={["#82ca9d", "#FF8042", "#8884d8"]}
            />
          </div>
          <YesNoIndicator
            title="Migration Opportunity"
            data={MOCK_DATA.migrationOpportunity}
            colors={["#FF8042", "#00C49F"]}
          />
          <YesNoIndicator
            title="Willing to Start Own Business"
            data={MOCK_DATA.startOwnBusiness}
            colors={["#FF8042", "#00C49F"]}
          />
          <YesNoIndicator
            title="Family Member with Specialized Skills"
            data={MOCK_DATA.familySkills.anyMemberWithSkill}
            colors={["#FF8042", "#00C49F"]}
          />
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                Obsolete Skills Distribution
              </h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MOCK_DATA.familySkills.obsoleteSkills}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-2">
              Asset Ownership Indicators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <YesNoIndicator
                title="Agricultural Equipment"
                data={MOCK_DATA.assetOwnership.agriculturalEquipment}
              />
              <YesNoIndicator
                title="Vehicles (Bicycle/Motorcycle)"
                data={MOCK_DATA.assetOwnership.vehicles}
              />
              <YesNoIndicator
                title="Livestock - Large Animals"
                data={MOCK_DATA.assetOwnership.livestock.largeCattle}
              />
              <YesNoIndicator
                title="Livestock - Small Animals"
                data={MOCK_DATA.assetOwnership.livestock.smallAnimals}
              />
              <YesNoIndicator
                title="Work Tools & Equipment"
                data={MOCK_DATA.assetOwnership.workTools}
              />
              <YesNoIndicator
                title="Has Jewelry/Valuable Items"
                data={MOCK_DATA.assetOwnership.jewelry}
              />
              <YesNoIndicator
                title="Entertainment Equipment"
                data={MOCK_DATA.assetOwnership.entertainment}
              />
              <YesNoIndicator
                title="Land/Property"
                data={MOCK_DATA.assetOwnership.landProperty}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZeroPovertyDashboard;

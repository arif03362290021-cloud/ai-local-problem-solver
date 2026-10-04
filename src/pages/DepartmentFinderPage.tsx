import React, { useState } from 'react';
import { DepartmentInfo, ProblemCategory, SupportedLanguage } from '../types';
import { DEPARTMENTS_DATA, NEARBY_SERVICES_DATA, PublicServiceFacility } from '../data/departmentsData';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Building2,
  Search,
  Phone,
  Globe,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Clock,
  AlertCircle,
  PhoneCall,
} from 'lucide-react';

interface DepartmentFinderPageProps {
  currentLanguage: SupportedLanguage;
  onNavigateToSolveWithCategory: (category: ProblemCategory) => void;
}

const DISTRICTS = [
  'All Districts',
  'Peshawar',
  'Mardan',
  'Swat',
  'Abbottabad',
  'Tribal Districts / Merged Areas',
];

const CATEGORIES: (ProblemCategory | 'All Categories')[] = [
  'All Categories',
  'Electricity & Utilities',
  'Education',
  'Jobs & Career',
  'Documents & Identity',
  'Healthcare',
  'Agriculture',
  'Small Business',
  'Transport',
  'Government Services',
];

export const DepartmentFinderPage: React.FC<DepartmentFinderPageProps> = ({
  currentLanguage,
  onNavigateToSolveWithCategory,
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'nearMe'>('directory');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  // Near me state
  const [selectedNearMeDistrict, setSelectedNearMeDistrict] = useState('All Districts');
  const [nearMeCategory, setNearMeCategory] = useState('All Categories');

  const filteredDepartments = DEPARTMENTS_DATA.filter((dept) => {
    const matchesDistrict =
      selectedDistrict === 'All Districts' ||
      dept.district.toLowerCase().includes(selectedDistrict.toLowerCase()) ||
      dept.district.includes('All Districts');

    const matchesCategory =
      selectedCategory === 'All Categories' || dept.category === selectedCategory;

    const matchesQuery =
      searchQuery.trim() === '' ||
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.officeAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDistrict && matchesCategory && matchesQuery;
  });

  const filteredFacilities = NEARBY_SERVICES_DATA.filter((fac) => {
    const matchesDistrict =
      selectedNearMeDistrict === 'All Districts' ||
      fac.district.toLowerCase() === selectedNearMeDistrict.toLowerCase();

    const matchesCategory =
      nearMeCategory === 'All Categories' || fac.category === nearMeCategory;

    return matchesDistrict && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-left">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 w-fit px-3 py-1 rounded-md border border-emerald-200 mb-2">
          <span>Official Public Directory & Services Locator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Find the Right Department & Public Services Near Me
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Locate certified public service desks, physical office addresses, verified portals, and emergency helplines in Pakistan and Khyber Pakhtunkhwa.
        </p>
      </div>

      {/* Emergency Quick Dial Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Emergency Citizen Helplines</span>
          </div>
          <span className="text-[11px] text-slate-400">Toll-free / Official Lines</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <a
            href="tel:118"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 transition-colors text-center"
          >
            <div className="text-xs font-extrabold text-emerald-400">118</div>
            <div className="text-[11px] text-slate-300 font-medium">Electricity (DISCO)</div>
          </a>
          <a
            href="tel:1777"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 transition-colors text-center"
          >
            <div className="text-xs font-extrabold text-sky-400">1777</div>
            <div className="text-[11px] text-slate-300 font-medium">NADRA CNIC</div>
          </a>
          <a
            href="tel:1915"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 transition-colors text-center"
          >
            <div className="text-xs font-extrabold text-amber-400">1915</div>
            <div className="text-[11px] text-slate-300 font-medium">Traffic Police</div>
          </a>
          <a
            href="tel:080009009"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 transition-colors text-center"
          >
            <div className="text-xs font-extrabold text-emerald-400 truncate">0800-09009</div>
            <div className="text-[11px] text-slate-300 font-medium">Sehat Card Plus</div>
          </a>
          <a
            href="tel:1122"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 transition-colors text-center"
          >
            <div className="text-xs font-extrabold text-rose-400">1122</div>
            <div className="text-[11px] text-slate-300 font-medium">Rescue Emergency</div>
          </a>
          <a
            href="tel:15"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 transition-colors text-center"
          >
            <div className="text-xs font-extrabold text-indigo-400">15</div>
            <div className="text-[11px] text-slate-300 font-medium">Police Assistance</div>
          </a>
        </div>
      </div>

      {/* View Switcher Tabs (Directory vs Services Near Me) */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'directory'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Find Department Directory
        </button>
        <button
          onClick={() => setActiveTab('nearMe')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'nearMe'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Services Near Me
        </button>
      </div>

      {/* Tab 1: Department Directory */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Search Input */}
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search department name or service (e.g. PESCO, CNIC, Sehat Card, Domicile)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* District Dropdown */}
              <div className="sm:col-span-3">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Dropdown */}
              <div className="sm:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Showing {filteredDepartments.length} verified public departments</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-4 h-4" /> All official portal links verified
              </span>
            </div>
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {dept.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1.5 leading-snug">
                        {dept.name}
                      </h3>
                      {dept.urduName && (
                        <p className="text-xs font-urdu text-slate-500 mt-0.5">
                          {dept.urduName}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </div>
                  </div>

                  {/* Address & Helpline */}
                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{dept.officeAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <a
                        href={`tel:${dept.helpline.replace(/[^0-9]/g, '')}`}
                        className="font-semibold text-slate-900 hover:text-emerald-700"
                      >
                        {dept.helpline}
                      </a>
                    </div>
                  </div>

                  {/* Key Services Offered */}
                  <div className="pt-2">
                    <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Handled Services:
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {dept.services.map((srv, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">·</span>
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <a
                    href={dept.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  <button
                    onClick={() => onNavigateToSolveWithCategory(dept.category)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Solve Issue for this Dept →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Services Near Me */}
      {activeTab === 'nearMe' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Filter Facilities by Location & Service Type
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  District:
                </label>
                <select
                  value={selectedNearMeDistrict}
                  onChange={(e) => setSelectedNearMeDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All Districts">All Districts (KP)</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Mardan">Mardan</option>
                  <option value="Swat">Swat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category:
                </label>
                <select
                  value={nearMeCategory}
                  onChange={(e) => setNearMeCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFacilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {fac.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {fac.tehsilOrArea}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {fac.name}
                  </h3>

                  <p className="text-xs text-slate-500">{fac.department}</p>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{fac.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{fac.timings}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <a
                        href={`tel:${fac.helpline.replace(/[^0-9]/g, '')}`}
                        className="font-semibold text-emerald-700 hover:underline"
                      >
                        {fac.helpline}
                      </a>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1">
                      {fac.services.map((s, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${fac.name} ${fac.address} Khyber Pakhtunkhwa`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={fac.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

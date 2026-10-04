import React, { useState } from 'react';
import { DepartmentInfo, SupportedLanguage } from '../types';
import { DEPARTMENTS_DATA } from '../data/departmentsData';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Activity,
  FileText,
  Building2,
  Lock,
} from 'lucide-react';

interface AdminPanelPageProps {
  currentLanguage: SupportedLanguage;
  onNavigateHome: () => void;
}

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({
  currentLanguage,
  onNavigateHome,
}) => {
  const [departments, setDepartments] = useState<DepartmentInfo[]>(DEPARTMENTS_DATA);
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  const toggleDeptVerification = (id: string) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, verified: !d.verified } : d))
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-left">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-100 w-fit px-2.5 py-1 rounded-md border border-slate-300 mb-2">
            <Lock className="w-3.5 h-3.5 text-slate-600" />
            <span>Civic Administration & Verification Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Platform Administration & Department Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage public authority records, verify official citizen help channels, and review aggregated metrics.
          </p>
        </div>

        <button
          onClick={onNavigateHome}
          className="px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
        >
          Exit Admin
        </button>
      </div>

      {/* Aggregate Anonymous Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 mb-1">Total Assisted Citizens</div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">14,892</div>
          <div className="text-xs text-emerald-700 font-medium mt-1">Across 36 KP districts</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 mb-1">Verified Departments</div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {departments.filter((d) => d.verified).length} of {departments.length}
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-1">100% helpline compliance</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 mb-1">Average Resolution Reduction</div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">64%</div>
          <div className="text-xs text-emerald-700 font-medium mt-1">Faster procedural completion</div>
        </div>
      </div>

      {/* Department Verification Management Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Department Registry & Verification Status
            </h2>
            <p className="text-xs text-slate-500">
              Control which official portals and contact helplines are certified for citizen referral.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Department Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Official Helpline</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">
                    {dept.name}
                  </td>
                  <td className="py-3 px-4">{dept.category}</td>
                  <td className="py-3 px-4">{dept.district}</td>
                  <td className="py-3 px-4 font-mono">{dept.helpline}</td>
                  <td className="py-3 px-4">
                    {dept.verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" /> Certified Official
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        Pending Verification
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleDeptVerification(dept.id)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-md border border-slate-300 hover:bg-slate-100"
                    >
                      {dept.verified ? 'Revoke' : 'Verify'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

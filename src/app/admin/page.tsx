"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Shield, LogOut, Search, Filter, Eye, MessageSquare, 
  CheckCircle2, AlertCircle, Clock, Save, Edit3, User, UserPlus, Users, Loader2
} from "lucide-react";
import BrandHeader from "@/components/BrandHeader";
import { bookingService, Booking } from "@/services/bookingService";
import { userService, UserProfile } from "@/services/userService";
import { supabase } from "@/lib/supabaseClient";

const planPrices = {
  basic: 7000,
  pro: 10000,
  ultimate: 15000,
  custom: 0
};

// Custom Rupee SVG Icon to bypass registry lucide-react limitations
const RupeeIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="M6 3a6 6 0 0 1 6 6H6" />
    <path d="M6 9h6l7 9" />
  </svg>
);

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Team Management state
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamUsers, setTeamUsers] = useState<UserProfile[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("admin");
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [createUserMsg, setCreateUserMsg] = useState("");
  const [createUserErr, setCreateUserErr] = useState("");

  // Filters & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");
  
  // Edit form state
  const [editStatus, setEditStatus] = useState<Booking['status']>('pending');
  const [editNotes, setEditNotes] = useState("");
  
  const router = useRouter();

  // Load user profile & team
  const fetchUserProfile = async (userId: string) => {
    const profile = await userService.getUserProfile(userId);
    if (profile) {
      setUserProfile(profile);
    }
  };

  const loadTeamUsers = async () => {
    const users = await userService.getAllUsers();
    setTeamUsers(users);
  };

  // Authentication check with Supabase Auth & Users table sync
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || null);
        fetchUserProfile(session.user.id);
        loadBookings();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || null);
        fetchUserProfile(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Load data
  const loadBookings = async () => {
    const data = await bookingService.getBookings();
    setBookings(data);
    setFilteredBookings(data);
  };

  // Handle updates
  useEffect(() => {
    let result = [...bookings];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b => 
        b.client_name.toLowerCase().includes(q) || 
        b.whatsapp.includes(q) ||
        b.location.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(b => b.status === statusFilter);
    }

    if (packageFilter !== "all") {
      result = result.filter(b => b.package_name === packageFilter);
    }

    setFilteredBookings(result);
  }, [search, statusFilter, packageFilter, bookings]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleOpenDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditStatus(booking.status);
    setEditNotes(booking.admin_notes || "");
  };

  const handleSaveNotesAndStatus = async () => {
    if (!selectedBooking) return;
    try {
      const updated = await bookingService.updateBooking(selectedBooking.id, {
        status: editStatus,
        admin_notes: editNotes
      });
      setSelectedBooking(updated);
      await loadBookings();
      alert("Booking updated successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateUserErr("");
    setCreateUserMsg("");
    setCreateUserLoading(true);

    try {
      const res = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newEmail,
          password: newPassword,
          full_name: newFullName,
          role: newRole
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setCreateUserErr(data.error || 'Failed to create user');
      } else {
        setCreateUserMsg(`User ${newEmail} created successfully!`);
        setNewEmail("");
        setNewFullName("");
        setNewPassword("");
        await loadTeamUsers();
      }
    } catch (err: any) {
      setCreateUserErr(err.message || 'Error creating user');
    } finally {
      setCreateUserLoading(false);
    }
  };

  const handleOpenTeamModal = () => {
    setIsTeamModalOpen(true);
    setCreateUserErr("");
    setCreateUserMsg("");
    loadTeamUsers();
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-brand-black flex justify-center items-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-brand-gold font-semibold uppercase tracking-wider">Verifying Session...</span>
        </div>
      </div>
    );
  }

  // Summary Metrics
  const totalRevenue = bookings
    .filter(b => b.status !== 'pending')
    .reduce((acc, b) => acc + b.total_price, 0);

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const inProdCount = bookings.filter(b => b.status === 'in_production').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-brand-ivory flex flex-col justify-between font-sans">
      
      {/* Brand Header */}
      <BrandHeader isAdmin={true} />

      {/* Main Admin Section */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
        
        {/* Top welcome banner */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ivory flex items-center gap-2">
              <Shield size={24} className="text-brand-gold animate-pulse" />
              Production Control Room
            </h1>
            <p className="text-xs text-gray-400 mt-1">Monitor intake pipelines, coordinate session vocals, and oversee song deliveries.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {(userProfile || userEmail) && (
              <span className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-brand-gold/20 text-brand-gold text-[11px] font-medium px-3 py-1.5 rounded-xl">
                <User size={13} />
                <span>{userProfile?.full_name || userEmail}</span>
                <span className="text-[9px] uppercase font-bold bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded border border-brand-gold/20">
                  {userProfile?.role || 'admin'}
                </span>
              </span>
            )}
            <button
              onClick={handleOpenTeamModal}
              className="flex items-center gap-1.5 border border-brand-gold/30 hover:bg-brand-gold/10 text-brand-gold px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Users size={14} />
              Manage Team
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-rose-500/35 hover:bg-rose-950/20 text-rose-400 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>

        {/* METRIC CARD STATS GRID (Revamped with dark-glowing blocks) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#151518] border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:border-brand-gold/25 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-none">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Intake Queue</span>
              <span className="text-lg font-bold text-brand-ivory">{pendingCount} pending</span>
            </div>
          </div>

          <div className="bg-[#151518] border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:border-brand-gold/25 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-none">
              <Edit3 size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">In Studio</span>
              <span className="text-lg font-bold text-brand-ivory">{inProdCount} tracking</span>
            </div>
          </div>

          <div className="bg-[#151518] border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:border-brand-gold/25 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-none">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Completed</span>
              <span className="text-lg font-bold text-brand-ivory">{completedCount} delivered</span>
            </div>
          </div>

          <div className="bg-[#151518] border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg hover:border-brand-gold/25 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-none">
              <RupeeIcon size={18} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Pipeline</span>
              <span className="text-lg font-bold text-brand-gold font-sans tracking-tight">₹{totalRevenue.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* FILTERS & SEARCH ROW (Revamped modern dark elements) */}
        <div className="bg-[#151518] border-t border-l border-r border-zinc-800 rounded-t-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 text-gray-500" size={15} />
            <input
              type="text"
              placeholder="Search client, WhatsApp..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0C0C0E] border border-zinc-800 text-brand-ivory pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold/30 focus:border-brand-gold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Filter size={13} />
              Filters:
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0C0C0E] border border-zinc-800 text-brand-ivory text-xs rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_production">In Production</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={packageFilter}
              onChange={(e) => setPackageFilter(e.target.value)}
              className="bg-[#0C0C0E] border border-zinc-800 text-brand-ivory text-xs rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="ultimate">Ultimate</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        {/* DATA TABLE AREA (Revamped Sleek Dark Layout) */}
        <div className="bg-[#151518] border border-zinc-800 rounded-b-2xl overflow-x-auto shadow-xl">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950 text-[10px] uppercase font-bold text-gray-400 border-b border-zinc-800">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">WhatsApp / Loc</th>
                <th className="px-6 py-4">Plan / Language</th>
                <th className="px-6 py-4">Occasion Date</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500 font-medium">
                    No bookings found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="px-6 py-4.5 font-bold text-brand-ivory">
                      {b.client_name}
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="font-semibold text-gray-300">{b.whatsapp}</div>
                      <div className="text-[10px] text-gray-500">{b.location}</div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border mr-2 ${
                        b.package_name === 'pro' 
                          ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/30'
                          : b.package_name === 'ultimate'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : b.package_name === 'custom'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : 'bg-zinc-800 text-zinc-350 border-zinc-700'
                      }`}>
                        {b.package_name}
                      </span>
                      <span className="text-gray-400 font-medium">{b.language}</span>
                    </td>
                    <td className="px-6 py-4.5 text-gray-350 font-medium">
                      {b.occasion_date}
                    </td>
                    <td className="px-6 py-4.5 text-right font-sans font-bold text-brand-gold tracking-tight">
                      {b.package_name === 'custom' ? "Custom" : `₹${b.total_price.toLocaleString("en-IN")}`}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : b.status === 'in_production'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-450 border border-amber-500/20'
                      }`}>
                        {b.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-center">
                      <button
                        onClick={() => handleOpenDetails(b)}
                        className="gold-gradient-btn text-brand-black px-3.5 py-2 rounded-xl font-bold uppercase tracking-wider flex items-center gap-1.5 mx-auto cursor-pointer transition-transform hover:scale-[1.02]"
                      >
                        <Eye size={12} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* DETAILS MODAL popup (Revamped with modern dark Obsidian overlay) */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[100] animate-fade-in">
            <div className="bg-[#151518] border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl flex flex-col justify-between text-brand-ivory">
              
              {/* Modal Header */}
              <div className="bg-zinc-950 px-6 py-4.5 flex justify-between items-center border-b border-zinc-800">
                <div>
                  <span className="text-brand-gold text-[9px] uppercase font-bold tracking-wider block">Custom Song Project Dossier</span>
                  <h4 className="font-serif text-lg font-bold text-brand-ivory">{selectedBooking.client_name}</h4>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-white text-xl font-bold px-2 focus:outline-none cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                
                {/* Meta details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
                  <div>
                    <span className="text-gray-500 block mb-0.5">WhatsApp Contact</span>
                    <a href={`https://wa.me/${selectedBooking.whatsapp.replace(/\D/g, '')}`} target="_blank" className="font-bold text-brand-gold hover:underline">
                      {selectedBooking.whatsapp}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-0.5">Location</span>
                    <span className="font-semibold text-gray-350">{selectedBooking.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-0.5">Date Target</span>
                    <span className="font-semibold text-gray-350">{selectedBooking.occasion_date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-0.5">Occasion</span>
                    <span className="font-semibold text-gray-350">{selectedBooking.occasion}</span>
                  </div>
                </div>

                {/* Narrative Responses */}
                <div className="space-y-4">
                  <div className="border-l-2 border-brand-gold pl-3.5">
                    <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block mb-1">Relationship Context</span>
                    <p className="text-xs text-gray-300 leading-relaxed italic">
                      &quot;{selectedBooking.relationship_history}&quot;
                    </p>
                  </div>

                  <div className="border-l-2 border-brand-gold pl-3.5">
                    <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block mb-1">Favorite Memories</span>
                    <p className="text-xs text-gray-300 leading-relaxed italic">
                      &quot;{selectedBooking.favorite_memories}&quot;
                    </p>
                  </div>
                </div>

                {/* Add-ons and Pricing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-950/20 space-y-2.5">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Add-ons Selected</span>
                    {selectedBooking.selected_addons.length === 0 ? (
                      <span className="text-xs text-gray-500 italic block">No optional add-ons selected.</span>
                    ) : (
                      <ul className="space-y-1.5 text-xs text-gray-350 list-disc list-inside">
                        {selectedBooking.selected_addons.map((a) => (
                          <li key={a} className="font-semibold">{a.replace('_', ' ')}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2 flex flex-col justify-between shadow-inner">
                    <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block">Production Cost Breakdown</span>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between text-gray-400">
                        <span>Base Plan ({selectedBooking.package_name.toUpperCase()}):</span>
                        <span>{selectedBooking.package_name === 'custom' ? "Custom Pricing" : `₹${planPrices[selectedBooking.package_name].toLocaleString("en-IN")}`}</span>
                      </div>
                      <div className="flex justify-between text-gray-400 border-b border-zinc-800 pb-1.5 mb-1.5">
                        <span>Add-ons Total:</span>
                        <span>₹{(selectedBooking.total_price - (selectedBooking.package_name === 'custom' ? 0 : planPrices[selectedBooking.package_name])).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between font-bold text-sm text-brand-gold">
                        <span>Grand Total:</span>
                        <span>{selectedBooking.package_name === 'custom' ? "Enquiry Requested" : `₹${selectedBooking.total_price.toLocaleString("en-IN")}`}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ADMIN PRODUCTION CONTROL BLOCK */}
                <div className="border-t border-zinc-800 pt-4 space-y-4">
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block">Admin Control Panel</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-400">Production Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as Booking['status'])}
                        className="bg-zinc-950 border border-zinc-800 text-brand-ivory text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                      >
                        <option value="pending">Pending Review</option>
                        <option value="in_production">In Production</option>
                        <option value="completed">Delivered &amp; Completed</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-400">Private Production Notes</label>
                      <textarea
                        rows={2}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Internal band tracking, assigned musicians, vocal status..."
                        className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl text-xs focus:outline-none resize-none text-brand-ivory"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex justify-between gap-4">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 border border-zinc-800 hover:bg-zinc-900/50 text-gray-400 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={handleSaveNotesAndStatus}
                  className="px-5 py-2 gold-gradient-btn text-brand-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Save size={14} />
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TEAM USERS MANAGEMENT MODAL */}
        {isTeamModalOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[100] animate-fade-in">
            <div className="bg-[#151518] border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl flex flex-col justify-between text-brand-ivory">
              
              {/* Modal Header */}
              <div className="bg-zinc-950 px-6 py-4.5 flex justify-between items-center border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-brand-gold" />
                  <div>
                    <span className="text-brand-gold text-[9px] uppercase font-bold tracking-wider block">Access &amp; Security Control</span>
                    <h4 className="font-serif text-lg font-bold text-brand-ivory">Team Administration</h4>
                  </div>
                </div>
                <button
                  onClick={() => setIsTeamModalOpen(false)}
                  className="text-gray-400 hover:text-white text-xl font-bold px-2 focus:outline-none cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                
                {/* Form to create a new admin user */}
                <div className="bg-zinc-950 border border-brand-gold/20 rounded-xl p-5 space-y-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                    <UserPlus size={14} />
                    Register New Team User
                  </h5>

                  <form onSubmit={handleCreateUser} className="space-y-3.5">
                    {createUserErr && (
                      <div className="bg-rose-950/40 text-rose-300 border border-rose-900/50 rounded-xl p-3 text-xs flex items-start gap-2">
                        <AlertCircle size={15} className="flex-none mt-0.5" />
                        <span>{createUserErr}</span>
                      </div>
                    )}

                    {createUserMsg && (
                      <div className="bg-emerald-950/40 text-emerald-300 border border-emerald-900/50 rounded-xl p-3 text-xs flex items-start gap-2">
                        <CheckCircle2 size={15} className="flex-none mt-0.5" />
                        <span>{createUserMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Full Name</label>
                        <input
                          type="text"
                          value={newFullName}
                          onChange={(e) => setNewFullName(e.target.value)}
                          placeholder="e.g. Karthik Violinist"
                          className="bg-zinc-900 border border-zinc-800 text-brand-ivory text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-brand-gold"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Email Address</label>
                        <input
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="producer@beatroute.com"
                          className="bg-zinc-900 border border-zinc-800 text-brand-ivory text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-brand-gold"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="bg-zinc-900 border border-zinc-800 text-brand-ivory text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-brand-gold"
                          required
                          minLength={6}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Role</label>
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="bg-zinc-900 border border-zinc-800 text-brand-ivory text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-brand-gold"
                        >
                          <option value="admin">Admin</option>
                          <option value="producer">Producer</option>
                          <option value="engineer">Audio Engineer</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={createUserLoading}
                      className="w-full bg-brand-gold hover:bg-brand-gold-muted text-brand-black text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl shadow transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {createUserLoading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <UserPlus size={14} />
                          Add User to Team
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* List of Registered Team Users */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <Users size={14} />
                    Active Team Accounts ({teamUsers.length})
                  </h5>

                  <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-zinc-900 text-[10px] uppercase font-bold text-gray-400 border-b border-zinc-800">
                          <th className="px-4 py-2.5">User</th>
                          <th className="px-4 py-2.5">Role</th>
                          <th className="px-4 py-2.5">Created</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {teamUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-zinc-900/40">
                            <td className="px-4 py-2.5">
                              <div className="font-semibold text-brand-ivory">{u.full_name || 'N/A'}</div>
                              <div className="text-[11px] text-gray-400">{u.email}</div>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className="bg-brand-gold/10 text-brand-gold border border-brand-gold/20 text-[9px] uppercase font-bold px-2 py-0.5 rounded">
                                {u.role}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-gray-400 text-[11px]">
                              {new Date(u.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex justify-end">
                <button
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 border border-zinc-800 hover:bg-zinc-900/50 text-gray-400 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-8 text-center text-[10px] text-gray-600 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} BeatRoute Band Production Portal.</span>
          <span>Security Status: ACTIVE</span>
        </div>
      </footer>

    </div>
  );
}

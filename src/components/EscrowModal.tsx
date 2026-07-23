import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, CreditCard, Building2, Smartphone, Download, ArrowRight, Award } from 'lucide-react';

interface EscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  workerName?: string;
  amountPKR?: number;
}

export const EscrowModal: React.FC<EscrowModalProps> = ({
  isOpen,
  onClose,
  jobTitle = "Solar Net Metering Installation",
  workerName = "Muhammad Rashid",
  amountPKR = 18000,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'jazzcash' | 'easypaisa' | 'sadapay' | 'bank'>('jazzcash');
  const [accountNumber, setAccountNumber] = useState('');
  const [escrowStep, setEscrowStep] = useState<'details' | 'locked' | 'released'>('details');
  const [loading, setLoading] = useState(false);

  const [escrowTx, setEscrowTx] = useState<any>(null);

  if (!isOpen) return null;

  const handleLockFunds = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/escrow/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          workerName,
          clientName: 'Ahsan Khan (Client)',
          amountPKR,
          paymentMethod: selectedMethod,
          senderAccount: accountNumber || '0300 1234567',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEscrowTx(data.transaction);
        setEscrowStep('locked');
      }
    } catch (err) {
      console.error('Escrow deposit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReleaseFunds = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/escrow/release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          escrowId: escrowTx?.id || 'ESC-PK-9821',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEscrowStep('released');
      }
    } catch (err) {
      console.error('Escrow release error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Pakistan AI Escrow Vault
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                  0% Fraud Guarantee
                </span>
              </h3>
              <p className="text-xs text-slate-400">JazzCash, EasyPaisa & Bank Protected Milestones</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Project:</span>
              <span className="font-semibold text-white">{jobTitle}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Assigned Pro:</span>
              <span className="font-semibold text-emerald-400">{workerName}</span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-2">
              <span className="text-slate-300 font-medium">Protected Amount:</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">PKR {amountPKR.toLocaleString()}</span>
            </div>
          </div>

          {/* STEP 1: PAYMENT METHOD SELECTION */}
          {escrowStep === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Select Pakistani Payment Wallet / Account:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedMethod('jazzcash')}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                      selectedMethod === 'jazzcash'
                        ? 'bg-red-950/30 border-red-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">JazzCash</div>
                      <div className="text-[10px] text-slate-400">Instant Mobile Lock</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('easypaisa')}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                      selectedMethod === 'easypaisa'
                        ? 'bg-emerald-950/30 border-emerald-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">EasyPaisa</div>
                      <div className="text-[10px] text-slate-400">Telenor Wallet</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('sadapay')}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                      selectedMethod === 'sadapay'
                        ? 'bg-orange-950/30 border-orange-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-orange-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">SadaPay / NayaPay</div>
                      <div className="text-[10px] text-slate-400">Debit Card / Wallet</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('bank')}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                      selectedMethod === 'bank'
                        ? 'bg-blue-950/30 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">1IBFT Bank Transfer</div>
                      <div className="text-[10px] text-slate-400">Meezan, HBL, UBL</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Sender Mobile / IBAN Number:
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="0300 1234567 or PK64 MZN..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-slate-300 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> How Escrow Works in SkillBridge:
                </div>
                <p>1. Funds are locked securely in the AI Vault before work begins.</p>
                <p>2. Worker completes installation & uploads work completion photo.</p>
                <p>3. You verify work quality & click "Release Funds" to transfer PKR to worker.</p>
              </div>

              <button
                onClick={handleLockFunds}
                disabled={loading}
                className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {loading ? 'Locking Funds in Vault...' : `Deposit & Lock PKR ${amountPKR.toLocaleString()} in Escrow`}
              </button>
            </div>
          )}

          {/* STEP 2: FUNDS LOCKED STATE */}
          {escrowStep === 'locked' && (
            <div className="p-6 bg-slate-950 rounded-2xl border border-emerald-500/30 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">PKR {amountPKR.toLocaleString()} Locked in Escrow Vault</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Payment is safely held. Worker <span className="text-emerald-400 font-semibold">{workerName}</span> has been notified to start work.
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-left text-xs space-y-1">
                <div className="text-slate-400">Vault ID: <span className="font-mono text-slate-200">ESC-PK-9821</span></div>
                <div className="text-slate-400">Method: <span className="text-emerald-400 uppercase font-bold">{selectedMethod}</span></div>
                <div className="text-slate-400">Status: <span className="text-amber-400 font-semibold">In Progress (Pending Work Proof)</span></div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleReleaseFunds}
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center justify-center gap-2"
                >
                  {loading ? 'Releasing Funds...' : 'Work Completed & Satisfactory — Release PKR to Worker'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: FUNDS RELEASED STATE */}
          {escrowStep === 'released' && (
            <div className="p-6 bg-slate-950 rounded-2xl border border-emerald-500/40 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Escrow Payment Released!</h4>
                <p className="text-xs text-emerald-400 mt-1">
                  PKR {amountPKR.toLocaleString()} transferred to {workerName}'s account.
                </p>
              </div>

              <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-slate-300">
                Official digital invoice & tax receipt issued. Thank you for utilizing SkillBridge AI protected workspace!
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition"
              >
                Close & View Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

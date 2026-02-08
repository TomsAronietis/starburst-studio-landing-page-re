import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface QuizPopupProps {
  onClose: () => void;
}

export default function QuizPopup({ onClose }: QuizPopupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: submitError } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
        ]);

      if (submitError) {
        if (submitError.code === '23505') {
          setError('This email has already been submitted.');
        } else {
          setError('Something went wrong. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Send webhook to Zapier via edge function
      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead-webhook`;
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            phone_number: formData.phone,
            email: formData.email,
          }),
        });
      } catch (webhookError) {
        // Log webhook error but don't block the user experience
        console.error('Webhook error:', webhookError);
      }

      setStep(4);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.name.trim()) {
      setStep(2);
    } else if (step === 2 && formData.email.trim() && formData.email.includes('@')) {
      setStep(3);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-br from-[#B89B4F] to-[#9A7F3D] p-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Limited Offer</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Get Your Free Sample Edit
          </h2>
          <p className="text-white/90 text-sm">
            For free. No pressure. No obligation.
          </p>
        </div>

        <div className="p-8">
          {step === 4 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You're all set!</h3>
              <p className="text-gray-600 mb-6">
                We'll be in touch within 24 hours to discuss your free sample edit.
              </p>
              <button
                onClick={onClose}
                className="bg-[#B89B4F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A68B3F] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= step ? 'bg-[#B89B4F]' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">Step {step} of 3</p>
              </div>

              <form onSubmit={step === 3 ? handleSubmit : handleNext}>
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                        What's your name?
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B89B4F] focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        What's your email address?
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B89B4F] focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                        What's your phone number?
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B89B4F] focus:border-transparent outline-none transition-all"
                        placeholder="+1 (555) 123-4567"
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  {step > 1 && step < 4 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      disabled={isSubmitting}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 bg-[#B89B4F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A68B3F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : step === 3 ? 'Get My Free Edit' : 'Continue'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

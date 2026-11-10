import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  MapPin,
  LifeBuoy,
  FileText,
  AlertCircle,
  Activity,
  Pill,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Building2,
} from 'lucide-react';
import { useHealth } from '../context/HealthContext';

export const LandingPage: React.FC = () => {
  const { t } = useHealth();

  const features = [
    {
      id: 'symptom-checker',
      title: 'Symptom Checker',
      desc: 'Tell us how you are feeling in simple words. Our helper checks your symptoms, flags any danger signs, and tells you which doctor specialty can help you best.',
      icon: Stethoscope,
      link: '/dashboard/symptom-checker',
      badge: 'Easy Check',
      color: 'blue'
    },
    {
      id: 'find-doctors',
      title: 'Find Doctors in Khulna',
      desc: 'Discover verified doctors in Khulna, view visiting hours, consultation fees, chamber locations on the map, and book your appointment serial easily.',
      icon: MapPin,
      link: '/dashboard/find-doctors',
      badge: 'Khulna Doctors',
      color: 'teal'
    },
    {
      id: 'first-aid',
      title: 'First Aid Helper',
      desc: 'Simple step-by-step guidance for burns, cuts, nosebleeds, choking, and sprains with countdown timers and CPR rhythm guidance.',
      icon: LifeBuoy,
      link: '/dashboard/first-aid',
      badge: 'Life Saving',
      color: 'emerald'
    },
    {
      id: 'report-analyzer',
      title: 'Medical Report Reader',
      desc: 'Upload lab reports for blood tests, diabetes, kidney, liver, thyroid, and urine. Understand what your numbers mean in clear, simple English.',
      icon: FileText,
      link: '/dashboard/report-analyzer',
      badge: 'All Test Panels',
      color: 'indigo'
    },
    {
      id: 'emergency',
      title: 'Emergency 999 & Ambulances',
      desc: 'One tap to call the national 999 hotline, plus direct phone numbers for verified 24/7 ICU ambulances and hospital emergency rooms in Khulna.',
      icon: AlertCircle,
      link: '/dashboard/emergency',
      badge: '24/7 Helpline',
      color: 'red'
    },
    {
      id: 'fitness-tracker',
      title: 'Healthy Weight & BMI',
      desc: 'Find out your Body Mass Index (BMI), see if your weight is in a healthy range, check daily calories needed, and track progress over time.',
      icon: Activity,
      link: '/dashboard/fitness-tracker',
      badge: 'Weight Tracker',
      color: 'sky'
    },
    {
      id: 'medicine-checker',
      title: 'Medicine Information Checker',
      desc: 'Look up common Bangladeshi medicines, see what they are used for, check side effects, and see if two medicines are safe to take together.',
      icon: Pill,
      link: '/dashboard/medicine-checker',
      badge: 'Safe Medicine',
      color: 'amber'
    }
  ];

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Smarter Healthcare • Better Decisions</span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="hidden sm:inline text-teal-700 font-medium">
                Khulna Division Ready
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Your Health, <span className="text-blue-600">Smarter.</span><br />
              Your Care, <span className="text-teal-600">Closer.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              A friendly healthcare assistant that helps you understand symptoms in plain words, find verified doctors in Khulna, read medical reports easily, and access 24/7 emergency support.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/25 hover:bg-blue-700 transition"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition shadow-xs"
              >
                Explore Features
              </a>
              <Link
                to="/dashboard/emergency"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 font-semibold hover:bg-red-100 transition"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                999 Emergency
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-2xl font-bold text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium">
                  BMDC Verified Doctors
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-600">24/7</p>
                <p className="text-xs text-slate-500 font-medium">
                  999 Emergency Dial
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">Zero</p>
                <p className="text-xs text-slate-500 font-medium">
                  No Fake Doctor Info
                </p>
              </div>
            </div>
          </div>

          {/* Right Preview Card / Healthcare Illustration */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-3xl blur-xl opacity-30"></div>

              {/* Main Card */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs font-semibold text-slate-400 ml-2">MedNex Assistant Preview</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    Live Demo
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">Patient Symptoms:</span>
                    <span className="text-[10px] text-slate-400">Just now</span>
                  </div>
                  <p className="text-xs text-slate-800 italic bg-white p-2.5 rounded-lg border border-slate-200">
                    "I have tightness on the left side of my chest and feel short of breath after walking."
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-blue-900 font-semibold text-xs">
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      <span>Recommended Specialty:</span>
                    </div>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      Urgent Check
                    </span>
                  </div>
                  <p className="text-xs font-bold text-blue-950">
                    Cardiology & Heart Evaluation
                  </p>
                  <p className="text-[11px] text-blue-800 leading-snug">
                    Chest symptoms need prompt clinical attention. We recommend visiting a heart specialist or ER promptly.
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-emerald-900">Nearby Khulna Specialist:</p>
                    <p className="text-xs font-bold text-slate-900">Prof. Dr. Humayun Kabir</p>
                    <p className="text-[10px] text-slate-600">Fortis Escorts Khulna / KMCH</p>
                  </div>
                  <Link
                    to="/dashboard/find-doctors"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <a
                  href="tel:999"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Instant Emergency 999 Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Healthcare Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Seven Core Healthcare Services In One Place
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Built with medical safety guidelines, verified Khulna doctor contacts, and simple guidance anyone can understand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                    {idx + 1}. {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to={feature.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    Open Service
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-slate-100/70 py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How MedNex Helps You
            </h2>
            <p className="text-slate-600 text-base">
              Fast, clear, and designed to help you get the right care without confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                1. Describe your health problem
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Type what you are feeling in your own words, upload a photo or document of your medical test report, or look up emergency first aid.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                2. Get an easy explanation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                MedNex reads your information, checks for any urgent danger signs, and explains your symptoms or test numbers in plain words.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                3. Connect with verified care
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                See recommended doctor specialties, book an appointment serial at a Khulna chamber, or call a 24/7 ambulance in an emergency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us & Regional Deployment Section */}
      <section id="about-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Khulna Division, Bangladesh</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Real Medical Contacts You Can Trust
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              MedNex is built with honesty and clinical safety at its heart: we never invent fake doctors, fictional addresses, or phantom phone numbers.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our directory features verified records from Khulna Medical College Hospital (KMCH), Gazi Medical College, Fortis Escorts Heart Institute, Shaheed Sheikh Abu Naser Specialized Hospital, and the 999 National Emergency Service.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>BMDC Verified Doctors</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>999 Emergency Support</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Private & Secure</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              MedNex Health Safety Principles
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span><strong>Helpful advice, not a doctor's diagnosis:</strong> We help guide you to the right specialist without making unauthorized claims.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span><strong>No unauthorized medicine changes:</strong> Never stop or change medicines prescribed by your doctor without their advice.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <span><strong>Emergency priority:</strong> If symptoms sound dangerous, we guide you directly to 999 and the nearest emergency room.</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-200">
              <Link
                to="/dashboard"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
              >
                Go to Health Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Common Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Everything you need to know about our health helper, verified doctors, and medical safety.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Does MedNex replace my doctor?',
              a: 'No. MedNex is an educational helper to help you understand your symptoms, lab reports, and healthy weight. It helps you find the right doctor and warns you about emergency signs. Always visit a licensed doctor for diagnosis and treatment.'
            },
            {
              q: 'Are the Khulna doctors and ambulances real?',
              a: 'Yes, 100%. Every doctor is verified with official BMDC registration numbers. The hospital ERs (KMCH, Gazi, Fortis, Abu Naser) and ambulance phone numbers are real contacts in Khulna.'
            },
            {
              q: 'What should I do in an emergency?',
              a: 'If you or someone with you has severe chest pain, trouble breathing, signs of stroke, or heavy bleeding, call 999 immediately or go straight to the nearest emergency room.'
            },
            {
              q: 'How does the Medical Report Reader work?',
              a: 'You can upload an image, PDF, or text of your lab report (CBC, diabetes, liver, kidney, thyroid, urine, vitamins, etc.). The tool reads the numbers, compares them with normal healthy ranges, and explains what is high, low, or normal in easy words.'
            },
            {
              q: 'Is my health information private?',
              a: 'Yes. Your health logs and calculations stay safely in your private account. You can view, download, or delete your records at any time.'
            }
          ].map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-xs cursor-pointer transition open:bg-slate-50/70"
            >
              <summary className="flex items-center justify-between font-bold text-sm text-slate-900 list-none">
                <span>{faq.q}</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform text-lg ml-2">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

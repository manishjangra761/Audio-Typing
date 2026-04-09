import React from "react";
import { FiCheck } from "react-icons/fi";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-mesh overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-screen filter blur-3xl floating"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-screen filter blur-3xl floating" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-primary-600/5 rounded-full mix-blend-screen filter blur-3xl floating" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-between px-4 md:px-16 lg:px-24 py-12 gap-12">
        {/* LEFT SIDE - Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center gap-8">
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Master Audio Typing
              <span className="block mt-2 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent">
                with Intelligence
              </span>
            </h1>
            <p className="text-lg text-neutral-300 max-w-lg leading-relaxed">
              Real exam conditions, and Real-time progress tracking to accelerate your stenography skills.
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-4 mt-8">
            {[
              { icon: "⚡", title: "Real Exam Audio", desc: "Official test conditions" },
              { icon: "✨", title: "Instant Feedback", desc: "Know your mistakes immediately" },
              // { icon: "📊", title: "AI Progress Tracking", desc: "Smart improvement suggestions" },
              { icon: "🎯", title: "Detailed Analytics", desc: "Speed, accuracy, weak areas" }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="glass p-4 rounded-2xl flex gap-4 items-start hover:glass-light smooth-transition group hover:translate-x-2"
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                <span className="text-2xl min-w-fit">{feature.icon}</span>
                <div>
                      <h3 className="font-semibold text-white group-hover:text-primary-400 smooth-transition">{feature.title}</h3>
                  <p className="text-sm text-neutral-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Form */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 flex items-center justify-center">
          <div 
            className="w-full animate-fadeInUp"
            style={{ animationDelay: '0.3s' }}
          >
            {/* Glass Card Form */}
            <div className="glass-card p-8 md:p-10 space-y-6 relative">
              {/* Decorative gradient glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 smooth-transition -z-10 group hover:opacity-100"></div>

              {/* Form Header */}
              <div className="space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {title}
                </h2>
                <p className="text-neutral-400 text-sm">
                  Join thousands of successful stenographers
                </p>
              </div>

              {/* Form Fields */}
              <form className="space-y-4">
                {children}
              </form>

              {/* Divider */}
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-400">
                    or continue with email
                  </span>
                </div>
              </div> */}

              {/* Social Login */}
              {/* <button type="button" className="w-full glass border border-white/20 px-4 py-3 rounded-xl font-semibold text-white hover:glass-light smooth-transition flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.223-6.831-5.974 6.831H2.882l7.541-8.633L1.375 2.25h6.836l4.751 6.285 5.429-6.285zM17.7 19.5h1.849L6.375 4.121H4.35L17.7 19.5z"/>
                </svg>
                <span>Sign up with X</span>
              </button> */}

              {/* Link text */}
              <p className="text-center text-sm text-neutral-400">
                {title === "Welcome Back" ? "New here? " : "Already have an account? "}
                <a 
                  href={title === "Welcome Back" ? "/register" : "/login"}
                  className="text-primary-400 hover:text-primary-300 font-semibold smooth-transition hover:underline"
                >
                  {title === "Welcome Back" ? "Create Account" : "Sign In"}
                </a>
              </p>

              {/* Security badge */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-neutral-400">
                <FiCheck className="w-4 h-4 text-primary-500" />
                <span>Your data is encrypted and secure</span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 text-center space-y-2 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <p className="text-xs text-neutral-500">Trusted by professionals</p>
              <div className="flex justify-center items-center gap-2 text-neutral-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>4.9/5 from 2500+ users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;


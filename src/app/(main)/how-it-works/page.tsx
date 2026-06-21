import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

const steps = [
  { number: '01', title: 'Create Your Account', description: 'Sign up for free in under 30 seconds. All you need is your name, email, and to confirm you\'re 18+. No credit card required to create an account.', icon: '👤' },
  { number: '02', title: 'Browse Competitions', description: 'Explore our range of incredible prizes — from dream cars and luxury holidays to cash prizes and the latest tech. Filter by category, price, or ending soonest.', icon: '🔍' },
  { number: '03', title: 'Choose Your Tickets', description: 'Select how many tickets you want. Each ticket gives you one entry into the draw. The more tickets you have, the better your chances! All competitions have a maximum ticket limit per person to keep things fair.', icon: '🎫' },
  { number: '04', title: 'Secure Checkout', description: 'Pay securely using our Stripe-powered checkout. We accept all major debit and credit cards. Your payment details are encrypted and never stored on our servers.', icon: '🔒' },
  { number: '05', title: 'Watch the Live Draw', description: 'Every draw is conducted live on our social media channels using a verified random number generator. This ensures complete transparency and fairness for every competition.', icon: '📺' },
  { number: '06', title: 'Claim Your Prize!', description: 'Winners are contacted directly by our team. Cash prizes are transferred within 48 hours. Physical prizes are delivered to your door within 14 working days. Where a cash alternative is offered, you choose!', icon: '🏆' },
];

const trustPoints = [
  { title: 'Provably Fair', description: 'Every draw uses a cryptographically secure random number generator. Results are published with verification hashes so anyone can independently verify fairness.', icon: '🎲' },
  { title: 'Registered Company', description: 'ScotComps Ltd is a registered Scottish company operating fully within UK competition law. We take compliance seriously so you can enter with confidence.', icon: '📋' },
  { title: 'Real Winners', description: 'We publish all our winners with their permission. Check out our Winners page to see real people who\'ve won real prizes.', icon: '✅' },
  { title: 'Secure Payments', description: 'All payments are processed through Stripe, one of the world\'s most trusted payment processors. Your card details never touch our servers.', icon: '🔐' },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="animate-fade-in-up text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          How It Works
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Entering our competitions is simple, secure, and transparent. Here&apos;s everything you need to know.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8 mb-20">
        {steps.map((step, i) => (
          <FadeIn key={step.number} className="flex gap-6 items-start">
            <div className="shrink-0 w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center text-3xl">
              {step.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  Step {step.number}
                </span>
                <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
              </div>
              <p className="text-muted leading-relaxed">{step.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Why Trust ScotComps?</h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          We&apos;re committed to running the fairest, most transparent competitions in Scotland.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {trustPoints.map((point, i) => (
          <FadeIn key={point.title} delay={i * 100} className="bg-card border border-border rounded-2xl p-6">
            <div className="text-3xl mb-3">{point.icon}</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{point.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{point.description}</p>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="text-center bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-foreground mb-3">Ready to Get Started?</h2>
        <p className="text-muted mb-6 max-w-md mx-auto">
          Create your free account and start entering today. Your next big win could be just one ticket away!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/competitions"
            className="px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all hover:scale-105"
          >
            Browse Competitions
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-3 bg-card border border-border hover:border-primary/50 text-foreground font-semibold rounded-xl transition-all hover:scale-105"
          >
            Create Account
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}

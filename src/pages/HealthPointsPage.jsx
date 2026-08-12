import React, { useState, useEffect } from 'react';
import { Mail, Phone, Gift, ShoppingBag, Award, Calendar, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const HealthPointsPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "What is BIOMED's Loyalty Program?",
      answer: "The BIOMED Loyalty Program is an exclusive initiative designed to reward our loyal customers. It offers a range of discounts and benefits with every purchase."
    },
    {
      question: "How can I join in the BIOMED's Loyalty Program?",
      answer: "Simply create an account on our website and you'll automatically be enrolled in the Health Points program. You'll start earning points immediately with your first purchase."
    },
    {
      question: "Will I receive a membership card?",
      answer: "Your membership is digital! You can access your Health Points balance and rewards through your account dashboard at any time."
    },
    {
      question: "How do I accumulate coins with BIOMED's Loyalty Program?",
      answer: "You earn points on every purchase, daily website check-ins, birthdays, and special promotions. 1 rupee spent = 1 Health Point earned."
    },
    {
      question: "How can I redeem BIOMED Loyalty Program coins?",
      answer: "You can redeem your Health Points for discount vouchers at checkout. Simply select the voucher you want to apply and the discount will be automatically applied to your order."
    },
    {
      question: "Is there a limit to the number of coins that I can earn?",
      answer: "No! There's no limit to how many Health Points you can accumulate. The more you shop, the more you save."
    },
    {
      question: "How long are my BIOMED wellness coins valid for?",
      answer: "Your Health Points remain valid for 12 months from the date they are earned. Points expiring soon will be highlighted in your account."
    }
  ];

  const benefits = [
    {
      icon: ShoppingBag,
      title: "Amazing Discounts",
      description: "Exchange Points for special discounts on any product of your choice."
    },
    {
      icon: Gift,
      title: "Free Products",
      description: "Cash in your Points for free BIOMED products."
    },
    {
      icon: Calendar,
      title: "Birthday Surprises",
      description: "Enjoy a special surprise on your birthday."
    }
  ];

  const earningMethods = [
    {
      title: "Welcome Bonus",
      description: "Earn Free Points on your first sign-up",
      position: "top-0 left-1/4"
    },
    {
      title: "Place Your Wellness Order",
      description: "Earn points on every purchase",
      position: "top-0 right-1/4"
    },
    {
      title: "Website Check-In",
      description: "Get 10 Points every day by visiting our website",
      position: "bottom-0 left-1/4"
    },
    {
      title: "Birthday Gift",
      description: "Enjoy a special surprise on your birthday",
      position: "bottom-0 right-1/4"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-biomed-teal/10 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                BIOMED<br />
                <span className="text-biomed-navy">LOYALTY PROGRAM</span>
              </h1>
              <p className="text-2xl text-gray-700 mb-6">Earn Points on Every Purchase!</p>
              <button className="bg-biomed-navy hover:bg-biomed-navy/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Join Now
              </button>
            </div>
            <div className="flex justify-center">
              <div className="text-8xl">💳✨</div>
            </div>
          </div>
        </div>
      </section>

      {/* Buy More Save More */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-biomed-navy mb-4">BUY MORE, SAVE MORE!</h2>
            <p className="text-xl text-gray-700">Unlock valuable discount vouchers with your Health Points.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
            {/* Earn */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-20 h-20 bg-biomed-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-biomed-navy" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Earn Health Points</h3>
              <p className="text-gray-600 mb-4">Collect Points on every purchase, website visit, and even on your birthday.</p>
              <span className="inline-block bg-biomed-teal/20 text-biomed-navy px-4 py-2 rounded-full font-semibold">10 Points</span>
            </div>

            {/* Arrow */}
            <div className="hidden md:block">
              <div className="text-biomed-teal text-6xl">→</div>
            </div>

            {/* Redeem */}
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-20 h-20 bg-biomed-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-biomed-navy" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Redeem Discount Vouchers</h3>
              <p className="text-gray-600">Collect discount vouchers worth up to Rs.3000 using your wellness points.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Coins Sign Up */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-xl font-semibold text-gray-700">HOW TO USE</p>
                <p className="text-lg text-gray-600">BIOMED's LOYALTY PROGRAM</p>
                <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                  Watch on YouTube
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                FREE POINTS ON YOUR<br />FIRST SIGN-UP
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                It's free to join, sign up now and get free points instantly! Already a member? Sign in and start scoring!
              </p>
              <button className="bg-biomed-navy hover:bg-biomed-navy/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards & Benefits */}
      <section className="py-16 bg-biomed-teal/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-biomed-navy mb-4">REWARDS & BENEFITS</h2>
            <p className="text-xl text-gray-700">Your Points, Your Choice.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="w-20 h-20 bg-biomed-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-biomed-navy" size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Earn Wellness Coins */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-biomed-navy mb-4">EARN HEALTH POINTS</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Phone */}
            <div className="flex justify-center items-center mb-12">
              <div className="relative">
                <div className="w-64 h-96 bg-gradient-to-br from-biomed-teal to-biomed-navy rounded-3xl p-8 flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                    <p className="text-lg">You've earned your Health Points</p>
                    <div className="text-5xl mt-4">💰</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Earning Methods Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-biomed-teal/10 p-6 rounded-xl border border-biomed-teal/20">
                <h3 className="font-bold text-lg mb-2 text-biomed-navy">Welcome Bonus</h3>
                <p className="text-gray-600">Earn Free Points on your first sign-up</p>
              </div>
              <div className="bg-biomed-teal/10 p-6 rounded-xl border border-biomed-teal/20">
                <h3 className="font-bold text-lg mb-2 text-biomed-navy">Place Your Wellness Order</h3>
                <p className="text-gray-600">Earn points on every purchase</p>
              </div>
              <div className="bg-biomed-teal/10 p-6 rounded-xl border border-biomed-teal/20">
                <h3 className="font-bold text-lg mb-2 text-biomed-navy">Website Check-In</h3>
                <p className="text-gray-600">Get 10 Points every day by visiting our website</p>
              </div>
              <div className="bg-biomed-teal/10 p-6 rounded-xl border border-biomed-teal/20">
                <h3 className="font-bold text-lg mb-2 text-biomed-navy">Birthday Gift</h3>
                <p className="text-gray-600">Enjoy a special surprise on your birthday</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="flex justify-center">
              <div className="text-8xl">🤔</div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-biomed-navy mb-8">FAQs</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-biomed-teal/5 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      {expandedFaq === idx ? <ChevronUp size={20} className="text-biomed-teal" /> : <ChevronDown size={20} className="text-biomed-navy" />}
                    </button>
                    {expandedFaq === idx && (
                      <div className="px-4 pb-4 bg-biomed-teal/5">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button className="mt-8 bg-biomed-navy hover:bg-biomed-navy/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-biomed-navy mb-8">
            IF YOU HAVE ANY QUESTIONS, CONTACT US AT
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-biomed-teal/20 rounded-full flex items-center justify-center">
                <Mail className="text-biomed-navy" size={24} />
              </div>
              <a href="mailto:biomedinnovationpharmaceutical@gmail.com" className="text-lg font-semibold text-gray-900 hover:text-biomed-teal">
                biomedinnovationpharmaceutical@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-biomed-teal/20 rounded-full flex items-center justify-center">
                <Phone className="text-biomed-navy" size={24} />
              </div>
              <a href="tel:+923180079172" className="text-lg font-semibold text-gray-900 hover:text-biomed-teal">
                +92318 0079172
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthPointsPage;


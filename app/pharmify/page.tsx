'use client'

import React, { useState, useEffect, useCallback, memo } from 'react'
import { ArrowLeft, ArrowRight, Check, User, Calendar, Shield, Heart, Clock, ChevronRight, Activity, Star, Zap, UserPlus, Mail, Lock, Stethoscope, Pill, AlertTriangle, Timer, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface OnboardingData {
  age: number | null
  healthConditions: string[]
  allergies: string[]
  medicineFrequency: string
  preferences: string[]
}

interface SignupData {
  name: string
  email: string
  password: string
}

interface Question {
  id: string
  title: string
  subtitle: string
  type: 'age' | 'conditions' | 'allergies' | 'frequency' | 'preferences'
  icon: any
  options?: string[]
}

const questions: Question[] = [
  {
    id: '1',
    title: 'What\'s your age range?',
    subtitle: 'This helps us provide age-appropriate medicine recommendations and dosage information',
    type: 'age',
    icon: User
  },
  {
    id: '2', 
    title: 'Any existing health conditions?',
    subtitle: 'Select all that apply so we can provide personalized medication suggestions',
    type: 'conditions',
    icon: Stethoscope,
    options: []
  },
  {
    id: '3',
    title: 'Do you have any known allergies?',
    subtitle: 'This is crucial for your safety - we\'ll ensure no harmful interactions',
    type: 'allergies',
    icon: AlertTriangle,
    options: []
  },
  {
    id: '4',
    title: 'How often do you need medicines?',
    subtitle: 'Understanding your usage helps us recommend the best plans and offers',
    type: 'frequency',
    icon: Timer,
    options: []
  },
  {
    id: '5',
    title: 'What matters most to you?',
    subtitle: 'Choose your priorities so we can tailor your experience perfectly',
    type: 'preferences',
    icon: Settings,
    options: []
  }
]

// Dynamic options based on age
const getConditionOptions = (age: number | null) => {
  if (!age) return [
    { label: 'Diabetes', icon: Heart },
    { label: 'Hypertension', icon: Activity },
    { label: 'Asthma', icon: Activity },
    { label: 'None of the above', icon: Check }
  ]
  
  if (age < 18) {
    return [
      { label: 'Allergies', icon: Shield },
      { label: 'Asthma', icon: Activity },
      { label: 'ADHD', icon: User },
      { label: 'None of the above', icon: Check }
    ]
  } else if (age < 40) {
    return [
      { label: 'Allergies', icon: Shield },
      { label: 'Asthma', icon: Activity },
      { label: 'Anxiety', icon: User },
      { label: 'Migraine', icon: User },
      { label: 'None of the above', icon: Check }
    ]
  } else if (age < 60) {
    return [
      { label: 'Diabetes', icon: Heart },
      { label: 'Hypertension', icon: Activity },
      { label: 'High Cholesterol', icon: Activity },
      { label: 'Arthritis', icon: User },
      { label: 'None of the above', icon: Check }
    ]
  } else {
    return [
      { label: 'Diabetes', icon: Heart },
      { label: 'Hypertension', icon: Activity },
      { label: 'Heart Disease', icon: Heart },
      { label: 'Arthritis', icon: User },
      { label: 'None of the above', icon: Check }
    ]
  }
}

const getAllergyOptions = () => [
  { label: 'Penicillin', icon: Shield },
  { label: 'Aspirin', icon: Shield },
  { label: 'Sulfa drugs', icon: Shield },
  { label: 'Latex', icon: Shield },
  { label: 'No known allergies', icon: Check }
]

const getFrequencyOptions = (age: number | null) => {
  const baseOptions = [
    { label: 'Daily', icon: Calendar, desc: 'Regular medications' },
    { label: 'Weekly', icon: Calendar, desc: 'Occasional needs' },
    { label: 'Monthly', icon: Calendar, desc: 'Periodic refills' },
    { label: 'As needed', icon: Clock, desc: 'Emergency only' }
  ]
  
  if (age && age >= 60) {
    return [
      { label: 'Daily', icon: Calendar, desc: 'Multiple medications' },
      { label: 'Twice daily', icon: Clock, desc: 'Morning & evening' },
      { label: 'Weekly', icon: Calendar, desc: 'Weekly prescriptions' },
      { label: 'Monthly', icon: Calendar, desc: 'Monthly checkups' }
    ]
  }
  
  return baseOptions
}

const getPreferenceOptions = (conditions: string[], frequency: string) => {
  const baseOptions = [
    { label: 'Fast delivery', icon: Zap, desc: 'Same day delivery' },
    { label: 'Best prices', icon: Star, desc: 'Competitive pricing' },
    { label: 'Trusted brands', icon: Shield, desc: 'Quality assurance' },
    { label: 'Expert consultation', icon: User, desc: '24/7 pharmacist support' }
  ]
  
  if (conditions.includes('Diabetes') || conditions.includes('Hypertension')) {
    return [
      { label: 'Prescription management', icon: Calendar, desc: 'Automated refills' },
      { label: 'Health monitoring', icon: Activity, desc: 'Track your progress' },
      { label: 'Doctor consultation', icon: User, desc: 'Regular checkups' },
      { label: 'Medication reminders', icon: Clock, desc: 'Never miss a dose' }
    ]
  }
  
  return baseOptions
}

export default function PharmifyPage() {
  const [currentStep, setCurrentStep] = useState(0) // 0 for signup, 1-5 for onboarding
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    age: null,
    healthConditions: [],
    allergies: [],
    medicineFrequency: '',
    preferences: []
  })
  const [signupData, setSignupData] = useState<SignupData>({
    name: '',
    email: '',
    password: ''
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false)

  // Memoized input handlers to prevent re-renders
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(prev => ({ ...prev, name: e.target.value }))
  }, [])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(prev => ({ ...prev, email: e.target.value }))
  }, [])

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(prev => ({ ...prev, password: e.target.value }))
  }, [])

  const handleNext = () => {
    if (currentStep === 0) {
      // Validate signup form
      if (signupData.name && signupData.email && signupData.password) {
        setCurrentStep(1)
      }
    } else if (currentStep < 5) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else if (currentStep === 5) {
      setShowFinalConfirmation(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(prev => prev - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleSignup = () => {
    if (signupData.name && signupData.email && signupData.password) {
      setCurrentStep(1)
    }
  }

  const handleAgeSelect = (age: number) => {
    setOnboardingData(prev => ({ ...prev, age }))
    setTimeout(handleNext, 600)
  }

  const handleConditionSelect = (condition: string) => {
    if (condition === 'None of the above') {
      setOnboardingData(prev => ({ ...prev, healthConditions: [] }))
    } else {
      setOnboardingData(prev => ({
        ...prev,
        healthConditions: prev.healthConditions.includes(condition)
          ? prev.healthConditions.filter(c => c !== condition)
          : [...prev.healthConditions.filter(c => c !== 'None of the above'), condition]
      }))
    }
    setTimeout(handleNext, 600)
  }

  const handleAllergySelect = (allergy: string) => {
    if (allergy === 'No known allergies') {
      setOnboardingData(prev => ({ ...prev, allergies: [] }))
    } else {
      setOnboardingData(prev => ({
        ...prev,
        allergies: prev.allergies.includes(allergy)
          ? prev.allergies.filter(a => a !== allergy)
          : [...prev.allergies.filter(a => a !== 'No known allergies'), allergy]
      }))
    }
    setTimeout(handleNext, 600)
  }

  const handleFrequencySelect = (frequency: string) => {
    setOnboardingData(prev => ({ ...prev, medicineFrequency: frequency }))
    setTimeout(handleNext, 600)
  }

  const handlePreferenceSelect = (preference: string) => {
    setOnboardingData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }))
    setTimeout(() => {
      setShowFinalConfirmation(true)
    }, 600)
  }

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-8">
      <div className="text-center max-w-4xl">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-[#00B37A] to-[#02D08F] rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4">
            <Pill className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B37A] to-[#02D08F]">Pharmify</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your trusted healthcare partner. Get personalized medicine recommendations in just a few steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Shield className="w-8 h-8 text-[#00B37A] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Safe & Secure</h3>
            <p className="text-gray-600 text-sm">Your health data is protected with bank-level security</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Stethoscope className="w-8 h-8 text-[#00B37A] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Expert Verified</h3>
            <p className="text-gray-600 text-sm">All recommendations verified by licensed pharmacists</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Zap className="w-8 h-8 text-[#00B37A] mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">Get your medicines delivered within 30 minutes</p>
          </div>
        </div>

        <Button
          onClick={() => setShowWelcome(false)}
          className="bg-gradient-to-r from-[#00B37A] to-[#02D08F] hover:from-[#009966] hover:to-[#01B87A] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )

  // Mobile Screen Component - Memoized to prevent re-renders
  const MobileScreen = memo(() => {
    if (currentStep === 0) {
      return (
        <div className="bg-white h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00B37A] to-[#02D08F] rounded-lg flex items-center justify-center">
                <Pill className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Pharmify</h1>
                <p className="text-xs text-gray-500">Healthcare Partner</p>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="flex-1 p-4 flex flex-col justify-center">
            <div className="text-center mb-6">
              <UserPlus className="w-12 h-12 text-[#00B37A] mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600 text-sm">Join thousands of satisfied customers</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    key="mobile-name-input"
                    type="text"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={handleNameChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B37A] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    key="mobile-email-input"
                    type="email"
                    placeholder="Email Address"
                    value={signupData.email}
                    onChange={handleEmailChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B37A] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    key="mobile-password-input"
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B37A] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <Button
                onClick={handleSignup}
                disabled={!signupData.name || !signupData.email || !signupData.password}
                className="w-full bg-gradient-to-r from-[#00B37A] to-[#02D08F] hover:from-[#009966] hover:to-[#01B87A] text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By signing up, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      )
    }

    if (showFinalConfirmation) {
      return (
        <div className="bg-white h-full flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 bg-gradient-to-r from-[#00B37A] to-[#02D08F] rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">You're all set!</h2>
          <p className="text-gray-600 text-sm text-center mb-6">
            Your personalized profile is ready. Start exploring medicines tailored for you.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-[#00B37A] to-[#02D08F] hover:from-[#009966] hover:to-[#01B87A] text-white px-6 py-2 rounded-lg font-semibold"
          >
            Start Shopping
          </Button>
        </div>
      )
    }

    const currentQuestion = questions[currentStep - 1]
    let options: any[] = []

    switch (currentQuestion.type) {
      case 'conditions':
        options = getConditionOptions(onboardingData.age)
        break
      case 'allergies':
        options = getAllergyOptions()
        break
      case 'frequency':
        options = getFrequencyOptions(onboardingData.age)
        break
      case 'preferences':
        options = getPreferenceOptions(onboardingData.healthConditions, onboardingData.medicineFrequency)
        break
    }

    return (
      <div className="bg-white h-full flex flex-col">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-[#00B37A] to-[#02D08F] transition-all duration-500"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00B37A] to-[#02D08F] rounded-lg flex items-center justify-center">
              <Pill className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Pharmify</h1>
              <p className="text-xs text-gray-500">Step {currentStep} of 5</p>
            </div>
          </div>
          {currentStep > 1 && (
            <Button variant="ghost" onClick={handleBack} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#00B37A] to-[#02D08F] rounded-xl flex items-center justify-center mx-auto mb-3">
              <currentQuestion.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{currentQuestion.title}</h2>
            <p className="text-gray-600 text-sm">{currentQuestion.subtitle}</p>
          </div>

          {/* Age Selection */}
          {currentQuestion.type === 'age' && (
            <div className="space-y-3">
              {[
                { range: '13-17', value: 15 },
                { range: '18-25', value: 22 },
                { range: '26-40', value: 33 },
                { range: '41-60', value: 50 },
                { range: '60+', value: 65 }
              ].map((ageGroup) => (
                <Card
                  key={ageGroup.range}
                  className={`p-4 cursor-pointer transition-all duration-200 border ${
                    onboardingData.age === ageGroup.value
                      ? 'border-[#00B37A] bg-gradient-to-r from-[#00B37A] to-[#02D08F] text-white'
                      : 'border-gray-200 hover:border-[#00B37A] bg-white'
                  }`}
                  onClick={() => handleAgeSelect(ageGroup.value)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{ageGroup.range} years</span>
                    {onboardingData.age === ageGroup.value && <Check className="w-4 h-4" />}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Options */}
          {currentQuestion.type !== 'age' && (
            <div className="space-y-3">
              {options.map((option, index) => {
                const isSelected = 
                  (currentQuestion.type === 'conditions' && onboardingData.healthConditions.includes(option.label)) ||
                  (currentQuestion.type === 'allergies' && onboardingData.allergies.includes(option.label)) ||
                  (currentQuestion.type === 'frequency' && onboardingData.medicineFrequency === option.label) ||
                  (currentQuestion.type === 'preferences' && onboardingData.preferences.includes(option.label))

                const handleClick = () => {
                  switch (currentQuestion.type) {
                    case 'conditions':
                      handleConditionSelect(option.label)
                      break
                    case 'allergies':
                      handleAllergySelect(option.label)
                      break
                    case 'frequency':
                      handleFrequencySelect(option.label)
                      break
                    case 'preferences':
                      handlePreferenceSelect(option.label)
                      break
                  }
                }

                return (
                  <Card
                    key={option.label}
                    className={`p-4 cursor-pointer transition-all duration-200 border ${
                      isSelected
                        ? 'border-[#00B37A] bg-gradient-to-r from-[#00B37A] to-[#02D08F] text-white'
                        : 'border-gray-200 hover:border-[#00B37A] bg-white'
                    }`}
                    onClick={handleClick}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <option.icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          {option.desc && (
                            <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                              {option.desc}
                            </div>
                          )}
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  })

  // Laptop Screen Component - Desktop optimized layout
  const LaptopScreen = memo(() => {
    if (currentStep === 0) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-8">
          <Card className="w-full max-w-md p-8 bg-white shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#00B37A] to-[#02D08F] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Join thousands of satisfied customers</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    key="desktop-name-input"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.name}
                    onChange={handleNameChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B37A] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    key="desktop-email-input"
                    type="email"
                    placeholder="Enter your email address"
                    value={signupData.email}
                    onChange={handleEmailChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B37A] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    key="desktop-password-input"
                    type="password"
                    placeholder="Create a strong password"
                    value={signupData.password}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00B37A] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <Button
                onClick={handleSignup}
                disabled={!signupData.name || !signupData.email || !signupData.password}
                className="w-full bg-gradient-to-r from-[#00B37A] to-[#02D08F] hover:from-[#009966] hover:to-[#01B87A] text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6"
              >
                Create Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <p className="text-sm text-gray-500 text-center mt-6">
              By signing up, you agree to our <span className="text-[#00B37A] hover:underline cursor-pointer">Terms</span> & <span className="text-[#00B37A] hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </Card>
        </div>
      )
    }

    if (showFinalConfirmation) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-8">
          <Card className="w-full max-w-md p-8 bg-white shadow-lg text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#00B37A] to-[#02D08F] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">You're all set!</h2>
            <p className="text-gray-600 mb-8">
              Your personalized profile is ready. Start exploring medicines tailored for you.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#00B37A] to-[#02D08F] hover:from-[#009966] hover:to-[#01B87A] text-white px-8 py-3 rounded-lg font-semibold"
            >
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      )
    }

    const currentQuestion = questions[currentStep - 1]
    let options: any[] = []

    switch (currentQuestion.type) {
      case 'conditions':
        options = getConditionOptions(onboardingData.age)
        break
      case 'allergies':
        options = getAllergyOptions()
        break
      case 'frequency':
        options = getFrequencyOptions(onboardingData.age)
        break
      case 'preferences':
        options = getPreferenceOptions(onboardingData.healthConditions, onboardingData.medicineFrequency)
        break
    }

    return (
      <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-[#00B37A] to-[#02D08F] transition-all duration-500"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#00B37A] to-[#02D08F] rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Pharmify</h1>
              <p className="text-sm text-gray-500">Step {currentStep} of 5</p>
            </div>
          </div>
          {currentStep > 1 && (
            <Button variant="ghost" onClick={handleBack} className="p-3">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-[#00B37A] to-[#02D08F] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <currentQuestion.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentQuestion.title}</h2>
              <p className="text-lg text-gray-600">{currentQuestion.subtitle}</p>
            </div>

            {/* Age Selection */}
            {currentQuestion.type === 'age' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { range: '13-17', value: 15 },
                  { range: '18-25', value: 22 },
                  { range: '26-40', value: 33 },
                  { range: '41-60', value: 50 },
                  { range: '60+', value: 65 }
                ].map((ageGroup) => (
                  <Card
                    key={ageGroup.range}
                    className={`p-6 cursor-pointer transition-all duration-200 border-2 hover:scale-105 ${
                      onboardingData.age === ageGroup.value
                        ? 'border-[#00B37A] bg-gradient-to-r from-[#00B37A] to-[#02D08F] text-white shadow-lg'
                        : 'border-gray-200 hover:border-[#00B37A] bg-white'
                    }`}
                    onClick={() => handleAgeSelect(ageGroup.value)}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">{ageGroup.range}</div>
                      <div className={`text-sm ${onboardingData.age === ageGroup.value ? 'text-white/80' : 'text-gray-500'}`}>
                        years old
                      </div>
                      {onboardingData.age === ageGroup.value && (
                        <Check className="w-5 h-5 mx-auto mt-2" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Options */}
            {currentQuestion.type !== 'age' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option, index) => {
                  const isSelected = 
                    (currentQuestion.type === 'conditions' && onboardingData.healthConditions.includes(option.label)) ||
                    (currentQuestion.type === 'allergies' && onboardingData.allergies.includes(option.label)) ||
                    (currentQuestion.type === 'frequency' && onboardingData.medicineFrequency === option.label) ||
                    (currentQuestion.type === 'preferences' && onboardingData.preferences.includes(option.label))

                  const handleClick = () => {
                    switch (currentQuestion.type) {
                      case 'conditions':
                        handleConditionSelect(option.label)
                        break
                      case 'allergies':
                        handleAllergySelect(option.label)
                        break
                      case 'frequency':
                        handleFrequencySelect(option.label)
                        break
                      case 'preferences':
                        handlePreferenceSelect(option.label)
                        break
                    }
                  }

                  return (
                    <Card
                      key={option.label}
                      className={`p-6 cursor-pointer transition-all duration-200 border-2 hover:scale-[1.02] ${
                        isSelected
                          ? 'border-[#00B37A] bg-gradient-to-r from-[#00B37A] to-[#02D08F] text-white shadow-lg'
                          : 'border-gray-200 hover:border-[#00B37A] bg-white'
                      }`}
                      onClick={handleClick}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <option.icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                          <div>
                            <div className="font-semibold text-lg">{option.label}</div>
                            {option.desc && (
                              <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                                {option.desc}
                              </div>
                            )}
                          </div>
                        </div>
                        {isSelected && <Check className="w-6 h-6" />}
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  })

  if (showWelcome) {
    return <WelcomeScreen />
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6 overflow-hidden">
      <div className="flex items-center gap-8 w-full max-w-[1400px] h-full max-h-[800px]">
        {/* Laptop Screen */}
        <div className="flex-1 relative h-full max-h-[700px]">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl h-full">
            <div className="bg-gray-700 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-gray-600 rounded px-4 py-2 text-gray-300 text-sm">
                  https://pharmify.com
                </div>
              </div>
            </div>
            <div className="h-[calc(100%-60px)] bg-white rounded-lg overflow-hidden">
              <LaptopScreen />
            </div>
          </div>
        </div>

        {/* Mobile Screen */}
        <div className="relative h-full max-h-[700px] flex items-center">
          <div className="w-[320px] h-[680px] bg-black rounded-[45px] p-3 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[38px] overflow-hidden relative">
              {/* Status Bar */}
              <div className="flex justify-between items-center px-5 pt-3 pb-2 text-black text-xs font-medium bg-white">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-black/40 rounded-full"></div>
                  </div>
                  <div className="w-4 h-2 border border-black rounded-sm relative ml-1">
                    <div className="w-2.5 h-1 bg-black rounded-sm absolute top-0.5 left-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="h-[calc(100%-28px)]">
                <MobileScreen />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[45px] pointer-events-none"></div>
        </div>
      </div>
    </div>
  )
}
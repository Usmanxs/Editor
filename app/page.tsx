import { Edit, Mail, FileText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-8 animate-fade-in">
          Document Editing
          <span className="text-blue-600"> Simplified</span>
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Transform your documents with our powerful suite of editing tools
        </p>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* PDF Editor Card */}
          <Link 
            href="/pdf-editor" 
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center">
                <FileText className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold text-center mb-3 text-gray-900">PDF Editor</h2>
              <p className="text-gray-600 text-center text-sm">
                Edit, annotate, and transform PDF documents with ease
              </p>
              <div className="mt-6 flex justify-center">
                <span className="text-blue-600 text-sm font-medium group-hover:underline">
                  Get Started →
                </span>
              </div>
            </div>
          </Link>

          {/* Email Editor Card */}
          <Link 
            href="/email-editor" 
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center">
                <Mail className="h-12 w-12 text-purple-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold text-center mb-3 text-gray-900">Email Editor</h2>
              <p className="text-gray-600 text-center text-sm">
                Create beautiful email templates with our visual editor
              </p>
              <div className="mt-6 flex justify-center">
                <span className="text-purple-600 text-sm font-medium group-hover:underline">
                  Design Emails →
                </span>
              </div>
            </div>
          </Link>

          {/* MDX Editor Card */}
          <Link 
            href="/mdx-editor" 
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center">
                <Edit className="h-12 w-12 text-green-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold text-center mb-3 text-gray-900">MDX Editor</h2>
              <p className="text-gray-600 text-center text-sm">
                Write and edit MDX content with real-time preview
              </p>
              <div className="mt-6 flex justify-center">
                <span className="text-green-600 text-sm font-medium group-hover:underline">
                  Start Writing →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Our Editors?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureItem 
              title="Intuitive Interface"
              description="User-friendly design that makes editing a breeze"
            />
            <FeatureItem 
              title="Real-time Preview"
              description="See changes as you make them, in real-time"
            />
            <FeatureItem 
              title="Advanced Tools"
              description="Professional features for all your editing needs"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <Link 
            href="/pdf-editor"
            className="inline-flex items-center px-8 py-4 rounded-full bg-blue-600 text-white font-medium text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Try PDF Editor Now
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

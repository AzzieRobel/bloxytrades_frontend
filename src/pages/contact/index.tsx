import { ContactForm } from './contactForm';
import { ContactInformationSection } from './contactInformationSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question or need help? We're here to assist you. Reach out to us through any of the methods below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <ContactInformationSection />
        </div>
      </div>
    </div>
  );
}
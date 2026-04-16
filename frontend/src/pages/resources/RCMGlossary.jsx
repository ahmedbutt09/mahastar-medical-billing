import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';

const RCMGlossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('A');

  const glossaryTerms = [
    { term: 'Accounts Receivable (AR)', definition: 'Money owed to a healthcare provider for services rendered but not yet paid.', letter: 'A' },
    { term: 'Adjudication', definition: 'The process of evaluating a claim and determining payment amount.', letter: 'A' },
    { term: 'Advance Beneficiary Notice (ABN)', definition: 'Notice given to Medicare patients when a service may not be covered.', letter: 'A' },
    { term: 'Appeal', definition: 'Request for review of a denied or underpaid claim.', letter: 'A' },
    { term: 'Authorization', definition: 'Approval from a payer before providing certain services.', letter: 'A' },
    { term: 'Base Units', definition: 'Pre-determined units assigned to anesthesia procedures.', letter: 'B' },
    { term: 'Beneficiary', definition: 'Patient enrolled in a health insurance plan.', letter: 'B' },
    { term: 'Capitation', definition: 'Fixed payment per patient regardless of services provided.', letter: 'C' },
    { term: 'Charge Master', definition: 'Complete list of prices for all services at a facility.', letter: 'C' },
    { term: 'Clean Claim', definition: 'Claim that passes all edits and requires no additional information.', letter: 'C' },
    { term: 'Coinsurance', definition: 'Percentage of costs patient pays after deductible.', letter: 'C' },
    { term: 'Copayment', definition: 'Fixed amount patient pays per visit.', letter: 'C' },
    { term: 'Current Procedural Terminology (CPT)', definition: 'Standardized codes for medical procedures.', letter: 'C' },
    { term: 'Days in Accounts Receivable (DAR)', definition: 'Average number of days to collect payment.', letter: 'D' },
    { term: 'Denial', definition: 'Payer rejection of a claim.', letter: 'D' },
    { term: 'Deductible', definition: 'Amount patient pays before insurance starts.', letter: 'D' },
    { term: 'Explanation of Benefits (EOB)', definition: 'Payer statement explaining claim adjudication.', letter: 'E' },
    { term: 'Eligibility Verification', definition: 'Confirming patient insurance coverage.', letter: 'E' },
    { term: 'First Pass Acceptance Rate', definition: 'Percentage of claims paid on first submission.', letter: 'F' },
    { term: 'Global Period', definition: 'Time period during which follow-up care is included in surgical payment.', letter: 'G' },
    { term: 'Health Insurance Portability and Accountability Act (HIPAA)', definition: 'Federal law protecting patient health information.', letter: 'H' },
    { term: 'ICD-10-CM', definition: 'International Classification of Diseases codes for diagnoses.', letter: 'I' },
    { term: 'Local Coverage Determination (LCD)', definition: 'Medicare coverage policies for specific regions.', letter: 'L' },
    { term: 'Medical Necessity', definition: 'Service required for proper diagnosis or treatment.', letter: 'M' },
    { term: 'Medicare Administrative Contractor (MAC)', definition: 'Company that processes Medicare claims.', letter: 'M' },
    { term: 'Modifier', definition: 'Two-digit code that modifies a CPT code.', letter: 'M' },
    { term: 'National Coverage Determination (NCD)', definition: 'National Medicare coverage policies.', letter: 'N' },
    { term: 'National Correct Coding Initiative (NCCI)', definition: 'CMS edits preventing improper code pairing.', letter: 'N' },
    { term: 'Place of Service (POS)', definition: 'Code indicating where service was provided.', letter: 'P' },
    { term: 'Prior Authorization', definition: 'Pre-approval required before certain services.', letter: 'P' },
    { term: 'Revenue Cycle Management (RCM)', definition: 'Complete financial process from patient registration to payment.', letter: 'R' },
    { term: 'Remittance Advice (RA)', definition: 'Payer payment explanation document.', letter: 'R' },
    { term: 'Superbill', definition: 'Encounter form with services and diagnosis codes.', letter: 'S' },
    { term: 'Upcoding', definition: 'Using higher level codes than appropriate (fraudulent).', letter: 'U' }
  ];

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const filteredTerms = glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <BookOpen className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">RCM Glossary</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Comprehensive guide to Revenue Cycle Management terminology.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search glossary terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Letter Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {letters.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-10 h-10 rounded-lg font-semibold transition ${
                  selectedLetter === letter
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Glossary Terms */}
          <div className="space-y-6">
            {filteredTerms
              .filter(term => !searchTerm || true)
              .map((term, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-bold text-dark mb-2">{term.term}</h3>
                  <p className="text-gray-600">{term.definition}</p>
                </div>
              ))}
          </div>

          {filteredTerms.length === 0 && (
            <p className="text-center text-gray-500 py-8">No terms found matching your search.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RCMGlossary;
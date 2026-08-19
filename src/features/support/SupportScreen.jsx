import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'Go to your Order History in Profile, tap the order, and you\'ll see live tracking status.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI, cards, and cash on delivery, depending on the seller.',
  },
  {
    question: 'How do I become a seller on Udyami Queens?',
    answer: 'Reach out to your local Channel Partner or contact us below to get onboarded.',
  },
  {
    question: 'What if my order is delayed or wrong?',
    answer: 'Contact support below with your order number, and we\'ll help resolve it quickly.',
  },
];

function SupportScreen() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ padding: '1.5rem', maxWidth: '480px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: '#1e3a5f',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '1rem',
          padding: 0,
        }}
      >
        ← Back
      </button>

      <h2 style={{ marginBottom: '1.5rem' }}>Help & Support</h2>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Frequently Asked Questions</h3>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              overflow: 'hidden',
            }}
          >
            <div
              onClick={() => toggleFaq(index)}
              style={{
                padding: '1rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: 'bold',
              }}
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? '−' : '+'}</span>
            </div>
            {openIndex === index && (
              <div style={{ padding: '0 1rem 1rem', color: '#666' }}>{faq.answer}</div>
            )}
          </div>
        ))}
      </section>

      <section>
        <h3 style={{ marginBottom: '0.75rem' }}>Still need help?</h3>
        <div
          style={{
            padding: '1rem',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>
            📞 Call us: <strong>+91 98765 43210</strong>
          </div>
          <div>
            ✉️ Email: <strong>support@udyamiqueens.in</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SupportScreen;

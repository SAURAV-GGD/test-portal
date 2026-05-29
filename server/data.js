const faqData = [
  { id: 1, q: 'Is the NOC (No Objection Certificate) mandatory?', a: 'Yes, the NOC from your college/university is required before the internship begins. It is required after selection and not at application time.', cat: 'docs' },
  { id: 2, q: 'What is the stipend for this internship?', a: 'The stipend is performance-based and varies by project and role. Exact figures are shared with selected candidates.', cat: 'stipend' },
  { id: 3, q: 'What year of study must I be in to apply?', a: 'This program is open to 2nd, 3rd, or pre-final year undergraduates. Final-year students may apply, but preference is given to those with remaining semesters.', cat: 'eligibility' },
  { id: 4, q: 'How long does the internship last?', a: 'The duration ranges from 2 to 6 months depending on the project. Most interns join for a full semester or summer window.', cat: 'timeline' },
  { id: 5, q: 'Can I do this internship remotely?', a: 'Remote work is available for many projects, though some research roles may require on-site presence at IIT Ropar.', cat: 'remote' },
  { id: 6, q: 'What documents do I need to apply?', a: 'You need an updated resume, SOP, project links or GitHub, and latest marksheet. NOC is required after selection.', cat: 'docs' },
  { id: 7, q: 'Is there a CGPA cutoff for applying?', a: 'There is no hard CGPA cutoff. Selection focuses on project quality, clarity, and fit.', cat: 'eligibility' },
  { id: 8, q: 'How long does it take to hear back after applying?', a: 'Shortlisting results are shared within 2-3 weeks of the deadline, and offers are typically out within 4-6 weeks.', cat: 'process' },
  { id: 9, q: 'Will I get a certificate at the end?', a: 'Yes, interns who complete the program receive an official IIT Ropar certificate signed by the faculty supervisor.', cat: 'certificate' },
  { id: 10, q: 'Is there any application fee?', a: 'No, the application is completely free. The only official portal is samagama.in.', cat: 'fee' }
];

const doubtPosts = [
  {
    id: 1,
    title: 'How to write a strong SOP for IIT Ropar Samagama?',
    body: 'I am applying for the research internship and want to know what to highlight in my SOP.',
    tags: ['Internship', 'Resume'],
    votes: 47,
    status: 'approved',
    solved: true,
    user: 'Priya R.',
    time: '2h ago',
    answers: [
      {
        id: 1,
        user: 'Arjun K.',
        text: 'Focus on why IIT Ropar is the right fit for you, describe relevant projects, and keep the SOP concise and authentic.',
        time: '1h ago'
      }
    ]
  },
  {
    id: 2,
    title: 'Best DSA resources to prepare for research internship interviews?',
    body: 'I know basic data structures but want to brush up before the selection process. Does Samagama ask DSA?',
    tags: ['DSA', 'Coding'],
    votes: 31,
    status: 'approved',
    solved: false,
    user: 'Arjun K.',
    time: '5h ago',
    answers: []
  }
];

module.exports = { faqData, doubtPosts };

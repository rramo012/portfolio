import RevealOnScroll from './RevealOnScroll'

const jobs = [
  {
    date: '2023 — Present',
    role: 'Director of Software Engineering',
    company: 'OpenMetal',
    desc: 'Lead a team of engineers building scalable cloud infrastructure automation and IAM solutions. Architected RBAC models for enterprise applications, maintained 99.9% uptime for production environments, and improved DevOps practices through CI/CD and automation.',
  },
  {
    date: '2021 — 2023',
    role: 'Software Developer IV — Lead Engineer',
    company: 'InMotion Hosting',
    desc: 'Led a team of 7 engineers overseeing software architecture, security, and product development. Implemented enterprise authentication solutions integrating OAuth2 and JWT-based security. Held company-wide technology showcases and trainings.',
  },
  {
    date: '2018 — 2021',
    role: 'Software Developer III — Team Lead',
    company: 'InMotion Hosting',
    desc: 'Built a Managed WordPress system providing remote access to WordPress installations. Worked with the BoldGrid marketing department to implement improvements and orchestrate A/B tests.',
  },
  {
    date: '2015 — 2018',
    role: 'Software Developer II — Product Developer',
    company: 'InMotion Hosting',
    desc: 'Founding member of the BoldGrid brand. Individually created the BoldGrid REST API, Post and Page Builder, Theme Framework, and Central application — the full product suite from API to customer-facing portal.',
  },
  {
    date: '2013 — 2015',
    role: 'Software Developer I',
    company: 'InMotion Hosting',
    desc: 'Assisted in refactoring the customer account management system. Worked across payment processing, domain management, and order processes on the LAMP stack.',
  },
]

export default function Experience() {
  return (
    <section className="section" id="experience">
      <RevealOnScroll className="section__header">
        <span className="section__number">04 // Experience</span>
        <h2 className="section__title">
          Career <span>Path</span>
        </h2>
        <hr className="section__rule" />
      </RevealOnScroll>

      <div className="experience__timeline">
        {jobs.map((job, i) => (
          <RevealOnScroll key={job.date} className="timeline-item" delay={i > 0 ? Math.min(i, 4) : undefined}>
            <div className="timeline-item__marker" aria-hidden="true" />
            <div className="timeline-item__date">{job.date}</div>
            <div className="timeline-item__content">
              <h3 className="timeline-item__role">{job.role}</h3>
              <p className="timeline-item__company">{job.company}</p>
              <p className="timeline-item__desc">{job.desc}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

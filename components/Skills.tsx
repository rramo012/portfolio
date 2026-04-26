import RevealOnScroll from './RevealOnScroll'

const skills = [
  {
    title: 'Engineering Leadership',
    items: ['Team Growth & Mentorship', 'Performance Management', 'Hiring & Talent Development', 'Technical Roadmapping', 'Cross-functional Collaboration'],
  },
  {
    title: 'Cloud & Infrastructure',
    items: ['Kubernetes', 'OpenStack', 'Docker', 'CI/CD Pipelines', 'Ansible', 'DevOps Automation'],
  },
  {
    title: 'Identity & Access Management',
    items: ['OAuth / SAML / LDAP', 'RBAC Architecture', 'MFA', 'SSO', 'API Security', 'JWT'],
  },
  {
    title: 'Product Development',
    items: ['Agile Methodologies', 'Stakeholder Communication', 'Business Alignment', 'Competitive Analysis', 'Budget Management'],
  },
  {
    title: 'Frontend & Applications',
    items: ['JavaScript / TypeScript', 'Angular', 'React / Next.js', 'WordPress', 'UX/UI', 'Payment Processing'],
  },
  {
    title: 'Backend & Systems',
    items: ['Node.js / NestJS', 'PHP / Zend', 'REST APIs', 'RabbitMQ', 'WebSockets', 'LAMP Stack'],
  },
]

export default function Skills() {
  return (
    <section className="section" id="skills">
      <RevealOnScroll className="section__header">
        <span className="section__number">02 // Skills</span>
        <h2 className="section__title">
          Core <span>Competencies</span>
        </h2>
        <hr className="section__rule" />
      </RevealOnScroll>

      <div className="skills__grid">
        {skills.map((skill, i) => (
          <RevealOnScroll key={skill.title} className="skill-card" delay={Math.min(i + 1, 4)}>
            <h3 className="skill-card__title">{skill.title}</h3>
            <ul className="skill-card__list">
              {skill.items.map((item) => (
                <li key={item} className="skill-card__item">{item}</li>
              ))}
            </ul>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

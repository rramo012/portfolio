import RevealOnScroll from './RevealOnScroll'

const projects = [
  {
    number: '001',
    name: 'OpenMetal Central',
    desc: 'Customer-facing portal for OpenMetal\'s cloud infrastructure platform. Features IAM with RBAC, OAuth, and SAML integration, automated cloud deployments, and real-time infrastructure management across Kubernetes-based environments.',
    tags: ['MEAN Stack', 'Kubernetes', 'OpenStack', 'IAM/RBAC'],
    href: 'https://central.openmetal.io/',
  },
  {
    number: '002',
    name: 'BoldGrid Post & Page Builder',
    desc: 'An open-source page builder for WordPress that enables drag-and-drop content editing within the native TinyMCE editor. Built from the ground up as a founding product of the BoldGrid suite.',
    tags: ['JavaScript', 'WordPress', 'TinyMCE', 'Open Source'],
    href: 'https://github.com/BoldGrid/post-and-page-builder',
  },
  {
    number: '003',
    name: 'BoldGrid Theme Framework',
    desc: 'A configuration-driven library for building WordPress themes. Enables rapid theme development through a declarative API, powering dozens of themes across the BoldGrid ecosystem.',
    tags: ['PHP', 'WordPress', 'SCSS', 'Theme Engine'],
    href: 'https://github.com/BoldGrid/boldgrid-theme-framework',
  },
  {
    number: '004',
    name: 'BoldGrid Central',
    desc: 'An Angular application individually built to handle customer purchases, account management, and on-demand WordPress environment deployments. Powered the commercial side of the BoldGrid product line.',
    tags: ['Angular', 'REST API', 'Payment Processing', 'WordPress'],
    href: 'https://www.boldgrid.com/central/',
  },
]

export default function Projects() {
  return (
    <section className="section" id="projects">
      <RevealOnScroll className="section__header">
        <span className="section__number">03 // Projects</span>
        <h2 className="section__title">
          Selected <span>Work</span>
        </h2>
        <hr className="section__rule" />
      </RevealOnScroll>

      <div className="projects__grid">
        {projects.map((project, i) => (
          <RevealOnScroll key={project.number} className="project-card" delay={i + 1}>
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-card__link">
              <span className="project-card__number">{project.number}</span>
              <span className="project-card__arrow">&#8599;</span>
              <h3 className="project-card__name">{project.name}</h3>
              <p className="project-card__desc">{project.desc}</p>
              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

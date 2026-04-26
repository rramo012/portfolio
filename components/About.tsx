import RevealOnScroll from './RevealOnScroll'

export default function About() {
  return (
    <section className="section" id="about">
      <RevealOnScroll className="section__header">
        <span className="section__number">01 // About</span>
        <h2 className="section__title">
          Who I <span>Am</span>
        </h2>
        <hr className="section__rule" />
      </RevealOnScroll>

      <div className="about__grid">
        <RevealOnScroll className="about__quote" delay={1}>
          13 years of building software, teams, and products — from writing my first line of
          production code to founding member of two brands and leading engineering at scale.
        </RevealOnScroll>
        <RevealOnScroll className="about__text" delay={2}>
          <p>
            I started my career as a junior developer at InMotion Hosting in 2013, working on
            payment processing and account management systems. Over nearly a decade there, I grew
            through every level of the engineering ladder — becoming a founding member of BoldGrid,
            where I individually built the REST API, page builder plugin, theme framework, and
            customer portal from the ground up.
          </p>
          <p>
            That journey from writing LAMP stack code to leading a team of seven engineers taught me
            that great software comes from great teams. Today, as a founding member and Director of
            Software Engineering at OpenMetal, I lead engineers building scalable cloud infrastructure
            automation, identity and access management systems, and the customer-facing platform that
            powers it all.
          </p>
          <p>
            My focus is on aligning technology with business objectives, mentoring engineers at every
            level, and building cultures rooted in ownership, accountability, and continuous
            improvement.
          </p>
        </RevealOnScroll>
      </div>

      <div className="about__stats">
        <RevealOnScroll className="stat" delay={1}>
          <span className="stat__number">13+</span>
          <span className="stat__label">Years experience</span>
        </RevealOnScroll>
        <RevealOnScroll className="stat" delay={2}>
          <span className="stat__number">20+</span>
          <span className="stat__label">Products & apps shipped</span>
        </RevealOnScroll>
        <RevealOnScroll className="stat" delay={3}>
          <span className="stat__number">99.9%</span>
          <span className="stat__label">Uptime maintained</span>
        </RevealOnScroll>
      </div>
    </section>
  )
}

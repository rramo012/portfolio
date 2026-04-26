import RevealOnScroll from './RevealOnScroll'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <RevealOnScroll className="section__header">
        <span className="section__number">05 // Contact</span>
        <h2 className="section__title">
          Get In <span>Touch</span>
        </h2>
        <hr className="section__rule" />
      </RevealOnScroll>

      <div className="contact__inner">
        <RevealOnScroll className="contact__heading" delay={1}>
          Have a project in mind<span>?</span>
          <br />
          Let&apos;s build something
          <br />
          <span>together.</span>
        </RevealOnScroll>

        <RevealOnScroll className="contact__info" delay={2}>
          <a href="mailto:rafaelh@openmetal.io" className="contact__email">
            rafaelh@openmetal.io
          </a>
          <div className="contact__socials">
            <a href="https://github.com/rramo012" target="_blank" rel="noopener noreferrer" className="contact__social">GitHub</a>
            <a href="https://www.linkedin.com/in/rafael-ramos-7b83281a5/" target="_blank" rel="noopener noreferrer" className="contact__social">LinkedIn</a>
            <a href="https://profiles.wordpress.org/rramo012/#content-plugins" target="_blank" rel="noopener noreferrer" className="contact__social">WordPress</a>
          </div>
          <p className="contact__note">
            Based in Virginia Beach, VA.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}

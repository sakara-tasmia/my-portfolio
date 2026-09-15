import { useState, useEffect, useRef } from 'react';
import './App.css';

// ---- EDIT THIS SECTION WITH YOUR OWN INFO ----
const profile = {
    name: "Sakaratul Ara Tasmia",
    tagline: "A Computer science graduate student at IIUC",
    about: "I'm a Computer Science graduate student passionate about machine learning and web development. Currently working on my MSc thesis focused on driver drowsiness detection systems. Loves to explore new technologies and solve complex problems.",
    photo: `${import.meta.env.BASE_URL}profile.jpg?v=2`,
    cv: `${import.meta.env.BASE_URL}Sakaratul_Ara_Tasmia_CV.pdf`,
    initials: "ST",
    email: "sakaratasmia@gmail.com",
    github: "https://github.com/sakara-tasmia",
    linkedin: "https://www.linkedin.com/in/sakaratul-ara-tasmia-22880a288",
};

const skills = [
    "Python", "React", "JavaScript", "Git",
    "SQL", "Networking", "Linux", "Machine Learning"
];

const projects = [
    {
        title: "Email Phishing Detection System",
        description: "A machine learning-based system to detect and classify phishing emails with high accuracy.",
        tags: ["Python", "HTML", "Dockerfile"],
        source: "https://github.com/sakara-tasmia/email-phishing-detector"
    },
    {
        title: "RealScape",
        description: "A MERN stack-based real estate platform that allows users to browse and wishlist properties, agents to manage property listings, and admins to oversee platform operations.",
        tags: ["React.js (Vite)", "Tailwind CSS","Node.js"],
        source: "https://github.com/sakara-tasmia/RealScape"
    }
];

const education = [
    {
        school: "International Islamic University Chittagong (IIUC)",
        years: "Present",
        degree: "BSc in Computer Science and Engineering"
    },
    {
        school: "Kulgaon City Corporation College",
        years: "2018 to 2020",
        degree: "HSC,Group: Science"
    },
    {
        school: "Holy Flower Ideal School",
        years: "2016 to 2018",
        degree: "SSC, Group: Science"
    }
];
// ---- END EDIT SECTION ----

// Typing effect hook
function useTypewriter(text, speed = 45) {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        setDisplayed('');
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(interval);
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return displayed;
}

// Scroll-reveal hook
function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(node);
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

function App() {
    const typedTagline = useTypewriter(profile.tagline, 45);
    const [imgError, setImgError] = useState(false);

    const [aboutRef, aboutVisible] = useReveal();
    const [skillsRef, skillsVisible] = useReveal();
    const [projectsRef, projectsVisible] = useReveal();
    const [eduRef, eduVisible] = useReveal();
    const [contactRef, contactVisible] = useReveal();

    return (
        <div className="page">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>

            <header className="topbar">
                <nav className="nav">
                    <div className="nav-links">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#education">Education</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="nav-socials">
                        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                    </div>
                </nav>
            </header>

            <main>
                <section id="home" className="hero">
                    <div className="avatar">
                        {!imgError ? (
                            <img src={profile.photo} alt={profile.name} onError={() => setImgError(true)} />
                        ) : (
                            <span className="avatar-fallback">{profile.initials}</span>
                        )}
                    </div>
                    <h1 className="hero-title">{profile.name}</h1>
                    <p className="role">
                        {typedTagline}
                        <span className="cursor">|</span>
                    </p>
                    <div className="cv-wrap">
                        <a className="cv-btn" href={profile.cv} target="_blank" rel="noreferrer" download>
                            Download CV
                        </a>
                    </div>
                </section>

                <section id="about" ref={aboutRef} className={`block reveal ${aboutVisible ? 'reveal-visible' : ''}`}>
                    <h2>About</h2>
                    <p>{profile.about}</p>
                </section>

                <section id="skills" ref={skillsRef} className={`block reveal ${skillsVisible ? 'reveal-visible' : ''}`}>
                    <h2>Skills</h2>
                    <div className="chip-list">
                        {skills.map((skill, i) => (
                            <span key={i} className="chip">{skill}</span>
                        ))}
                    </div>
                </section>

                <section id="projects" ref={projectsRef} className={`block reveal ${projectsVisible ? 'reveal-visible' : ''}`}>
                    <h2>Projects</h2>
                    <div className="project-grid">
                        {projects.map((p, i) => (
                            <article key={i} className="project-card">
                                <h3>{p.title}</h3>
                                <p>{p.description}</p>
                                <div className="chip-list">
                                    {p.tags.map((tag, j) => (
                                        <span key={j} className="chip small">{tag}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    {p.website && (
                                        <a href={p.website} target="_blank" rel="noreferrer">Website</a>
                                    )}
                                    <a href={p.source} target="_blank" rel="noreferrer">Source</a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="education" ref={eduRef} className={`block reveal ${eduVisible ? 'reveal-visible' : ''}`}>
                    <h2>Education</h2>
                    {education.map((edu, i) => (
                        <div key={i} className="edu-entry">
                            <h3>{edu.school}</h3>
                            <p className="edu-meta">{edu.degree}, {edu.years}</p>
                        </div>
                    ))}
                </section>

                <section id="contact" ref={contactRef} className={`block contact reveal ${contactVisible ? 'reveal-visible' : ''}`}>
                    <h2>Let's Connect</h2>
                    <p>Feel free to reach out for opportunities or collaboration.</p>
                    <a className="cta-btn" href={`mailto:${profile.email}`}>Send me an email</a>
                    <p className="socials">
                        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                    </p>
                </section>
            </main>

            <footer>
                <p>{new Date().getFullYear()}, {profile.name}</p>
            </footer>
        </div>
    );
}

export default App;
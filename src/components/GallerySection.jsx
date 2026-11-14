import { TagSphere, SplitReveal } from '../fx/components';

const STACK_GROUPS = [
    { label: 'Frontend', color: '#C8F135', items: ['React', 'GSAP', 'Tailwind', 'JavaScript', 'TypeScript', 'Vite', 'Redux', 'HTML5', 'CSS3'] },
    { label: 'Backend', color: '#4D9FFF', items: ['Node.js', 'Express', 'Java', 'Spring MVC', 'REST API', 'GraphQL', 'Python', 'JWT'] },
    { label: 'Data & Tools', color: '#A855F7', items: ['MongoDB', 'MySQL', 'Firebase', 'Docker', 'Git', 'Figma', 'Postman'] },
];

const SPHERE_ITEMS = STACK_GROUPS.flatMap((g) => g.items);

export default function GallerySection() {
    return (
        <section id="gallery" className="stack-section">
            <div className="stack-grid">
                {/* Left — copy */}
                <div className="stack-copy">
                    <span className="font-mono stack-kicker">// THE STACK</span>
                    <h2 className="font-display stack-title">
                        <SplitReveal text="TOOLS I" />
                        <br />
                        <SplitReveal text="BUILD WITH" charStyle={{ color: 'var(--accent)' }} />
                    </h2>
                    <p className="font-body stack-desc" data-reveal="up">
                        {SPHERE_ITEMS.length} technologies orbiting one goal — shipping fast, smooth, production-ready products.
                        Hover the globe to steer it.
                    </p>

                    <div className="stack-groups" data-reveal="stagger">
                        {STACK_GROUPS.map((g) => (
                            <div key={g.label} className="stack-group" style={{ '--g': g.color }}>
                                <div className="stack-group-head">
                                    <span className="stack-dot" />
                                    <span className="font-mono">{g.label}</span>
                                    <span className="font-mono stack-count">{String(g.items.length).padStart(2, '0')}</span>
                                </div>
                                <div className="stack-group-items font-mono">{g.items.join(' · ')}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — sphere */}
                <div className="stack-sphere-wrap" data-reveal="scale">
                    <div className="stack-orbit o1" />
                    <div className="stack-orbit o2" />
                    <div className="sphere-core" />
                    <TagSphere items={SPHERE_ITEMS} radius={250} />
                </div>
            </div>
        </section>
    );
}

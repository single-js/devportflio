import avatarImg from "@/assets/avatar.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#tools" },
  { label: "Projects", href: "#projects" },
];

const resourceLinks = [
  { label: "GitHub Profile", href: "https://github.com" },
  { label: "Discord Community", href: "#" },
  { label: "Contact Support", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 px-4 border-t border-white/10 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={avatarImg} alt="SingleBoy" className="w-10 h-10 rounded-full" />
              <span className="text-lg font-bold text-white">SingleBoy</span>
            </div>
            <p className="text-sm text-[#8a9bb0] mb-5">
              I design and develop modern, scalable web applications with clean code and seamless user experience.
            </p>
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8a9bb0] hover:text-white hover:bg-white/10 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              {/* Discord */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 flex items-center justify-center text-[#5865F2] hover:bg-[#5865F2]/25 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              </a>
              {/* Email */}
              <a href="#contact" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8a9bb0] hover:text-white hover:bg-white/10 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-4">Navigation</h4>
            <div className="space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(link.href);
                    if (!el) return;
                    const lenis = (window as any).__lenis;
                    if (lenis) {
                      lenis.scrollTo(el, { offset: -80, duration: 1.2 });
                    } else {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="block text-sm text-[#6ec8d7] hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <div className="space-y-2.5">
              {resourceLinks.map((link) => (
                <a key={link.label} href={link.href} className="block text-sm text-[#6ec8d7] hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8a9bb0]">
            © 2026 SingleBoy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[#8a9bb0] hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-[#8a9bb0] hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

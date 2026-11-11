import React from 'react';
import {
  ExternalLink,
  MessageCircle,
  Globe,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config';
import { useContent, getActiveSocialLinks } from '../content/pt';
import { InteractiveLogo } from './InteractiveLogo';

export function Footer({ onNavigateView }) {
  const { brand, nav, portfolio, footer } = useContent();
  const activeSocials = getActiveSocialLinks();
  const currentYear = new Date().getFullYear();

  const resolveSocialIcon = (platformName) => {
    const key = String(platformName).toLowerCase();
    if (key.includes('insta')) return Instagram;
    if (key.includes('linked')) return Linkedin;
    if (key.includes('git')) return Github;
    return Globe;
  };

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative bg-obsidian pt-16 pb-28 sm:pb-24 border-t border-hairline/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="footer-heading" className="sr-only">
          {footer.h2}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-hairline/10">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => onNavigateView && onNavigateView('home')}
              className="inline-flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow rounded-xl cursor-pointer"
            >
              <InteractiveLogo size={42} interactive={true} />
              <div>
                <span className="block font-display font-bold text-lg text-fg leading-none">
                  {brand.name}
                </span>
                <span className="block font-mono text-[11px] text-fg-muted mt-1">
                  {brand.tagline}
                </span>
              </div>
            </button>

            <p className="mt-4 text-sm text-fg-muted leading-relaxed max-w-sm">
              {footer.contactDescription}
            </p>

            {/* Render social icons ONLY when SOCIAL_LINKS values exist */}
            {activeSocials.length > 0 && (
              <div className="flex items-center gap-3 mt-6">
                {activeSocials.map(({ platform, url }) => {
                  const IconComp = resolveSocialIcon(platform);
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className="w-9 h-9 rounded-full bg-surface-elevated border border-hairline/15 flex items-center justify-center text-fg-muted hover:text-fg hover:border-indigo-glow/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow"
                    >
                      <IconComp className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Portfolio Direct Links & Case Studies Column */}
          <div className="lg:col-span-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-fg-subtle mb-4">
              {footer.portfolioTitle}
            </h3>
            <ul className="space-y-2.5">
              {portfolio.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 text-sm text-fg-muted hover:text-emerald-glow transition-colors group"
                  >
                    <span>
                      <span>{item.name}</span>{' '}
                      <span className="text-xs text-fg-subtle">
                        ({item.niche})
                      </span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-glow group-hover:text-emerald-glow shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Multi-View Navigation & Direct WhatsApp Column */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-fg-subtle mb-4">
              {footer.navigationTitle}
            </h3>
            <ul className="space-y-2 mb-6">
              {nav.views.map((view) => (
                <li key={view.id}>
                  <button
                    type="button"
                    onClick={() => onNavigateView && onNavigateView(view.id)}
                    className="text-sm text-fg-muted hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-glow rounded cursor-pointer"
                  >
                    {view.label}
                  </button>
                </li>
              ))}
            </ul>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 bg-surface-elevated hover:bg-emerald-deep/30 text-fg text-xs font-semibold border border-emerald-glow/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-glow"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-glow" />
              <span>{footer.contactButton}</span>
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-fg-subtle font-mono">
          <p>
            &copy; {currentYear} {brand.fullTitle}. {footer.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}

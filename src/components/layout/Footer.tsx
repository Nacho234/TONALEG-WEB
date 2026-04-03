import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Heart, Share2, Video, Rss } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/animations'

const navLinks = {
  Productos: ['Sérum Reparador', 'Complejo de Aceites', 'Tratamiento Cuero Cabelludo', 'Sets & Rituales'],
  Empresa: ['Nuestra Historia', 'Sostenibilidad', 'Ingredientes', 'Prensa & Media'],
  Ayuda: ['Guía de Uso', 'Envíos', 'Devoluciones', 'FAQ'],
}

export default function Footer() {
  return (
    <footer className="text-white" style={{ background: 'linear-gradient(135deg, #2e1065 0%, #1e1b4b 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Main footer grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-20 border-b border-white/10"
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white text-sm font-bold">T</span>
              </div>
              <span className="font-serif text-xl font-semibold tracking-wide">TONALEG</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
              Cosmética capilar de lujo formulada con los ingredientes más selectos del mundo.
              Porque tu cabello merece lo mejor.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Heart, href: '#', label: 'Instagram' },
                { icon: Share2, href: '#', label: 'Twitter' },
                { icon: Rss, href: '#', label: 'Facebook' },
                { icon: Video, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-[#c4b5fd] hover:border-[#a855f7]/40 transition-all duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          {Object.entries(navLinks).map(([title, links]) => (
            <motion.div key={title} variants={fadeUp}>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c4b5fd] mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact bar */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-8 border-b border-white/10 flex flex-wrap gap-8"
        >
          {[
            { icon: Mail, text: 'hello@tonaleg.com' },
            { icon: Phone, text: '+1 (800) TONALEG' },
            { icon: MapPin, text: 'Buenos Aires · Milano · Miami' },
          ].map(({ icon: Icon, text }) => (
            <motion.div
              key={text}
              variants={fadeUp}
              className="flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors"
            >
              <Icon size={14} className="text-[#a855f7]" />
              <span className="text-sm">{text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-xs text-white/30">
            © 2026 TONALEG. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {['Política de Privacidad', 'Términos de Uso', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

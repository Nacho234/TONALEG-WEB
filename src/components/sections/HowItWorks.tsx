import { motion } from 'framer-motion'
import { Droplets, Sparkles, Sun } from 'lucide-react'
import SectionHeading from '@/components/common/SectionHeading'
import { staggerContainer, fadeUp } from '@/lib/animations'

const steps = [
  {
    number: '01',
    icon: Droplets,
    title: 'Limpia',
    subtitle: 'Pureza Profunda',
    description: 'Elimina impurezas y residuos con nuestro champu de pH equilibrado, dejando el cuero cabelludo perfectamente preparado.',
    color: '#a8c4d4',
    bg: 'from-blue-50 to-cyan-50',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Trata',
    subtitle: 'Nutrición Intensiva',
    description: 'Aplica el sérum o aceite reparador en el cabello húmedo. La fórmula penetra en la fibra capilar y actúa desde el interior.',
    color: '#a855f7',
    bg: 'from-amber-50 to-yellow-50',
  },
  {
    number: '03',
    icon: Sun,
    title: 'Nutre',
    subtitle: 'Brillo & Vitalidad',
    description: 'Sella con el tratamiento final para un brillo espectacular. Tu cabello queda protegido, suave y visiblemente transformado.',
    color: '#8fad88',
    bg: 'from-emerald-50 to-green-50',
  },
]

export default function HowItWorks() {
  return (
    <section id="ritual" className="py-28 bg-white" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #faf5ff 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="El Ritual"
          title="Tres Pasos. Resultados Extraordinarios."
          subtitle="Un ritual de cuidado diseñado para convertir tu rutina diaria en un momento de lujo auténtico."
        />

        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] hidden md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'left' }}
              className="h-px bg-gradient-to-r from-[#38bdf8] via-[#a855f7] to-[#34d399]"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step circle */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.bg} border-2 flex items-center justify-center mb-8 relative z-10 shadow-lg shadow-purple-100`}
                    style={{ borderColor: `${step.color}40` }}
                  >
                    <Icon size={24} style={{ color: step.color }} />
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                      style={{ background: step.color }}
                    >
                      {step.number.slice(-1)}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="bg-white border border-[#a855f7]/15 rounded-3xl p-8 w-full group-hover:border-[#a855f7]/35 group-hover:shadow-lg group-hover:shadow-purple-50 transition-all duration-300">
                    <div
                      className="text-xs font-semibold tracking-widest uppercase mb-2"
                      style={{ color: step.color }}
                    >
                      {step.subtitle}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#0f0a1e] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[#6b6b6b] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

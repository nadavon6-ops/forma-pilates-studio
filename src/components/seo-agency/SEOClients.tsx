'use client'

import { motion } from 'framer-motion'

const clients = [
  { name: 'בנק לאומי', industry: 'פיננסים' },
  { name: 'כללית', industry: 'בריאות' },
  { name: 'אלביט', industry: 'טכנולוגיה' },
  { name: 'שטראוס', industry: 'מזון' },
  { name: 'פרטנר', industry: 'תקשורת' },
  { name: 'אל על', industry: 'תעופה' },
  { name: 'דלק', industry: 'אנרגיה' },
  { name: 'הוט', industry: 'תקשורת' },
]

export default function SEOClients() {
  return (
    <section id="clients" className="relative py-24 overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            הלקוחות שלנו
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            חברות שסומכות <span className="text-emerald-400">עלינו</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            כל הלקוחות שלנו מגיעים דרך המלצות. זו ההוכחה הטובה ביותר לאיכות העבודה שלנו.
          </p>
        </motion.div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.5)' }}
              className="relative p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 text-center transition-all cursor-default group"
            >
              {/* Placeholder for logo - using initials */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-2xl font-bold text-emerald-400 group-hover:from-emerald-500/20 group-hover:to-green-500/10 transition-all">
                {client.name.charAt(0)}
              </div>
              <div className="text-white font-semibold mb-1">{client.name}</div>
              <div className="text-gray-500 text-sm">{client.industry}</div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gray-900/50 border border-gray-800">
            <div className="flex -space-x-2 space-x-reverse">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold"
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">150+ לקוחות מרוצים</div>
              <div className="text-gray-500 text-sm">100% הגיעו דרך המלצות</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

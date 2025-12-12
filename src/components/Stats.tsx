const stats = [
  { number: '25+', label: 'לקוחות פעילים' },
  { number: '1,800+', label: 'מילות מפתח במעקב' },
  { number: '150%', label: 'עלייה ממוצעת בתנועה' },
  { number: '10+', label: 'שנות ניסיון' },
]

export default function Stats() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-primary-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    name: "Marco Rossi",
    role: "Travel Content Creator",
    city: "Milano",
    content: "Il sistema di verifica GPS della piattaforma è incredibilmente preciso. Ha trasformato il modo in cui scopro e condivido esperienze locali autentiche con il mio pubblico. Gli elementi di gamification generano un coinvolgimento reale.",
    avatar: "MR",
    rating: 5,
    followers: "12K",
    verified: true
  },
  {
    id: 2,
    name: "Sofia Chen",
    role: "Digital Marketing Manager",
    city: "Roma",
    content: "Dal punto di vista business, JourneyFlux fornisce insights preziosi sul comportamento dei turisti. L'analytics della piattaforma ci aiuta a comprendere i flussi dei visitatori e ottimizzare le nostre strategie di marketing.",
    avatar: "SC",
    rating: 5,
    followers: "8K",
    verified: true
  },
  {
    id: 3,
    name: "Luca Benedetti",
    role: "Tourism Research Analyst",
    city: "Firenze",
    content: "La tecnologia dietro le sfide basate sulla geolocalizzazione è impressionante. Come ricercatore, apprezzo come la piattaforma raccoglie dati significativi fornendo al contempo esperienze culturali autentiche.",
    avatar: "LB",
    rating: 5,
    followers: "2K",
    verified: false
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Scelto dai
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">professionisti del settore</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri come i professionisti del turismo e della tecnologia stanno sfruttando la nostra piattaforma
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-500">5.0</span>
              </div>
              
              <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <div className="ml-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.city} • {testimonial.followers} connessioni</p>
                  </div>
                </div>
                <div className="text-2xl group-hover:scale-125 transition-transform">
                  {testimonial.verified ? '🏆' : '⭐'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl">
            Partecipa alla valutazione della piattaforma
          </div>
        </div>
      </div>
    </section>
  );
}

import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    id: 1,
    name: "Marco Rossi",
    role: "Travel Blogger",
    city: "Milano",
    content: "JourneyFlux ha trasformato il mio modo di esplorare le città! Le sfide GPS sono coinvolgenti e mi hanno fatto scoprire posti incredibili. Perfetto per i travel blogger!",
    avatar: "MR",
    rating: 5,
    followers: "12K",
    verified: false
  },
  {
    id: 2,
    name: "Sofia Chen",
    role: "Content Creator",
    city: "Roma",
    content: "L'app è geniale per i content creator! Le sfide fotografiche sono creative e i miei follower adorano i contenuti. Aspetto con ansia le nuove città!",
    avatar: "SC",
    rating: 5,
    followers: "8K",
    verified: false
  },
  {
    id: 3,
    name: "Luca Benedetti",
    role: "Studente Erasmus",
    city: "Firenze",
    content: "Come studente straniero, JourneyFlux è stata la mia guida perfetta per conoscere l'Italia autentica. Le sfide gastronomiche sono le mie preferite!",
    avatar: "LB",
    rating: 5,
    followers: "2K",
    verified: false
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="text-6xl">🎉</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            I nostri beta tester sono
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">entusiasti!</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri le esperienze di chi sta già testando JourneyFlux in anteprima
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-purple-100 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-500">5.0</span>
              </div>
              
              <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform">
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
                    <p className="text-sm text-gray-600">{testimonial.role} • {testimonial.city}</p>
                    <p className="text-xs text-purple-600 font-medium">{testimonial.followers} followers</p>
                  </div>
                </div>
                <div className="text-2xl group-hover:scale-125 transition-transform">
                  {testimonial.verified ? '🔥' : '⭐'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl">
            <span className="mr-2">🚀</span>
            Diventa anche tu un beta tester
          </div>
        </div>
      </div>
    </section>
  );
}

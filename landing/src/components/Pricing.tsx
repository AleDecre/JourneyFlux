import { CheckIcon, StarIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    name: "🚀 Esploratore",
    price: "GRATIS",
    originalPrice: null,
    popular: false,
    description: "Perfetto per iniziare la tua avventura",
    features: [
      "✨ Accesso a 5 città italiane",
      "🎯 20 sfide GPS al mese",
      "🏆 Badge base collezionabili",
      "📊 Classifiche locali",
      "💬 Community support",
      "📱 App iOS & Android"
    ],
    cta: "Inizia Gratis",
    highlight: "Sempre gratuito"
  },
  {
    name: "💎 Avventuriero Pro",
    price: "€4.99",
    originalPrice: null,
    popular: true,
    description: "L'esperienza completa per veri esploratori",
    features: [
      "🌍 Accesso ILLIMITATO a tutte le città",
      "🎮 Sfide GPS infinite + contenuti esclusivi",
      "🏅 Badge premium esclusivi",
      "🌟 Classifiche globali",
      "🎭 Tour tematici avanzati",
      "🎧 Supporto prioritario",
      "📈 Statistiche dettagliate",
      "🔔 Notifiche per nuove sfide"
    ],
    cta: "Prova 7 Giorni GRATIS",
    highlight: "Più popolare"
  },
  {
    name: "👑 Creator",
    price: "€9.99",
    originalPrice: null,
    popular: false,
    description: "Per content creator e community builder",
    features: [
      "🔥 Tutti i benefici Avventuriero Pro",
      "⚡ Creazione sfide illimitata",
      "📈 Analytics avanzate per contenuti",
      "🎯 Priorità nella moderazione",
      "🤝 Badge creator esclusivo",
      "� Supporto dedicato",
      "🚀 Early access a nuove funzionalità",
      "💡 Feedback diretto con il team"
    ],
    cta: "Diventa Creator",
    highlight: "Per professionisti"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Struttura
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">prezzi piattaforma</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Prezzi flessibili progettati per diversi segmenti di utenti e partnership aziendali.
          </p>
          <div className="mt-8 inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Accesso anticipato: Prezzi speciali per partner iniziali
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl text-center ${
              plan.popular 
                ? 'border-purple-400 bg-gradient-to-b from-purple-500/20 to-pink-500/20 shadow-purple-500/30' 
                : 'border-white/20 hover:border-white/40'
            }`}>
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center shadow-lg">
                    <StarIcon className="w-4 h-4 mr-2" />
                    {plan.highlight}
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-300 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="ml-2 text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                    )}
                  </div>
                  {plan.price !== "GRATIS" && (
                    <p className="text-gray-400 text-sm">al mese</p>
                  )}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 text-left">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                  : 'bg-white/10 border-2 border-white/30 text-white hover:bg-white/20'
              } transform hover:scale-105`}>
                {plan.cta}
              </button>
              
              {!plan.popular && (
                <div className="text-center mt-4">
                  <span className="text-sm text-gray-400">{plan.highlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300 mb-8">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="font-medium">Sicuro e Conforme</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="font-medium">Contratti Flessibili</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="font-medium">Prova 30 giorni</span>
              </div>
            </div>
            <p className="text-gray-400">
              Tutti i piani premium includono 30 giorni di prova gratuita. Termini flessibili per early adopter e accordi di partnership.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

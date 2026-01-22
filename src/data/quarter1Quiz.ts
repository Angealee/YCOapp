export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation?: string;
}

export const quarter1Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Ano ang pangunahing katangian ng bugtong?",
    options: [
      "Mahabang salaysay",
      "Tuwirang paglalarawan",
      "Patulang palaisipan na may talinghaga",
      "Kuwentong may banghay"
    ],
    correctAnswer: 2,
    explanation: "Ang bugtong ay isang patulang palaisipan na gumagamit ng talinghaga upang ilarawan ang isang bagay, tao, hayop, o pangyayari."
  },
  {
    id: 2,
    question: "Alin ang layunin ng bugtong sa kulturang Pilipino?",
    options: [
      "Magbigay-aliw at hamunin ang isipan",
      "Magtala ng kasaysayan",
      "Maglahad ng datos",
      "Mag-ulat ng balita"
    ],
    correctAnswer: 0,
    explanation: "Ang bugtong ay ginagamit upang magbigay aliwan at hamunin ang katalinuhan ng mga tao."
  },
  {
    id: 3,
    question: "Alin ang HINDI katangian ng bugtong?",
    options: [
      "Maikli at patula",
      "May talinghaga",
      "Literal ang sagot",
      "Nakapaloob sa kulturang Pilipino"
    ],
    correctAnswer: 2,
    explanation: "Ang sagot sa bugtong ay hindi literal kundi nangangailangan ng pagsusuri at pag-unawa."
  },
  {
    id: 4,
    question: "Ano ang tawag sa uri ng tanong na humahamon sa lohikal na pag-iisip at hindi tuwiran ang sagot?",
    options: [
      "Salawikain",
      "Kasabihan",
      "Palaisipan",
      "Tanaga"
    ],
    correctAnswer: 2,
    explanation: "Ang palaisipan ay uri ng tanong na humahamon sa lohikal na pag-iisip at karaniwang may sagot na hindi literal."
  },
  {
    id: 5,
    question: "Alin ang tamang sagot sa palaisipang: “Ano ang laging darating ngunit hindi kailanman dumarating?”",
    options: [
      "Umaga",
      "Oras",
      "Bukas",
      "Gabi"
    ],
    correctAnswer: 2,
    explanation: "Ang sagot ay 'Bukas' dahil ito ay laging darating pero hindi kailanman dumarating bilang isang aktwal na araw."
  },
  {
    id: 6,
    question: "Ano ang pangunahing layunin ng palaisipan?",
    options: [
      "Magturo ng kasaysayan",
      "Magpatalas ng kritikal na pag-iisip",
      "Magbigay ng aliw lamang",
      "Maglahad ng opinyon"
    ],
    correctAnswer: 1,
    explanation: "Ang palaisipan ay nagpapataas ng kritikal na pag-iisip sa pamamagitan ng paghahamon sa isipan."
  },
  {
    id: 7,
    question: "Ilang linya mayroon ang tanaga?",
    options: [
      "Dalawa",
      "Tatlo",
      "Apat",
      "Lima"
    ],
    correctAnswer: 2,
    explanation: "Ang tanaga ay may apat na linya na may sukat na 7-7-7-7 na pantig."
  },
  {
    id: 8,
    question: "Ilang pantig ang bawat linya ng tanaga?",
    options: [
      "Lima",
      "Anim",
      "Pito",
      "Walo"
    ],
    correctAnswer: 2,
    explanation: "Ang bawat linya ng tanaga ay may pitong pantig (7-7-7-7)."
  },
  {
    id: 9,
    question: "Alin ang HINDI katangian ng tanaga?",
    options: [
      "May tugma",
      "Maikli",
      "Malalim ang kahulugan",
      "Walang sukat"
    ],
    correctAnswer: 3,
    explanation: "Ang tanaga ay may sukat at tugma - ito ay may 4 linya na may 7 pantig bawat linya."
  },
  {
    id: 10,
    question: "Ano ang pangunahing layunin ng tanaga?",
    options: [
      "Maglahad ng balita",
      "Magpahayag ng damdamin at karunungan",
      "Magbigay ng panuto",
      "Magtala ng datos"
    ],
    correctAnswer: 1,
    explanation: "Ang tanaga ay ginagamit upang ipahayag ang damdamin at munting karunungan."
  },
  {
    id: 11,
    question: "Ano ang kahulugan ng salawikain?",
    options: [
      "Maikling kwento",
      "Bugtong na patula",
      "Kasabihang may aral sa buhay",
      "Tula na may sukat"
    ],
    correctAnswer: 2,
    explanation: "Ang salawikain ay isang pahayag na may aral sa buhay na ginagamit upang magpayo o magturo."
  },
  {
    id: 12,
    question: "Alin ang halimbawa ng salawikain?",
    options: [
      "“May ulo ngunit walang buhok”",
      "“Kung ano ang itinanim, siya rin ang aanihin”",
      "“Isang bagay na walang paa”",
      "“Aklat ang aking gabay”"
    ],
    correctAnswer: 1,
    explanation: "Ang \"Kung ano ang itinanim, siya rin ang aanihin\" ay isang salawikain na may aral sa buhay."
  },
  {
    id: 13,
    question: "Ano ang pangunahing layunin ng salawikain?",
    options: [
      "Magbigay-libangan",
      "Magturo ng aral at gabay sa buhay",
      "Maglahad ng kuwento",
      "Magpahayag ng damdamin"
    ],
    correctAnswer: 1,
    explanation: "Ang layunin ng salawikain ay magturo ng aral at magbigay ng gabay sa buhay."
  },
  {
    id: 14,
    question: "Ano ang pagkakaiba ng kasabihan sa salawikain?",
    options: [
      "Mas mahaba ang kasabihan",
      "Mas teknikal ang kasabihan",
      "Mas tuwirang payo ang kasabihan",
      "Walang aral ang kasabihan"
    ],
    correctAnswer: 2,
    explanation: "Ang kasabihan ay mas tuwiran at direktang payo kumpara sa salawikain na may talinghaga."
  },
  {
    id: 15,
    question: "Alin ang halimbawa ng kasabihan?",
    options: [
      "“Nasa Diyos ang awa, nasa tao ang gawa”",
      "“Ang taong walang kibo, nasa loob ang kulo”",
      "“Hindi tao, hindi hayop”",
      "“Wika’y ating yaman”"
    ],
    correctAnswer: 0,
    explanation: "Ang \"Nasa Diyos ang awa, nasa tao ang gawa\" ay isang kasabihan na direktang payo."
  },
  {
    id: 16,
    question: "Ano ang komiks?",
    options: [
      "Anyong tulang tradisyunal",
      "Pagsasanib ng larawan at teksto sa pagsasalaysay",
      "Mahabang nobela",
      "Pormal na sanaysay"
    ],
    correctAnswer: 1,
    explanation: "Ang komiks ay isang anyo ng media na nagtatampok ng kombinasyon ng mga imahe at teksto upang makuha ang atensyon ng mambabasa."
  },
  {
    id: 17,
    question: "Alin ang HINDI elemento ng komiks?",
    options: [
      "Tauhan",
      "Banghay",
      "Panel",
      "Sukat"
    ],
    correctAnswer: 3,
    explanation: "Ang sukat ay hindi elemento ng komiks, samantalang ang tauhan, banghay, at panel ay mga pangunahing elemento nito."
  },
  {
    id: 18,
    question: "Ano ang kahalagahan ng komiks sa edukasyon?",
    options: [
      "Nagpapahirap sa pagkatuto",
      "Naglilimita sa imahinasyon",
      "Nakapagpapalinang ng literasi at malikhaing pag-iisip",
      "Ginagamit lamang sa libangan"
    ],
    correctAnswer: 2,
    explanation: "Ang komiks ay nakakatulong sa pag-unlad ng literasi at malikhaing pag-iisip ng mga mag-aaral."
  },
  {
    id: 19,
    question: "Ano ang layunin ng tekstong ekspositori?",
    options: [
      "Maglahad ng damdamin",
      "Magbigay-kaalaman at magpaliwanag",
      "Magkuwento ng karanasan",
      "Manghikayat"
    ],
    correctAnswer: 1,
    explanation: "Ang tekstong ekspositori ay naglalahad ng impormasyon at nagpapaliwanag ng mga konsepto."
  },
  {
    id: 20,
    question: "Ano ang tamang paglalarawan ng sanhi at bunga?",
    options: [
      "Sanhi ang resulta, bunga ang dahilan",
      "Sanhi ang dahilan, bunga ang epekto",
      "Pareho lamang ang sanhi at bunga",
      "Walang kaugnayan ang sanhi at bunga"
    ],
    correctAnswer: 1,
    explanation: "Ang sanhi ay ang dahilan o nag-trigger sa isang pangyayari, habang ang bunga ay ang epekto o resulta nito."
  }
];
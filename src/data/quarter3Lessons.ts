export interface LessonMeta {
  quarter: string;
  aralin: string;
  title: string;
  description: string;
  stats: {
    topics: number;
    interactive: boolean;
  };
}

export type LessonSection = {
  id: string;
  title: string;
  subtitle?: string;
  intro?: string;
  bullets?: string[];
  examples?: Array<{ id: number; label?: string; text?: string }>;
  multimodalGroups?: Array<{ category: string; items: string[] }>;
  media?: { audioSrc?: string; videoSrc?: string };
};

export interface QuarterLesson {
  meta: LessonMeta;
  sections: LessonSection[];
}

export const quarter3LessonsById: Record<number, QuarterLesson> = {
  1: {
    meta: {
      quarter: "Q3",
      aralin: "Aralin 1",
      title: "Ang Panitikang Pilipino sa Pananakop ng mga Espanyol",
      description:
        "Tinalakay sa araling ito ang konteksto ng pananakop ng Espanyol at kung paano nito hinubog ang mga akdang Pilipino—lalo na ang panitikang panrelihiyon, pang-edukasyon, at pang-aliw.",
      stats: { topics: 3, interactive: false },
    },
    sections: [
      {
        id: "kaligiran",
        title: "Kaligiran",
        subtitle: "Panahon ng Espanyol",
        intro:
          "Dumating ang mga Espanyol sa Pilipinas noong 1565 sa pamumuno ni Miguel López de Legazpi. Kasabay ng kanilang pananakop ang malawakang pagbabago sa pamumuhay, paniniwala, at kultura ng mga Pilipino. Isa sa pinakamalaking naapektuhan ay ang panitikan.\n\nSa simula ng pananakop, ginamit ng mga Espanyol ang panitikan bilang kasangkapan sa pagpapalaganap ng Kristiyanismo. Itinuro ng mga prayle ang bagong relihiyon sa pamamagitan ng mga dasal, aklat panrelihiyon, pasyon, dalit, at senakulo. Ang dating baybayin ay unti-unting napalitan ng alpabetong Romano, dahilan upang mas madaling maipalaganap ang mga akdang nakasulat.\n\nHabang lumilipas ang panahon, lumaganap din ang mga panitikang panlibangan tulad ng komedya o moro-moro, karilyo, awit, at korido. Bagama’t nagsisilbing aliwan, ang mga akdang ito ay may layuning ipakita ang kapangyarihan ng Kristiyanismo at ng pamahalaang Espanyol.",
        media: {
          audioSrc: "/assets/media/q3/aralin1/kaligiran.mp3",
          videoSrc: "/assets/media/q3/aralin1/kaligiran.mp4",
        },
        bullets: [
          "Pagpapalaganap ng Kristiyanismo at pagbabago ng paniniwala at gawi.",
          "Pag-usbong ng edukasyong pinamunuan ng mga orden relihiyoso.",
          "Pagpapakilala/paggamit ng alpabetong Romano at mga akdang nakasulat.",
          "Pagbabago sa mga anyo: mula sa pasalindila patungo sa nakasulat at limbag.",
        ],
      },
      {
        id: "mga-anyo",
        title: "Mga Anyo ng Panitikan",
        subtitle: "Umusbong sa Panahon",
        bullets: [
          "Panitikang panrelihiyon: dasal, novena, katesismo, pasyon, senakulo.",
          "Panitikang pang-aliw: awit, korido, komedya (moro-moro).",
          "Panitikang pang-edukasyon: gramatika, diksyunaryo, aklat-aralin.",
        ],
      },
      {
        id: "epekto",
        title: "Layunin at Epekto",
        subtitle: "Sa Lipunan",
        bullets: [
          "Pagpapatibay ng kapangyarihan ng kolonyal na pamahalaan at simbahan.",
          "Paglaganap ng bagong pananampalataya at pagpapahalaga.",
          "Pagkakaroon ng mga bagong anyo ng sining at pagtatanghal.",
          "Pag-igting ng kamalayan na hahantong sa panitikang makabayan sa mga susunod na panahon.",
        ],
      },
    ],
  },

  2: {
    meta: {
      quarter: "Q3",
      aralin: "Aralin 2",
      title: "Senakulo at Pasyon",
      description:
        "Pag-unawa sa senakulo bilang dulang panrelihiyon at sa pasyon bilang salaysay ng buhay at pagdurusa ni Hesus na karaniwang inaawit o binibigkas tuwing Mahal na Araw.",
      stats: { topics: 3, interactive: false },
    },
    sections: [
      {
        id: "senakulo-kahulugan",
        title: "Senakulo",
        subtitle: "Kahulugan",
        intro:
          "Ang senakulo ay isang dulang panrelihiyon na nagsasalaysay ng buhay, paghihirap, kamatayan, at muling pagkabuhay ni Hesukristo. Karaniwan itong itinatanghal tuwing Mahal na Araw, lalo na sa Huwebes Santo at Biyernes Santo.",
        media: {
          audioSrc: "/assets/media/q3/aralin2/senakulo-kahulugan.mp3",
          videoSrc: "/assets/media/q3/aralin2/senakulo-kahulugan.mp4",
        },
      },
      {
        id: "senakulo-kasaysayan",
        title: "Senakulo",
        subtitle: "Kasaysayan",
        intro:
          "Ang senakulo ay nagmula sa Espanya at dinala sa Pilipinas noong panahon ng pananakop ng mga Espanyol. Ginamit ito ng mga prayle bilang mabisang paraan ng pagtuturo ng Kristiyanismo sa mga Pilipino. Dahil maraming Pilipino noon ang hindi marunong bumasa at sumulat, naging epektibo ang senakulo bilang visual at dramatikong paraan ng pagpapaliwanag ng Bibliya.",
        media: {
          audioSrc: "/assets/media/q3/aralin2/senakulo-kasaysayan.mp3",
          videoSrc: "/assets/media/q3/aralin2/senakulo-kasaysayan.mp4",
        },
      },
      {
        id: "senakulo-katangian",
        title: "Senakulo",
        subtitle: "Katangian",
        bullets: [
          "Isang dula na may diyalogo at kilos.",
          "Karaniwang patula ang pananalita.",
          "May mga tauhang mula sa Bibliya (Hesus, Maria, Judas, Pilato).",
          "Ipinapalabas sa entablado o sa lansangan.",
          "Relihiyoso at may aral sa pananampalataya.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin2/senakulo-katangian.mp3",
          videoSrc: "/assets/media/q3/aralin2/senakulo-katangian.mp4",
        },
      },
      {
        id: "pasyon-kahulugan",
        title: "Pasyon",
        subtitle: "Kahulugan",
        intro:
          "Ang pasyon ay isang akdang patula at panrelihiyon na nagsasalaysay ng buhay, paghihirap, kamatayan, at muling pagkabuhay ni Hesukristo. Karaniwan itong inaawit o binibigkas tuwing Mahal na Araw, lalo na sa Biyernes Santo.",
        media: {
          audioSrc: "/assets/media/q3/aralin2/pasyon-kahulugan.mp3",
          videoSrc: "/assets/media/q3/aralin2/pasyon-kahulugan.mp4",
        },
      },
      {
        id: "pasyon-kasaysayan",
        title: "Pasyon",
        subtitle: "Kasaysayan",
        intro:
          "Ang pasyon ay nagmula sa Europa, partikular sa Espanya, at dinala sa Pilipinas noong panahon ng pananakop ng mga Espanyol. Ginamit ito ng mga prayle bilang mabisang paraan ng pagpapalaganap ng Kristiyanismo. Isa ito sa mga unang anyo ng panitikang naisulat sa wikang katutubo gamit ang alpabetong Romano.\n\nAng kauna-unahang pasyon sa Tagalog ay isinulat ni Gaspar Aquino de Belen na pinamagatang Mahal na Passion ni Jesu Christong Panginoon Natin.",
        media: {
          audioSrc: "/assets/media/q3/aralin2/pasyon-kasaysayan.mp3",
          videoSrc: "/assets/media/q3/aralin2/pasyon-kasaysayan.mp4",
        },
      },
      {
        id: "pasyon-halimbawa",
        title: "Halimbawa",
        subtitle: "Ang Paghapon ng Ating Panginoon (Pasyon)",
        intro:
          "Saknong 1: Panimula\nAko’y nalulungkot at napapaluha,\nSa pag-alala sa Paghapon ng Aking Panginoon.\nPinagpawisan at pinahirapan,\nUpang tayo’y maligtas sa kasalanan.\n\nSaknong 2: Pagdarasal sa Hardin ng Getsemani\nSa Hardin ng Getsemani, si Hesus ay nagdarasal,\nSa Ama’y nanalangin ng taimtim at banal.\n“Ama ko, kung maaari, ilayo Mo sa akin ang kapighatian,\nNgunit huwag ang aking kalooban, kundi ang Iyo lamang.”\n\nSaknong 3: Pagkahuli kay Hesus\nSi Hesus ay hinuli ng mga sundalo,\nPinaglakipan ng mga tali at hinatak sa hukuman.\nAng mga alagad, takot at taksil ang ginawa,\nAng isa’y nagkanulo, si Judas ang nagbenta.\n\nSaknong 4: Paglilitis at Paghatol\nDinala siya kay Pilato, hari ng mga hudyo,\nSinabi ng tao, “Husgahan Siya ng kamatayan!”\nKahit walang kasalanan, hinatulan si Hesus,\nUpang tuparin ang kalooban ng Diyos Ama.\n\nSaknong 5: Pagdadala ng Krus\nSi Hesus ay pinapasan ang mabigat na krus,\nSa bawat hakbang, Siya’y nahihirapan.\nAng mga tao ay humihiyaw at tumatawa,\nNgunit Siya’y tahimik at matatag sa sakripisyo.\n\nSaknong 6: Pagkakapako sa Krus\nSa bundok ng Kalbaryo, Siya’y ipinako,\nPinaiyak ng ina at ng mga disipulo.\n“Ama, patawarin Mo sila, sapagkat hindi nila alam,”\nAng salita Niya ay puno ng awa at pag-ibig.\n\nSaknong 7: Kamatayan at Paglubog\nNamatay Siya sa krus, ang mundo’y nagdilim,\nAng lupa’y yumanig sa sandaling iyon.\nAng langit ay humugot ng luha,\nNgunit ang pag-ibig Niya ay di magmamaliw.\n\nSaknong 8: Muling Pagkabuhay\nNgunit sa ikatlong araw, Siya’y muling nabuhay,\nAng kamatayan ay kanyang napagtagumpayan.\nAng mga disipulo ay nagalak at nagpasalamat,\nAng buhay ay nagbunga ng pag-asa at kaligtasan.",
        media: {
          audioSrc: "/assets/media/q3/aralin2/pasyon-halimbawa.mp3",
          videoSrc: "/assets/media/q3/aralin2/pasyon-halimbawa.mp4",
        },
      },
    ],
  },

  3: {
    meta: {
      quarter: "Q3",
      aralin: "Aralin 3",
      title: "Duplo",
      description:
        "Pag-aaral sa duplo bilang isang patulang pagtatalo na karaniwang bahagi ng lamay o pagtitipon—may wit, talino, at pagsunod sa tuntunin ng pagtugma at sukat.",
      stats: { topics: 3, interactive: false },
    },
    sections: [
      {
        id: "duplo-kahulugan",
        title: "Duplo",
        subtitle: "Kahulugan",
        intro:
          "Ang duplo ay isang tradisyunal na patulang paligsahan o paligsahan sa talino at talinghaga. Karaniwang ginagawa sa lamay o libing bilang bahagi ng paggunita sa yumaong mahal sa buhay.",
        bullets: [
          "Ginagamit ang malalim na talinghaga, sawikain, at tugma.",
          "Dalawang panig ang nagtatagisan ng talino sa pamamagitan ng palitan ng patula o berso.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin3/duplo-kahulugan.mp3",
          videoSrc: "/assets/media/q3/aralin3/duplo-kahulugan.mp4",
        },
      },
      {
        id: "duplo-kasaysayan",
        title: "Duplo",
        subtitle: "Kasaysayan",
        bullets: [
          "Naganap ang duplo noong panahon ng Espanyol bilang anyong pampanitikan sa mga Pilipino.",
          "Layunin: magbigay ng aliw at ipakita ang husay sa pananalita at pagtula.",
          "Naging popular sa kalalakihan at kababaihan bilang larangan ng talino at karunungan sa wika.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin3/duplo-kasaysayan.mp3",
          videoSrc: "/assets/media/q3/aralin3/duplo-kasaysayan.mp4",
        },
      },
      {
        id: "duplo-katangian",
        title: "Duplo",
        subtitle: "Katangian",
        bullets: [
          "Paligsahan sa patula – karaniwang tanong-sagot na berso.",
          "Ginagamitan ng tugma at sukat – maayos ang daloy at ritmo ng salita.",
          "Puno ng talinghaga – kailangan ng talino at mabilis na pag-iisip.",
          "Ginaganap sa lamay o okasyon – kadalasang sa libing ng mayayamang tao.",
          "May tema – karaniwan tungkol sa buhay, kamatayan, o kabutihan.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin3/duplo-katangian.mp3",
          videoSrc: "/assets/media/q3/aralin3/duplo-katangian.mp4",
        },
      },
      {
        id: "duplo-layunin",
        title: "Duplo",
        subtitle: "Layunin",
        bullets: [
          "Magbigay ng aliw at karunungan sa mga manonood.",
          "Ipakita ang husay sa pananalita, talino, at wit.",
          "Panatilihin ang tradisyon at panitikang patula sa Pilipinas.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin3/duplo-layunin.mp3",
          videoSrc: "/assets/media/q3/aralin3/duplo-layunin.mp4",
        },
      },
      {
        id: "duplo-halimbawa",
        title: "Halimbawa",
        subtitle: "Halimbawa ng Duplo (Maikling Berso)",
        intro:
          "Tanong:\n“Sino ang higit sa lahat, na tunay na mahal sa buhay?”\nSagot:\n“Ang nagmahal sa kapwa, sa Diyos at sa bayan,\nSiya ang tunay na yaman ng kaluluwa’t dangal.”\n\nTanong:\n“Paano mo haharapin ang kasawian at hirap?”\nSagot:\n“Sa pananalig at pagtitiis, sa gawaing may dangal,\nMatatag ang loob, kahit bagyo’y sumalubong sa daan.”",
        media: {
          audioSrc: "/assets/media/q3/aralin3/duplo-halimbawa.mp3",
          videoSrc: "/assets/media/q3/aralin3/duplo-halimbawa.mp4",
        },
      },
    ],
  },

  4: {
    meta: {
      quarter: "Q3",
      aralin: "Aralin 4",
      title: "Awit at Korido",
      description:
        "Pagkilala at paghahambing sa awit at korido batay sa sukat, himig, tema, at paraan ng pagsasalaysay.",
      stats: { topics: 3, interactive: false },
    },
    sections: [
      {
        id: "awit-kahulugan",
        title: "Awit",
        subtitle: "Kahulugan",
        intro:
          "Ang awit ay isang patulang panitikan na karaniwang may 12 pantig bawat taludtod. Karaniwan itong nobela o kuwento na puno ng pag-ibig, kabayanihan, at kababalaghan. Mas mabagal ang himig kumpara sa korido at mas detalyado ang kuwento.",
        bullets: [
          "Sukat: 12 pantig bawat taludtod.",
          "Tema: pag-ibig, kabayanihan, kababalaghan.",
          "Himig: mabagal.",
          "Istilo: mas detalyado ang kuwento.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin4/awit-kahulugan.mp3",
          videoSrc: "/assets/media/q3/aralin4/awit-kahulugan.mp4",
        },
      },
      {
        id: "korido-kahulugan",
        title: "Korido",
        subtitle: "Kahulugan",
        intro:
          "Ang korido ay isa ring patulang panitikan, ngunit may 8 pantig bawat taludtod. Karaniwang mabilis ang daloy ng kuwento at puno rin ng kababalaghan at pakikipagsapalaran. Mas nakatuon ito sa pangunahing pangyayari o aksyon kaysa sa detalye.",
        bullets: [
          "Sukat: 8 pantig bawat taludtod.",
          "Tema: kabayanihan, pakikipagsapalaran, kababalaghan.",
          "Himig: mabilis.",
          "Istilo: mas diretso sa aksyon.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin4/korido-kahulugan.mp3",
          videoSrc: "/assets/media/q3/aralin4/korido-kahulugan.mp4",
        },
      },
      {
        id: "awit-korido-kasaysayan",
        title: "Kasaysayan",
        subtitle: "Awit at Korido",
        bullets: [
          "Ang awit at korido ay dinala sa Pilipinas ng mga Espanyol sa panahon ng kolonisasyon.",
          "Nakasulat sa Tagalog gamit ang alpabetong Romano.",
          "Naging tanyag sa panahon ng Espanyol bilang libangan at panitikan sa mga kabataan at matatanda.",
          "Ang mga paksa ay karaniwang pag-ibig, kabayanihan, kababalaghan, at relihiyon.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin4/kasaysayan.mp3",
          videoSrc: "/assets/media/q3/aralin4/kasaysayan.mp4",
        },
      },
      {
        id: "awit-korido-katangian",
        title: "Katangian",
        subtitle: "Paghahambing",
        bullets: [
          "Sukat: Awit (12 pantig bawat taludtod) | Korido (8 pantig bawat taludtod).",
          "Himig: Awit (mabagal) | Korido (mabilis).",
          "Tema: Awit (pag-ibig, kabayanihan, kababalaghan) | Korido (kabayanihan, pakikipagsapalaran, kababalaghan).",
          "Istilo: Awit (mas detalyado ang kuwento) | Korido (mas diretso sa aksyon).",
          "Pinagmulan: Parehong Espanya.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin4/katangian.mp3",
          videoSrc: "/assets/media/q3/aralin4/katangian.mp4",
        },
      },
      {
        id: "awit-korido-halimbawa",
        title: "Halimbawa",
        subtitle: "Maikling Halimbawa",
        intro:
          "Awit (Maikling halimbawa)\nFlorante at Laura ni Francisco Balagtas\n\"Sa gubat ng Abo, ako'y naglalakbay,\nAng puso'y nagdurusa sa pag-ibig na tunay.\"\n\nKorido (Maikling halimbawa)\nIbong Adarna (unang bahagi)\n\"Lumilipad ang Adarna sa gubat,\nAng kanyang awit ay himig ng kagandahan.\"",
        media: {
          audioSrc: "/assets/media/q3/aralin4/halimbawa.mp3",
          videoSrc: "/assets/media/q3/aralin4/halimbawa.mp4",
        },
      },
      {
        id: "awit-korido-kahalagahan",
        title: "Kahalagahan",
        subtitle: "Bakit Mahalaga?",
        bullets: [
          "Naging bahagi ng panitikang Pilipino sa panahon ng Espanyol.",
          "Nagbigay ng aliw at aral sa mga mambabasa at tagapakinig.",
          "Nakatulong sa paglinang ng wika at panitikan sa Tagalog.",
          "Nagpakita ng impluwensya ng kulturang Espanyol at naging daan sa sariling panitikan ng Pilipino.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin4/kahalagahan.mp3",
          videoSrc: "/assets/media/q3/aralin4/kahalagahan.mp4",
        },
      },
    ],
  },

  5: {
    meta: {
      quarter: "Q3",
      aralin: "Aralin 5",
      title: "Balita",
      description:
        "Pagkilala sa balita, mga elemento at katangian nito, at paggamit ng multimodal (teksto, larawan, audio, bidyo, datos) sa pag-uulat at pag-unawa.",
      stats: { topics: 4, interactive: true },
    },
    sections: [
      {
        id: "balita-kahulugan",
        title: "Kahulugan ng Balita",
        subtitle: "Ano ang Balita?",
        bullets: [
          "Ang balita ay isang ulat tungkol sa mga kaganapan o pangyayari na mahalaga sa publiko.",
          "Layunin nitong magbigay ng impormasyon nang tama, mabilis, at malinaw.",
          "Halimbawa: Balita sa dyaryo, radyo, telebisyon, o online news.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin5/kahulugan.mp3",
          videoSrc: "/assets/media/q3/aralin5/kahulugan.mp4",
        },
      },
      {
        id: "balita-katangian",
        title: "Katangian ng Balita",
        subtitle: "Pamantayan",
        bullets: [
          "Makatotohanan – dapat totoo at tumpak ang impormasyon.",
          "Napanahon – tungkol sa kasalukuyang pangyayari.",
          "Klaro at direkta – madaling maunawaan ng mambabasa o tagapakinig.",
          "Nakapokus sa pangunahing impormasyon – hindi nagtatampok ng personal na opinyon.",
          "Balanse at patas – ipinapakita ang magkabilang panig kung may kontrobersiya.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin5/katangian.mp3",
          videoSrc: "/assets/media/q3/aralin5/katangian.mp4",
        },
      },
      {
        id: "balita-bahagi",
        title: "Bahagi ng Balita",
        subtitle: "Mga Parte",
        bullets: [
          "Ulo o Headline – maikling pahayag na nagbibigay ng ideya sa buong balita.",
          "Sub-ulo o Subhead – karagdagang impormasyon sa ulo ng balita.",
          "Lead – panimula ng balita; sagot sa Sino, Ano, Kailan, Saan, Bakit, Paano.",
          "Katawan o Body – detalyadong paglalahad ng pangyayari; karagdagang impormasyon at paliwanag.",
          "Katawan ng Sanggunian – pinagmulan ng impormasyon tulad ng mga tao, opisyal, o dokumento.",
          "Wakas o Conclusion – pagsasara ng balita; maaaring buod o huling pahayag.",
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin5/bahagi.mp3",
          videoSrc: "/assets/media/q3/aralin5/bahagi.mp4",
        },
      },
      {
        id: "gawain",
        title: "Mungkahing Gawain",
        bullets: [
          "Piliin ang isang pangyayari at isulat ang 5W at 1H.",
          "Gumawa ng maikling balita (10–15 pangungusap) na may headline at lead.",
          "Magdagdag ng 1 larawan + caption o 1 infographic para maging multimodal ang ulat.",
        ],
      },
      {
        id: "balita-estruktura",
        title: "Estruktura ng Balita",
        subtitle: "Inverted Pyramid",
        intro:
          "A. Inverted Pyramid Structure (Pinaka-karaniwan)\nLead / Simula â€“ pinakamahalagang impormasyon: Sino ang sangkot? Ano ang nangyari? Kailan at saan ito nangyari? Bakit at paano ito nangyari?\nDetalye â€“ paliwanag, karagdagang impormasyon, background.\nKaragdagang detalye â€“ iba pang kaugnay na impormasyon, quotes, at reaksyon.\nWakas / Conclusion â€“ buod o huling pahayag na mahalaga sa mambabasa.\n\nHalimbawa ng simpleng balita (lead + body):\nUlo: â€œLindol, yumanig sa Luzon kagabiâ€\nLead: â€œIsang malakas na lindol na may lakas na 6.2 magnitude ang yumanig sa Luzon kagabi, dahilan upang mag-evacuate ang mga residente sa ilang bayan.â€\nBody: â€œAyon sa ulat ng PHIVOLCS, hindi agad naitala ang pinsala ngunit may mga naulat na bitak sa mga gusali sa Metro Manila at Pampanga. Nagpatupad ng precautionary measures ang lokal na pamahalaan upang matiyak ang kaligtasan ng mga mamamayan.â€",
        media: {
          audioSrc: "/assets/media/q3/aralin5/estruktura.mp3",
          videoSrc: "/assets/media/q3/aralin5/estruktura.mp4",
        },
      },
      {
        id: "balita-multimodal",
        title: "Multimodal sa Balita",
        subtitle: "Gamit at Output",
        multimodalGroups: [
          {
            category: "Teksto/Print",
            items: ["Dyaryo at news clipping", "Headline + lead worksheet", "Press release / official statement"],
          },
          {
            category: "Audio",
            items: ["Radio-style newscast recording", "Interview audio", "Voice-over ng balita"],
          },
          {
            category: "Bidyo",
            items: ["TV-style newscast", "Field report (stand-up)", "Short news video (reel/shorts)"],
          },
          {
            category: "Larawan at Data",
            items: ["News photo + caption", "Infographic (chart/graph)", "Mapa at timeline ng pangyayari"],
          },
          {
            category: "Online/Social",
            items: ["Online news post", "Social post mockup", "Source comparison (2 outlets)"],
          },
        ],
        media: {
          audioSrc: "/assets/media/q3/aralin5/multimodal.mp3",
          videoSrc: "/assets/media/q3/aralin5/multimodal.mp4",
        },
      },
    ],
  },
};

// src/data/quarter1Lesson1.ts

export const quarter1Lesson1 = {
  meta: {
    quarter: "Q1",
    aralin: "Aralin 1",
    title: "Kaligirang Pangkasaysayan ng Panitikan sa Panahon ng Katutubo",
    description:
      "Bago pa man dumating ang mga mananakop, mayaman na ang mga Pilipino sa panitikan—ipinapasa sa pamamagitan ng salita, awit, laro, at karanasan.",
    stats: {
      topics: 4,
      interactive: true
    }
  },
  PaunangSalita: {
    description: `Ang edukasyon ay patuloy na umuunlad kasabay ng pagbabago ng lipunan, teknolohiya, at pangangailangan ng mga mag-aaral. Sa bawat yugto ng pagbabagong ito, ang guro ay nananatiling sentral na salik sa paghubog ng kaalaman, kakayahan, at pagpapahalaga ng kabataan. Higit sa simpleng paghahatid ng aralin, ang pagtuturo ay isang sining at bokasyong nangangailangan ng malikhaing pag-iisip, patuloy na pagkatuto, at kakayahang umangkop sa iba’t ibang konteksto ng pagkatuto. Sa ganitong pananaw, mahalagang linangin at paunlarin ang mga pedagogiyang tumutugon sa dinamiko at inklusibong pangangailangan ng mga mag-aaral sa makabagong panahon.`
  },
  sections: [
    {
      id: "bugtong",
      title: "Bugtong",
      subtitle: "Palaisipang Panitikan",
      intro: `Ang bugtong ay isang maikling patulang palaisipan na naglalarawan 
      ng isang bagay, hayop, tao, o pangyayari sa pamamagitan ng pahiwatig o talinghaga.`,
      
        audioExamples: [
          {
            id: 1,
            label: "Bugtong 1",
            audioUrl: "/assets/audio/bugtong1.mp3"
          },
          {
            id: 2,
            label: "Bugtong 2",
            audioUrl: "/assets/audio/bugtong2.mp3"
          },
          {
            id: 3,
            label: "Bugtong 3",
            audioUrl: "/assets/audio/bugtong3.mp3"
          },
          {
            id: 4,
            label: "Bugtong 4",
            audioUrl: "/assets/audio/bugtong4.mp3"
          },
          {
            id: 5,
            label: "Bugtong 5",
            audioUrl: "/assets/audio/bugtong5.mp3"
          },
          {
            id: 6,
            label: "Bugtong 6",
            audioUrl: "/assets/audio/bugtong6.mp3"
          },
          {
            id: 7,
            label: "Bugtong 7",
            audioUrl: "/assets/audio/bugtong7.mp3"
          }

          
        ],
      bugtongCharacteristics: [
        {
          title: "Maikli at Patula",
          description: "Karaniwan ay may tugma at sukat upang madaling matandaan."
        },
        {
          title: "May Talinghaga",
          description: "Hindi tuwirang inilalarawan ang sagot."
        },
        {
          title: "Naglalarawan ng isang bagay o kaisipan",
          description: "Maaaring tao, hayop, bagay, o pangyayari."
        },
        {
          title: "Layunin",
          description:
            "Aliwin ang nakikinig at hamunin ang katalinuhan."
        }
      ],

      bugtongImportance: [
        {
          title: "Nagpapatalas ng isip at lohika",
          description: "sapagkat ang tamang sagot ay kailangan tuklasin at i-analisa.",
        },
        {
          title: "Nagpapalawak ng bokabularyo",
          description: "nakikilala ang mga salitang Filipino at kasanayan sa paggamit ng wika.",
        },
        {
          title: "Nagpapaunlad ng imahinasyon",
          description: "dahil ang mga pahiwatig ay hindi literal.",
        },
        {
          title: "Nagpapahalaga sa kulturang Pilipino",
          description: "aliwin ang nakikinig, hamunin ang katalinuhan.",
        },
        {
          title: "Naglilinang ng pakikipag-ugnayan",
          description: "karaniwang ginagamit sa laro, paligsahan, o pagtuturo.",
        } 

      ],

      examples: [
        {
          id: 1,
          label: "Halimbawa 1",
          text: `Hindi tao, hindi hayop,
          Ngunit marunong magsalita;
          Sa isang pindot mo lamang,
          Buong mundo'y makikita.`,
          answer: "Cellphone"
        },
        {
          id: 2,
          label: "Halimbawa 2",
          text: `May ulo ngunit walang buhok,
          May mukha ngunit walang mata;
          Araw-araw mo akong tinitingnan,
          Panahon ang aking wika.`,
          answer: "Kalendaryo"
        },
        {
          id: 3,
          label: "Halimbawa 3",
          text: `Maliit pa nang isilang,
          Sa paglaki’y nagiging salamin;
          Sa ulan ako’y nagiging kaibigan,
          Sa init ay nawawala rin.`,
          answer: "Tubig"
        },
        {
          id: 4,
          label: "Halimbawa 4",
          text: `Isang bagay na walang paa,
          Ngunit kayang maglakbay sa bansa;
          Sa pahina ako’y nakatira,
          Karununga’y aking dala`,
          answer: "Aklat"
        },
        {
          id: 5,
          label: "Halimbawa 5",
          text: `May bibig ngunit di nagsasalita,
          May tainga ngunit di nakaririnig;
          Sa tunog ako’y nabubuhay,
          Damdamin ang aking tinig`,
          answer: "Radyo"
        },
        {
          id: 6,
          label: "Halimbawa 6",
          text: `May mata ngunit hindi nakakakita,
          May ngipin ngunit hindi kumakain;
          Kapag ako’y ginamit nang tama,
          Buhok mo’y aking inaayos pa rin`,
          answer: "Suklay"
        },
        {
          id: 7,
          label: "Halimbawa 7",
          text: `Sa umaga ako’y mahaba,
          Sa tanghali ako’y maiksi;
          Sa hapon muli akong humahaba,
          Sino ako, hulaan mo’t isipin.
          `,
          answer: "Anino"
        },
      ]
    },

    {
      id: "palaisipan",
      title: "Pala-isipan",
      subtitle: "Lohikal na Hamon",
      intro:
        "Ang palaisipan ay isang uri ng patalinghagang tanong o sitwasyon na layuning hamunin ang isipan ng isang tao. Hindi tuwiran ang sagot; kailangan ng lohikal na pagiisip, obserbasyon, at malikhaing pag-aanalisa upang matuklasan ang kasagutan. Maaari itong maging bugtong, problema sa matematika, o kahit anong uri ng tanong na nangangailangan ng katalinuhan upang masagot.",

      palaisipanCharacteristics: [
        {
          title: "May halong palaisipan at paglalarawan",
          description: "kadalasan ay patula o may malikhaing pahayag.",
        },
        {
          id: 2,
          question:
            "Anong hayop ang may apat na paa kapag bata, dalawa kapag matanda?",
          answer: "Tao"
        },
        {
          id: 3,
          question: "Ano ang bagay na kahit puno pa ay hindi tumatanda?",
          answer: "Bato"
        }
      ]
    }
  ]
};

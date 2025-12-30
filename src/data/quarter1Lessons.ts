export interface LessonSection {
  title: string;
  content: string[];
}

export interface LessonData {
  reading: LessonSection[];
}

export const quarter1Lessons: Record<string, LessonData> = {
  "1": {
    reading: [
      {
        title: "Bugtong: Kahulugan",
        content: [
          "Ang bugtong ay isang maikling patulang palaisipan.",
          "Hindi tuwiran ang paglalarawan at nangangailangan ng lohikal na pag-iisip.",
          "Bahagi ito ng kulturang Pilipino at karaniwang ginagamit sa laro at pagtuturo.",
        ],
      },
      {
        title: "Pagsusuring Biswal",
        content: [
          "Komiks: Mas Malawak na Kahulugan at Kahalagahan",
          "Nagpapalawak ng bokabularyo.",
          "Nagpapaunlad ng malikhaing pag-iisip.",
        ],
      },
      {
        title: "Hudhud: Epiko ng Ifugao",
        content: [
          "Nagpapatalas ng isip at lohika.",
          "Nagpapalawak ng bokabularyo.",
          "Nagpapaunlad ng malikhaing pag-iisip.",
        ],
      },
    ],
  },

  "2": {
    reading: [
      {
        title: "Pagsusuring Biswal",
        content: [
          "Pagkilala sa mga elemento ng larawan.",
          "Pag-unawa sa mensahe ng biswal na teksto.",
        ],
      },
    ],
  },

  "3": {
    reading: [
      {
        title: "Hudhud",
        content: [
          "Isang epikong Ifugao na inaawit.",
          "Ipinapakita ang kultura at paniniwala ng Ifugao.",
        ],
      },
    ],
  },

  "4": {
    reading: [
      {
        title: "Tekstong Epkspositori",
        content: [
          "Pagkakatulad at pagkakaiba gamit ang malinaw na paliwanag at biswal.",
        ],
      },
    ],
  },
};

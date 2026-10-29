export type HouseType =
  | "1-floor"
  | "2-floor"
  | "3-floor"
  | "4-floor"
  | "luxury"
  | "tinshade";

export interface House {
  id: number;
  type: HouseType;
  folder: string;

  length: number;
  width: number;

  foundation: number;
  floor: number;

  cost: string;

  keywords: string[];
}

export const houses: House[] = [

  // =========================
  // 1 Story Houses
  // =========================

  {
    id: 1,
    type: "1-floor",
    folder: "1_story",

    length: 30,
    width: 25,

    foundation: 1,
    floor: 1,

    cost: "18 Lakh",

    keywords: [
      // English
      "1 floor","1 story","single story","modern house","small house","30x25","25x30","18 lakh","under 20 lakh",

      // Bangla
      "১ তলা","এক তলা","আধুনিক বাড়ি","ছোট বাড়ি","৩০x২৫","২৫x৩০","১৮ লাখ","২০ লাখের নিচে",

      // Hindi
      "1 मंजिल","एक मंजिला","आधुनिक घर","छोटा घर","30x25","25x30","18 लाख","20 लाख से कम",

      // Arabic
      "منزل طابق واحد","منزل حديث","منزل صغير","30x25","25x30","18 lakh","أقل من 20 lakh",

      // Spanish
      "casa de un piso","casa moderna","casa pequeña","30x25","25x30","18 lakh","menos de 20 lakh"
    ],
  },

  {
    id: 2,
    type: "1-floor",
    folder: "1_story",

    length: 35,
    width: 25,

    foundation: 2,
    floor: 1,

    cost: "20 Lakh",

    keywords: [
      // English
      "1 floor","1 story","modern house","35x30","30x35","20 lakh","under 25 lakh",

      // Bangla
      "১ তলা","এক তলা","আধুনিক বাড়ি","৩৫x৩০","৩০x৩৫","২০ লাখ","২৫ লাখের নিচে",

      // Hindi
      "1 मंजिल","एक मंजिला","आधुनिक घर","35x30","30x35","20 लाख","25 लाख से कम",

      // Arabic
      "منزل طابق واحد","منزل حديث","35x30","30x35","20 lakh","أقل من 25 lakh",

      // Spanish
      "casa de un piso","casa moderna","35x30","30x35","20 lakh","menos de 25 lakh"
    ],
  },

  // =========================
  // 2 Story Houses
  // =========================

  {
    id: 3,
    type: "2-floor",
    folder: "2_story",

    length: 32,
    width: 25,

    foundation: 2,
    floor: 2,

    cost: "38 Lakh",

    keywords: [
      // English
      "2 floor","2 story","duplex","modern house","30x30","38 lakh","under 40 lakh",

      // Bangla
      "২ তলা","দুই তলা","ডুপ্লেক্স","আধুনিক বাড়ি","৩০x৩০","৩৮ লাখ","৪০ লাখের নিচে",

      // Hindi
      "2 मंजिल","दो मंजिला","डुप्लेक्स","आधुनिक घर","30x30","38 लाख","40 लाख से कम",

      // Arabic
      "منزل طابقين","دوبلكس","30x30","38 lakh","أقل من 40 lakh",

      // Spanish
      "casa de dos pisos","dúplex","30x30","38 lakh","menos de 40 lakh"
    ],
  },

  // =========================
  // 3 Story Houses
  // =========================

  {
    id: 4,
    type: "3-floor",
    folder: "3_story",

    length: 40,
    width: 28,

    foundation: 3,
    floor: 3,

    cost: "55 Lakh",

    keywords: [
      // English
      "3 floor","3 story","triplex","modern house","30x30","55 lakh","under 60 lakh",

      // Bangla
      "৩ তলা","তিন তলা","ট্রিপ্লেক্স","আধুনিক বাড়ি","৩০x৩০","৫৫ লাখ","৬০ লাখের নিচে",

      // Hindi
      "3 मंजिल","तीन मंजिला","ट्रिप्लेक्स","आधुनिक घर","30x30","55 लाख","60 लाख से कम",

      // Arabic
      "منزل ثلاثة طوابق","30x30","55 lakh","أقل من 60 lakh",

      // Spanish
      "casa de tres pisos","triplex","30x30","55 lakh","menos de 60 lakh"
    ],
  },

  // =========================
  // 4 Story Houses
  // =========================

  {
    id: 5,
    type: "4-floor",
    folder: "4_story",

    length: 52,
    width: 15,

    foundation: 4,
    floor: 4,

    cost: "72 Lakh",

    keywords: [
      // English
      "4 floor","4 story","modern house","30x30","72 lakh","under 75 lakh",

      // Bangla
      "৪ তলা","চার তলা","আধুনিক বাড়ি","৩০x৩০","৭২ লাখ","৭৫ লাখের নিচে",

      // Hindi
      "4 मंजिल","चार मंजिला","आधुनिक घर","30x30","72 लाख","75 लाख से कम",

      // Arabic
      "منزل أربعة طوابق","30x30","72 lakh","أقل من 75 lakh",

      // Spanish
      "casa de cuatro pisos","30x30","72 lakh","menos de 75 lakh"
    ],
  },

  // =========================
  // Luxury Houses
  // =========================

  {
    id: 6,
    type: "luxury",
    folder: "Luxury",

    length: 40,
    width: 35,

    foundation: 3,
    floor: 3,

    cost: "1.25 Crore",

    keywords: [
      // English
      "luxury","luxury house","villa","premium","modern villa","42x50","50x42","1.25 crore","125 lakh",

      // Bangla
      "বিলাসবহুল","লাক্সারি","ভিলা","৪২x৫০","৫০x৪২","১.২৫ কোটি",

      // Hindi
      "लक्ज़री घर","विला","प्रीमियम","42x50","50x42","1.25 करोड़",

      // Arabic
      "منزل فاخر","فيلا","42x50","50x42","1.25 crore",

      // Spanish
      "casa de lujo","villa","42x50","50x42","1.25 crore"
    ],
  },

  // =========================
  // Tin Shade Houses
  // =========================

  {
    id: 7,
    type: "tinshade",
    folder: "Tinshade",

    length: 27,
    width: 17,

    foundation: 1,
    floor: 1,

    cost: "8 Lakh",

    keywords: [
      // English
      "tin shade","tin house","low budget","26x25","25x26","8 lakh","under 10 lakh",

      // Bangla
      "টিনশেড","টিনের বাড়ি","স্বল্প খরচ","২৬x২৫","২৫x২৬","৮ লাখ","১০ লাখের নিচে",

      // Hindi
      "टिन शेड","टिन का घर","कम बजट","26x25","25x26","8 लाख","10 लाख से कम",

      // Arabic
      "منزل صفيح","منزل منخفض التكلفة","26x25","25x26","8 lakh",

      // Spanish
      "casa de chapa","casa económica","26x25","25x26","8 lakh"
    ],
  },

];
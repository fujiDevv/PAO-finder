import { createI18n } from "vue-i18n";

const messages = {
  en: {
    banner: "Notice from the Law: PAO services are 100% FREE. Do not pay anyone.",
    nav: {
      search: "Search",
      qualification: "Qualification",
      subtitle: "Free Lawyer Guide",
    },
    hero: {
      title: "Do not let justice be denied due to lack of funds.",
      subtitle:
        "Quickly locate your regional Public Attorney's Office based on the official PAO directory data.",
    },
    locator: {
      step: "Step 1",
      title: "Find Your Office",
      subtitle: "Select or type the name of your province, city, or region below.",
      label: "Your Province / City",
      placeholder: "e.g., Caloocan, Iloilo, Abra...",
      try_these: "Try these:",
      reminder_title: "Visit Reminder:",
      reminder_body:
        "Please arrive before 9:00 AM to be included in the morning queue and case intake assignment by duty lawyers at your regional bureau.",
      loading: "Fetching the latest records...",
      no_result: "Type a province or city to reveal the corresponding Regional Center.",
      no_result_sub: "Our index covers all 17 regions of the Philippines.",
      satellites: "Regional Satellite Office(s)",
      attorney: "Head Attorney",
      address: "Address",
      contact: "Contact",
      email: "Email",
      maps_btn: "View on Google Maps",
      email_btn: "Email Office",
    },
    calculator: {
      step: "Step 2",
      title: "Qualification Assessment (Do I Qualify?)",
      subtitle:
        "Free legal services are for citizens who lack financial means according to limits set by law.",
      zone_label: "Resident Location Zone",
      zone_ncr: "Metro Manila (NCR)",
      zone_city: "Other Cities",
      zone_municipality: "Municipalities",
      gross_label: "Gross Monthly Income",
      deductions_label: "Statutory Deductions (SSS, Pag-IBIG, PhilHealth)",
      net_label: "Net Income Calculation:",
      net_sub: "Your Net Monthly Income",
      eligible_title: "You are Provisionally Qualified:",
      eligible_body: "Your net income is within the limit of ₱{limit} for your selected area.",
      eligible_proof:
        "Prepare a Barangay Certificate of Indigency or DSWD Case Assessment as proof when visiting the office.",
      ineligible_title: "Exceeded the Limit:",
      ineligible_body: "Your net monthly income is higher than the standard limit of ₱{limit}.",
      ineligible_appeal:
        "You may still approach the PAO to undergo a 'Merit Test' if your case requires immediate assistance or if you have heavy medical expenses proving your lack of financial capability.",
      disclaimer:
        "* This calculation is a guide only and remains subject to the final assessment of the interview officer at the PAO office.",
    },
    footer: {
      disclaimer:
        "Disclaimer: PAO Finder is an open community initiative and is NOT an official app of the Department of Justice (DOJ) or the Public Attorney's Office. The information is sourced from the public list of PAO offices.",
      source:
        "Source of data: Public Attorney's Office Central Directory Database • Compiled for offline-first speed and local lookup queries.",
      copyright: "© 2026 PAO Finder • Open Justice for Filipinos",
    },
  },
  tl: {
    banner:
      "Paalala mula sa Batas: Ang serbisyo ng PAO ay 100% LIBRE. Huwag magbayad sa kahit kanino.",
    nav: {
      search: "Maghanap",
      qualification: "Kwalipikasyon",
      subtitle: "Gabay sa Libreng Abugado",
    },
    hero: {
      title: "Huwag hayaang ipagkait ang katarungan dahil sa kawalan ng pera.",
      subtitle:
        "Mabilis na hanapin ang iyong regional Public Attorney's Office batay sa data mula sa opisyal na listahan ng mga opisina ng PAO.",
    },
    locator: {
      step: "Hakbang 1",
      title: "Alamin ang Iyong Opisina",
      subtitle: "Piliin o i-type ang pangalan ng iyong probinsya, lungsod, o rehiyon sa ibaba.",
      label: "Iyong Probinsya / Lungsod",
      placeholder: "Hal. Caloocan, Iloilo, Abra...",
      try_these: "Subukan ang mga ito:",
      reminder_title: "Paalala sa Pagbisita:",
      reminder_body:
        "Pumunta bago mag-9:00 AM para makasama sa morning queue at case intake assignment ng mga duty lawyer sa inyong regional bureau.",
      loading: "Kinukuha ang pinakahuling talaan...",
      no_result: "Mag-type ng probinsya o lungsod upang ilabas ang kaukulang Regional Center.",
      no_result_sub: "Ang aming index ay may coverage para sa lahat ng 17 rehiyon ng Pilipinas.",
      satellites: "Regional Satellite Office(s)",
      attorney: "Namumunong Abugado",
      address: "Address",
      contact: "Contact",
      email: "Email",
      maps_btn: "View on Google Maps",
      email_btn: "Email Office",
    },
    calculator: {
      step: "Hakbang 2",
      title: "Pagsusuri ng Kwalipikasyon (Do I Qualify?)",
      subtitle:
        "Ang libreng abugado ay para sa mga mamamayang kulang sa pananalapi ayon sa limitasyong itinakda ng batas.",
      zone_label: "Sona ng Lokasyon ng Iyong Tirahan",
      zone_ncr: "Metro Manila (NCR)",
      zone_city: "Ibang Lungsod (Other Cities)",
      zone_municipality: "Mga Munisipyo (Municipalities)",
      gross_label: "Kabuuang Kita Buwan-buwan (Gross Monthly Income)",
      deductions_label: "Mga Statutory Deductions (SSS, Pag-IBIG, PhilHealth)",
      net_label: "Kalkulasyon ng Net Income:",
      net_sub: "Iyong Net Monthly Income",
      eligible_title: "Kwalipikado Ka Provisional:",
      eligible_body:
        "Ang iyong malinis na kita ay pasok sa limitasyong ₱{limit} para sa iyong napiling lugar.",
      eligible_proof:
        "Maghanda ng Barangay Certificate of Indigency o DSWD Case Assessment bilang patunay kapag pumunta sa opisina.",
      ineligible_title: "Lumampas sa Batayan:",
      ineligible_body:
        "Mas mataas ang iyong malinis na kita kumpara sa standard limit na ₱{limit}.",
      ineligible_appeal:
        "Maaari ka pa ring lumapit sa PAO upang sumailalim sa isang 'Merit Test' kung ang iyong kaso ay nangangailangan ng agarang saklolo o kung may iba pang mabigat na gastusing medikal na makakapagpatunay ng kawalan ng sapat na kakayahan sa pananalapi.",
      disclaimer:
        "* Ang kalkulasyong ito ay gabay lamang at nakadepende pa rin sa pinal na pagsusuri ng interview officer sa opisina ng PAO.",
    },
    footer: {
      disclaimer:
        "Pahayag: Ang PAO Finder ay isang bukas na inisyatibo ng komunidad at HINDI opisyal na app ng Department of Justice (DOJ) o ng Public Attorney's Office. Ang impormasyon ay hango sa pampublikong listahan ng mga opisina ng PAO.",
      source:
        "Source of data: Public Attorney's Office Central Directory Database • Compiled for offline-first speed and local lookup queries.",
      copyright: "© 2026 PAO Finder • Bukas na Hustisya Para sa Pilipino",
    },
  },
};

export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: "tl", // Default language is Tagalog
  fallbackLocale: "en",
  messages,
});

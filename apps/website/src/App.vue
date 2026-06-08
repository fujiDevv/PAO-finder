<template>
  <div class="bg-slate-50 text-slate-900 font-sans min-h-screen antialiased">
    <!-- Proactive Legal Protection Alert Banner -->
    <div
      class="bg-blue-950 text-white text-center py-2.5 px-4 text-xs md:text-sm font-semibold shadow-sm flex items-center justify-center gap-2"
    >
      <Info class="w-4 h-4 text-blue-200 flex-shrink-0" />
      <span>{{ $t("banner") }}</span>
    </div>

    <!-- Application Top Navbar -->
    <nav class="bg-blue-900 text-white border-b border-blue-950 sticky top-0 z-50 shadow-md">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div
            class="bg-white text-blue-900 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
          >
            <Scale class="w-5 h-5" />
          </div>
          <div>
            <span class="font-bold text-xl tracking-tight block leading-tight">PAO Finder</span>
            <span class="block text-[9px] uppercase font-medium tracking-wider text-blue-200">{{
              $t("nav.subtitle")
            }}</span>
          </div>
        </div>

        <div class="flex items-center space-x-6">
          <div class="flex space-x-4 text-sm font-medium">
            <a href="#locator" class="text-blue-100 hover:text-white transition-colors">{{
              $t("nav.search")
            }}</a>
            <a href="#calculator" class="text-blue-100 hover:text-white transition-colors">{{
              $t("nav.qualification")
            }}</a>
          </div>

          <!-- Language Selector -->
          <div
            class="border-l border-blue-800 pl-4 flex items-center space-x-1 text-xs font-semibold"
          >
            <button
              @click="setLocale('tl')"
              class="px-2.5 py-1 rounded transition-colors"
              :class="
                locale === 'tl'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-blue-200 hover:text-white hover:bg-blue-800'
              "
            >
              Tagalog
            </button>
            <button
              @click="setLocale('en')"
              class="px-2.5 py-1 rounded transition-colors"
              :class="
                locale === 'en'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-blue-200 hover:text-white hover:bg-blue-800'
              "
            >
              English
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Dynamic Content Wrapper -->
    <main class="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <!-- HERO SUMMARY -->
      <header class="text-center max-w-2xl mx-auto space-y-4 animate-fade-in">
        <h1 class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
          {{ $t("hero.title") }}
        </h1>
        <p class="text-slate-600 text-sm md:text-base max-w-lg mx-auto">
          {{ $t("hero.subtitle") }}
        </p>
      </header>

      <!-- SECTION 1: INTERACTIVE GEOGRAPHIC SEARCH LOCATOR -->
      <section
        id="locator"
        class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
      >
        <div class="flex items-center gap-3 mb-2">
          <span
            class="bg-blue-100 text-blue-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
          >
            {{ $t("locator.step") }}
          </span>
          <h2 class="text-xl font-bold text-slate-900">{{ $t("locator.title") }}</h2>
        </div>
        <p class="text-xs text-slate-500 mb-6">{{ $t("locator.subtitle") }}</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Selection Configuration Panel -->
          <div class="space-y-5">
            <div class="relative">
              <label class="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                {{ $t("locator.label") }}
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="searchQuery"
                  @input="handleSearchInput"
                  @focus="handleSearchInput"
                  :placeholder="$t('locator.placeholder')"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 focus:bg-white transition-all shadow-inner"
                />
                <Search
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none select-none"
                />
              </div>

              <!-- Autocomplete suggestions dropdown -->
              <div
                v-if="suggestions.length > 0"
                class="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-40 custom-scrollbar animate-fade-in"
              >
                <ul>
                  <li
                    v-for="(sug, index) in suggestions"
                    :key="index"
                    @click="selectSuggestion(sug)"
                    class="px-4 py-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors"
                  >
                    <div class="flex items-center space-x-2.5">
                      <Landmark
                        v-if="sug.type === 'region'"
                        class="w-4 h-4 text-slate-400 flex-shrink-0"
                      />
                      <MapPin v-else class="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span class="text-sm font-medium text-slate-700">{{ sug.name }}</span>
                    </div>
                    <span
                      class="text-[9px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider"
                    >
                      {{ sug.office.region.replace(" REGION", "").replace("REGION", "") }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Quick click badges -->
            <div>
              <span
                class="block text-[10px] font-medium text-slate-400 uppercase tracking-wide mb-2"
              >
                {{ $t("locator.try_these") }}
              </span>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="city in ['Caloocan', 'Cebu', 'Davao', 'Iloilo', 'Baguio']"
                  :key="city"
                  @click="quickSearch(city)"
                  class="bg-slate-100 hover:bg-blue-50 hover:text-blue-900 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 transition-colors"
                >
                  {{ city }}
                </button>
              </div>
            </div>

            <div
              class="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 leading-relaxed"
            >
              <div class="font-bold flex items-center gap-1.5 mb-1">
                <Info class="w-4 h-4 text-blue-800 flex-shrink-0" />
                <span>{{ $t("locator.reminder_title") }}</span>
              </div>
              {{ $t("locator.reminder_body") }}
            </div>
          </div>

          <!-- Active Output Target Area -->
          <div class="md:col-span-2">
            <div
              v-if="loading"
              class="h-full flex flex-col justify-center items-center py-12 text-blue-900 font-medium text-sm animate-pulse"
            >
              <Scale class="w-8 h-8 mb-2" />
              {{ $t("locator.loading") }}
            </div>

            <div
              v-else-if="!officeResult"
              class="h-full flex flex-col justify-center items-center text-center p-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 bg-slate-50/50"
            >
              <Search class="w-8 h-8 mb-2" />
              <p class="text-sm font-medium text-slate-600">{{ $t("locator.no_result") }}</p>
              <p class="text-xs text-slate-400 mt-1 max-w-sm">{{ $t("locator.no_result_sub") }}</p>
            </div>

            <!-- Dynamic UI Data Card mapped from the CSV File structure -->
            <div
              v-else
              class="border border-slate-200 rounded-xl p-6 bg-white relative overflow-hidden shadow-sm animate-fade-in"
            >
              <div
                class="absolute top-0 right-0 bg-blue-900 text-white text-[9px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-bl-lg"
              >
                {{ officeResult.region }}
              </div>

              <div class="mb-5">
                <p class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  {{ $t("locator.attorney") }}
                </p>
                <h3 class="text-lg font-bold text-slate-900 mt-0.5">{{ officeResult.attorney }}</h3>
              </div>

              <!-- Main Regional Office details -->
              <div class="space-y-3.5 text-sm border-t border-slate-100 pt-4">
                <div class="flex items-start gap-2.5">
                  <MapPin class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span class="text-slate-700"
                    ><strong>{{ $t("locator.address") }}:</strong> {{ officeResult.address }}</span
                  >
                </div>
                <div class="flex items-start gap-2.5">
                  <Phone class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span class="text-slate-700"
                    ><strong>{{ $t("locator.contact") }}:</strong> {{ officeResult.contact }}</span
                  >
                </div>
                <div class="flex items-start gap-2.5" v-if="officeResult.email">
                  <Mail class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <span class="text-slate-700"
                    ><strong>{{ $t("locator.email") }}:</strong>
                    <a
                      :href="'mailto:' + officeResult.email"
                      class="text-blue-900 hover:underline font-semibold"
                      >{{ officeResult.email }}</a
                    ></span
                  >
                </div>
              </div>

              <!-- Satellite Offices if present -->
              <div
                v-if="officeResult.satellites && officeResult.satellites.length > 0"
                class="mt-6 border-t border-slate-100 pt-5 space-y-4"
              >
                <h4
                  class="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5"
                >
                  <Landmark class="w-3.5 h-3.5 text-slate-400" />
                  <span>{{ $t("locator.satellites") }}</span>
                </h4>

                <div
                  v-for="(sat, satIdx) in officeResult.satellites"
                  :key="satIdx"
                  class="bg-slate-50 border border-slate-200/60 rounded-lg p-4 space-y-2.5 shadow-inner"
                >
                  <div class="flex items-start gap-2 text-xs">
                    <MapPin class="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span class="text-slate-700">{{ sat.address }}</span>
                  </div>
                  <div class="flex items-start gap-2 text-xs">
                    <Phone class="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span class="text-slate-700"
                      ><strong>{{ $t("locator.contact") }}:</strong> {{ sat.contact }}</span
                    >
                  </div>
                  <div class="flex items-start gap-2 text-xs" v-if="sat.email">
                    <Mail class="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span class="text-slate-700"
                      ><strong>{{ $t("locator.email") }}:</strong>
                      <a
                        :href="'mailto:' + sat.email"
                        class="text-blue-900 hover:underline font-semibold"
                        >{{ sat.email }}</a
                      ></span
                    >
                  </div>
                </div>
              </div>

              <!-- Interactive Maps Action -->
              <div class="mt-6 flex flex-wrap gap-2.5 border-t border-slate-100 pt-4">
                <a
                  :href="
                    'https://www.google.com/maps/search/?api=1&query=' +
                    encodeURIComponent('Public Attorney Office ' + officeResult.address)
                  "
                  target="_blank"
                  class="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <Map class="w-3.5 h-3.5" />
                  <span>{{ $t("locator.maps_btn") }}</span>
                </a>
                <a
                  v-if="officeResult.email"
                  :href="'mailto:' + officeResult.email"
                  class="flex items-center gap-2 bg-white border border-blue-200 text-blue-900 hover:bg-blue-50 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  <Mail class="w-3.5 h-3.5" />
                  <span>{{ $t("locator.email_btn") }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: DYNAMIC INDIGENCY INCOME ASSESSMENT LIMIT CHECKER -->
      <section
        id="calculator"
        class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8"
      >
        <div class="flex items-center gap-3 mb-2">
          <span
            class="bg-blue-100 text-blue-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
          >
            {{ $t("calculator.step") }}
          </span>
          <h2 class="text-xl font-bold text-slate-900">{{ $t("calculator.title") }}</h2>
        </div>
        <p class="text-xs text-slate-500 mb-6">{{ $t("calculator.subtitle") }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Parameter Controller Form fields -->
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-2">
                {{ $t("calculator.zone_label") }}
              </label>
              <select
                v-model="locationType"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all shadow-inner font-medium"
              >
                <option value="ncr">{{ $t("calculator.zone_ncr") }}</option>
                <option value="city">{{ $t("calculator.zone_city") }}</option>
                <option value="municipality">{{ $t("calculator.zone_municipality") }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-2">
                {{ $t("calculator.gross_label") }}
              </label>
              <div class="relative">
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm"
                  >₱</span
                >
                <input
                  type="number"
                  v-model.number="grossIncome"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all shadow-inner"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 uppercase mb-2">
                {{ $t("calculator.deductions_label") }}
              </label>
              <div class="relative">
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm"
                  >₱</span
                >
                <input
                  type="number"
                  v-model.number="deductions"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all shadow-inner"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <!-- Logic Computation Status Box Display -->
          <div
            class="flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 shadow-sm"
            :class="
              isEligible
                ? 'bg-blue-50 border-blue-200 text-blue-900'
                : 'bg-red-50 border-red-200 text-red-700'
            "
          >
            <div>
              <h4 class="font-bold text-xs uppercase tracking-wide opacity-75">
                {{ $t("calculator.net_label") }}
              </h4>
              <p class="text-3xl font-bold mt-1 tracking-tight">
                ₱{{ calculatedNet.toLocaleString() }}
              </p>
              <p class="text-[10px] uppercase font-bold tracking-wider opacity-60 mt-1">
                {{ $t("calculator.net_sub") }}
              </p>

              <div class="mt-6 text-sm leading-relaxed">
                <div v-if="isEligible" class="space-y-2">
                  <p class="font-bold text-base flex items-center gap-1.5 text-blue-900">
                    <CheckCircle2 class="w-4 h-4 text-blue-800 flex-shrink-0" />
                    <span>{{ $t("calculator.eligible_title") }}</span>
                  </p>
                  <p class="text-xs">
                    {{ $t("calculator.eligible_body", { limit: currentLimit.toLocaleString() }) }}
                  </p>
                  <p class="text-[11px] opacity-80 pt-2">{{ $t("calculator.eligible_proof") }}</p>
                </div>
                <div v-else class="space-y-2">
                  <p class="font-bold text-base flex items-center gap-1.5 text-red-800">
                    <AlertCircle class="w-4 h-4 text-red-700 flex-shrink-0" />
                    <span>{{ $t("calculator.ineligible_title") }}</span>
                  </p>
                  <p class="text-xs">
                    {{ $t("calculator.ineligible_body", { limit: currentLimit.toLocaleString() }) }}
                  </p>
                  <p class="text-[11px] opacity-80 pt-2">
                    {{ $t("calculator.ineligible_appeal") }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="text-[10px] opacity-60 border-t pt-4 mt-6"
              :class="isEligible ? 'border-blue-200' : 'border-red-200'"
            >
              {{ $t("calculator.disclaimer") }}
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Structural App Footer Statement -->
    <footer
      class="bg-blue-950 text-slate-300 py-12 px-4 mt-20 border-t border-blue-900 text-center space-y-4"
    >
      <div class="max-w-2xl mx-auto space-y-2.5">
        <p class="text-xs leading-relaxed">
          {{ $t("footer.disclaimer") }}
        </p>
        <p class="text-[10px] text-slate-400 leading-relaxed">
          {{ $t("footer.source") }}
        </p>
      </div>
      <div
        class="text-[11px] text-blue-200 font-medium tracking-wider uppercase pt-4 border-t border-blue-900 max-w-xs mx-auto"
      >
        {{ $t("footer.copyright") }}
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import {
  Scale,
  Search,
  MapPin,
  Phone,
  Mail,
  Info,
  Map,
  Landmark,
  CheckCircle2,
  AlertCircle,
} from "lucide-vue-next";
import paoData from "./assets/pao-db.json";

// --- INTERNATIONALIZATION LOGIC ---
const { locale } = useI18n();

function setLocale(lang) {
  locale.value = lang;
}

// --- DIRECTORY SEARCH LOGIC ---
const searchQuery = ref("");
const officeResult = ref(null);
const suggestions = ref([]);
const loading = ref(false);
let debounceTimeout = null;

// Replace this variable with your actual live Wrangler Edge Workers deployment route URL
// If empty, falls back to direct, zero-latency local JSON lookup queries
const WORKER_API_ENDPOINT = "";

function quickSearch(city) {
  searchQuery.value = city;
  handleSearchInput();
}

function selectSuggestion(sug) {
  searchQuery.value = sug.name;
  officeResult.value = sug.office;
  suggestions.value = [];
}

function handleSearchInput() {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) {
    suggestions.value = [];
    officeResult.value = null;
    return;
  }

  // Generate suggestions based on matching coverage or region names
  const matches = [];
  for (const office of paoData) {
    // Check regional coverage list
    for (const cov of office.coverage) {
      if (cov.includes(q)) {
        matches.push({
          name: cov
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          type: "location",
          office,
        });
      }
    }
    // Check region name
    if (office.region.toLowerCase().includes(q)) {
      matches.push({
        name: office.region,
        type: "region",
        office,
      });
    }
  }

  // Deduplicate matches based on name and office ID
  const seen = new Set();
  const deduped = [];
  for (const match of matches) {
    const key = `${match.name}-${match.office.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(match);
    }
  }
  suggestions.value = deduped.slice(0, 6);

  // Trigger Debounced worker API or direct local fallback
  triggerSearchDebounced();
}

function triggerSearchDebounced() {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    const q = searchQuery.value.trim().toLowerCase();
    if (!q) return;

    // Direct local search
    const localMatch = paoData.find(
      (item) => item.coverage.includes(q) || item.region.toLowerCase().includes(q),
    );

    if (!WORKER_API_ENDPOINT) {
      // Offline fallback / local dev search
      if (localMatch) {
        officeResult.value = localMatch;
      }
      return;
    }

    // Network search via Edge Workers API
    loading.value = true;
    try {
      const res = await fetch(`${WORKER_API_ENDPOINT}?q=${encodeURIComponent(q)}`);
      if (res.status === 200) {
        const json = await res.json();
        officeResult.value = json.success ? json.data : null;
      } else {
        // Fallback to local match if server responds with error or 204
        officeResult.value = localMatch || null;
      }
    } catch (err) {
      console.warn("Worker network dispatch failed. Falling back to local data:", err);
      officeResult.value = localMatch || null;
    } finally {
      loading.value = false;
    }
  }, 300); // 300ms debounce
}

// Close suggestions on outside click
onMounted(() => {
  window.addEventListener("click", (e) => {
    const isInput = e.target.closest("input");
    const isDropdown = e.target.closest(".absolute");
    if (!isInput && !isDropdown) {
      suggestions.value = [];
    }
  });
});

// --- INCOME EVALUATOR CALCULATOR LOGIC ---
const locationType = ref("municipality");
const grossIncome = ref(null);
const deductions = ref(null);

const thresholds = {
  ncr: 24000,
  city: 22000,
  municipality: 20000,
};

const currentLimit = computed(() => thresholds[locationType.value]);
const calculatedNet = computed(() => {
  const computedNet = (grossIncome.value || 0) - (deductions.value || 0);
  return computedNet > 0 ? computedNet : 0;
});
const isEligible = computed(() => calculatedNet.value <= currentLimit.value);
</script>

<style>
/* Custom scoped transitions */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>

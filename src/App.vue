<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import RepertoireMarquee from './components/RepertoireMarquee.vue'
import VideoSection from './components/VideoSection.vue'
import ConductorSection from './components/ConductorSection.vue'
import AgendaSection from './components/AgendaSection.vue'
import BookingSection from './components/BookingSection.vue'
import JoinSection from './components/JoinSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#inhoud">Naar de inhoud</a>
  <SiteHeader />
  <main id="inhoud">
    <HeroSection />
    <AboutSection />
    <RepertoireMarquee />
    <VideoSection />
    <ConductorSection />
    <AgendaSection />
    <BookingSection />
    <JoinSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>

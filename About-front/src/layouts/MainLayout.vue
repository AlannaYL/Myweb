
<template>
  <div>
    <q-layout view="lHh lpr lFf"  class="shadow-2 rounded-borders">
      <q-header reveal>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <q-toolbar-title>Happy</q-toolbar-title>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

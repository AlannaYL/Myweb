
<template lang="pug">
div
  q-layout.shadow-2(view='hHr lpR fFr' rounded-borders)
    q-header.bg-white.text-black(reveal)
      q-toolbar
        q-avatar
        q-toolbar-title 快樂100%
        .q-gutter-x-md
          q-btn(icon='search' push round color="white" text-color="black")
          q-btn(icon='face' push round color="white" text-color="black")
          q-btn(icon='menu' push round color="white" text-color="black")
    q-page-container
      q-page
        router-view
</template>

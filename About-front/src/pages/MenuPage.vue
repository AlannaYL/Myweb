<template lang="pug">
#Menu
  .q-toolbar.row.items-center.justify-end
    q-btn(icon='fa-solid fa-xmark' to="/" flat round color="pink" text-color="black")
  #Navigation
    #MenuLogo.col-3
      h1 挖系LOGO
    #MenuList.col-8
      .list
        .item
          li
            .space
            a(href="#/") 首頁
        .item
          li
            a(href="#/About") 關於
        .item
          li
            a(href="#/Exhibitions") 展覽
        .item
          li
            a(href="#/Member") 會員
</template>

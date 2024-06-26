<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      show-if-above
      v-model="drawer"
      side="left"
      bordered
      elevated
      class="custom-drawer"
    >
      <q-list link class="bg-soft-pink text-brown">
        <q-item v-for="(url, index) in tugasLinks" :key="'tugas' + (index + 1)">
          <q-icon name="splitscreen" class="q-lg bg-soft-pink" />
          <router-link
            to="/"
            exact-active-class="active"
            class="q-item-label text-brown"
            @click.native="navigateTo(url)"
          >
            Tugas {{ index + 1 }}
          </router-link>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-header elevated class="bg-soft-pink text-brown">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            @click="drawer = !drawer"
            icon="menu"
          />
        </q-toolbar>
      </q-header>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      tugasLinks: [
        'https://project-cv-inola.netlify.app/',
        'https://tugas2-inolaafdholiana-4b-pbk.netlify.app/',
        'https://inolaafdholiana-tugas3-prak.netlify.app/',
        'https://inolaafdholiana-223510839-4b-t4-pkpbk.netlify.app/',
        'https://inolaafdholiana-223510839-4b-tugas5.netlify.app/',
        'https://inolaafdholiana-tugas6.netlify.app/',
        'https://inolaafdholiana-223510839-t7-prak.netlify.app/'
      ]
    };
  },
  methods: {
    handleDrawerItemClick() {
      this.drawer = false;
    },
    navigateTo(url) {
      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
.bg-soft-pink {
  background-color: rgba(255, 192, 203, 0.3);;
}

.text-brown {
  color: brown;
}

.custom-drawer {
  width: 250px;
  background-color: #263238;
  color: black;
}

.custom-drawer .q-list {
  height: 150vh;
}

.custom-drawer .q-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: black;
}

.custom-drawer .q-item .q-icon {
  font-size: 16px;
}

.custom-drawer .q-item:hover {
  font-weight: bold;
}

.custom-drawer .q-item.active {
  font-weight: bold;
}

.custom-drawer .q-item-label {
  margin-left: 12px;
  color: black;
  text-decoration: none;
  font-size: 14px;
}

.custom-drawer .q-item-label.active {
  font-weight: bold;
}

.custom-drawer .q-item-label:hover {
  font-weight: bold;
}

.q-header {
  background-color: rgba(255, 192, 203, 0.3);
  color: #ffffff;
}
</style>
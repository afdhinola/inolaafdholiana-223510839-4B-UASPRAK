<template>
    <div>
      <h1>Task {{ $route.params.id }}</h1>
      <iframe :src="taskUrl" width="100%" height="600"></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TaskPage',
    computed: {
      taskUrl() {
        const urls = [
          'https://project-cv-inola.netlify.app/',
          'https://tugas2-inolaafdholiana-4b-pbk.netlify.app/',
          'https://inolaafdholiana-tugas3-prak.netlify.app/',
          'https://inolaafdholiana-223510839-4b-t4-pkpbk.netlify.app/',
          'https://inolaafdholiana-223510839-4b-tugas5.netlify.app/',
          'https://inolaafdholiana-tugas6.netlify.app/',
          'https://inolaafdholiana-223510839-t7-prak.netlify.app/',
          // Tambahkan URL tugas lainnya di sini
        ];
        return urls[this.$route.params.id - 1];
      }
    }
  };
  </script>
  
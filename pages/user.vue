<template>
  <div>
    {{user}}
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/current_user'
    })
  },
  mounted() {
    this.getUser();
    this.listenToEvent()
  },
  methods: {
    ...mapActions({
      getUser: 'auth/getUser'
    }),
    listenToEvent() {
      this.$nuxt.$on('fetch-user', () => {
        this.getUser();
      })
    }
  }
}
</script>
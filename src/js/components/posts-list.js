Vue.component('rl-posts-list', {
  props: ['posts', 'name', 'domain'],
  data: function() {
    return {
      timer: null,
      busy: true
    }
  },
  created: function(e) {
    this.startTimer();
  },
  computed: {
    updated: function() {
      return new Date().getTime()/1000|0;
    }
  },
  watch: {
    // Reset timer when sub is changed
    name: function(val) {
      // Don't stop it before it starts!
      if (this.timer) {
        this.stopTimer();
      }

      // Do not re-start timer without active sub (happens when searching after previously selecting a sub)
      if (val) {
        this.startTimer();
      }
    },
    posts: function(val) {
      this.busy = !(val && val.length > 0);
    }
  },
  methods: {
    startTimer: function() {
      this.timer = setInterval(this.refresh, 60000);
    },

    stopTimer: function() {
      clearInterval(this.timer);
    },

    refresh: function() {
      this.busy = true;
      this.$emit('refresh-posts', this.name);
    }
  },
  template: `<div class="panel panel-right">
              <h4 v-if="name">r/{{name}} <i v-if="busy" class="fa fa-spinner fa-pulse fa-fw"></i></h4>
              <rl-date v-if="posts" :utc="updated" :txt="'Updated at'" :cssClass="'update-time'"></rl-date>
              <ul class="posts-list">
                <li v-for="post in posts">
                  <rl-post :post="post.data" :domain="domain"></rl-post>
                </li>
              </ul>
            </div>`
});

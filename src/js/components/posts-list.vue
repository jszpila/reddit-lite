import Vue from 'vue';

export default Vue.component('rl-posts-list', {
  props: ['activeSub', 'domain', 'searching'],
  data: function() {
    return {
      timer: null,
      busy: false,
      posts: null,
      showError: false
    }
  },

  created: function() {
    if (this.activeSub) {
      this.getPosts();
    }
  },

  watch: {
    activeSub: function(val) {
      if (this.activeSub) {
        this.getPosts();
      }
    },

    searching: function(val) {
      this.stopTimer();
      this.posts = null;
    }
  },

  methods: {
    // Get top 25 posts from specified sub
    getPosts: function() {
      var self = this;

      this.showError = false;
      this.stopTimer();

      fetch(this.domain + '/' + this.activeSub.display_name_prefixed + '.json').then(function(res) {
        self.busy = false;

        if (res.ok) {
          return res.json();
        }

        throw new Error('Fetch failed: posts');
      }).then(function(json) {
        if (json.error) {
          this.setErrorState();
          console.error(json.error, json.message);
        } else {
          self.posts = json.data.children;
          self.startTimer();
        }
      }).catch(function(err) {
        self.setErrorState();
      });
    },

    startTimer: function() {
      this.busy = false;
      this.timer = setInterval(this.getPosts, 60000);
    },

    stopTimer: function() {
      this.busy = true;
      clearInterval(this.timer);
    },

    getTimeStamp: function() {
      return new Date().getTime()/1000|0;
    },

    setErrorState: function() {
      this.posts = null;
      this.busy = false;
      this.showError = true;
    }
  },

  template: `<section id="Content" class="posts-list-container">
              <h4 v-if="activeSub">{{activeSub.display_name_prefixed}} <i v-if="busy" class="fa fa-refresh fa-spin"></i></h4>

              <rl-utc-date-time v-if="posts && activeSub" :utc="getTimeStamp()" :txt="'Updated at'" :cssClass="'update-time txt-muted txt-smol'"></rl-utc-date-time>

              <ul class="posts-list">
                <li class="post" v-for="post in posts">
                  <rl-post :post="post.data" :domain="domain"></rl-post>
                </li>
              </ul>

              <div v-if="showError" class="error">
                <i class="fa fa-frown-o fa-4x"></i>
                <p><strong>Well, that's embarassing.</strong></p>
              </div>
            </section>`
});

import Vue from 'vue';

export default Vue.component('rl-sub-sidebar', {
  props: ['activeSub', 'domain'],
  data: function() {
    return {
      content:   null,
      showError: false,
      hasContent: false
    }
  },

  created: function(cb) {
    if (window.location.hash) {
      var self = this;

      fetch(this.domain + '/' + this.activeSub.display_name_prefixed + '/about.json').then(function(res) {
        self.busy = false;

        if (res.ok) {
          return res.json();
        }

        throw new Error('Fetch failed: sub description');
      }).then(function(json) {
        if (json.error) {
          self.setErrorState();
          console.error(json.error, json.message);
        } else {
          self.hasContent = !(json.data.descritpion_html == null);
          self.content = self.decodeHTML(json.data.description_html);
        }

        if (cb) {
          cb();
        }
      }).catch(function(err) {
        self.setErrorState();
        if (cb) {
          cb();
        }
      });
    }
  },

  watch: {
    activeSub: function(val) {
      if (val && val.description_html) {
        this.content = val.description_html;
        this.hasContent = true;
      } else {
        this.content = '';
        this.hasContent = false;
      }
    }
  },

  methods: {
    decodeHTML: function(str) {
      // TODO: find a non-stupid way to do this
      var txt = document.createElement('textarea');
      txt.innerHTML = str;
      return txt.value;
    },

    getContent: function() {
      this.showError = false;

      if (this.activeSub && this.activeSub.description_html) {
        this.content = this.activeSub.description_html;
      }

      return this.decodeHTML(this.content);
    },

    setErrorState: function() {
      this.showError = true;
    }
  },

  template: `<aside id="Description" class="side-column sub-description-container" v-bind:class="{'hasContent': hasContent}">
              <div class="sub-description" v-if="content && !showError" v-html="getContent()"></div>

              <div v-if="showError" class="error">
                <i class="fa fa-frown-o fa-4x"></i>
                <p><strong>Well, that's embarassing.</strong></p>
              </div>
            </aside>`
});

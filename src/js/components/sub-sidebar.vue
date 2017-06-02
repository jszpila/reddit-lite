import Vue from 'vue';

export default Vue.component('rl-sub-sidebar', {
  props: ['activeSub'],
  methods: {
    decodeHTML: function(str) {
      // TODO: find a non-stupid way to do this
      var txt = document.createElement('textarea');
      txt.innerHTML = str;
      return txt.value;
    }
  },

  template: `<aside id="Description" class="side-column sub-description-container">
              <div class="sub-description" v-if="activeSub && activeSub.description_html" v-html="decodeHTML(activeSub.description_html)"></div>
            </aside>`
});

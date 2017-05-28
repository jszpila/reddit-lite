Vue.component('rl-sub-sidebar', {
  props: ['activeSub'],
  methods: {
    decodeHTML: function(str) {
      // TODO: find a non-stupid way to do this
      var txt = document.createElement("textarea");
      txt.innerHTML = str;
      return txt.value;
    }
  },

  template: `<aside v-if="activeSub" v-html="decodeHTML(activeSub.description_html)" class="sub-sidebar"></aside>`
});

import Vue from 'vue';

export default Vue.component('rl-utc-date-time', {
    props: ['utc', 'txt', 'cssClass'],
    methods: {
      formatDate: function(utcStr) {
        var d        = new Date(0),
            h        = null,
            m        = null,
            meridian = 'am';

        d.setUTCSeconds(utcStr);
        h = d.getHours();
        m = d.getMinutes();

        if (h > 12) {
          h -= 12;
          meridian = 'pm';
        } else if (h === 0) {
          h = 12;
        }

        if (m < 10) {
          m = "0" + m.toString();
        }

        return ((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + ', ' + h + ':' + m + meridian);
      }
    },
    template: `<span v-bind:class="cssClass">{{txt}} {{formatDate(utc)}}</span>`
});

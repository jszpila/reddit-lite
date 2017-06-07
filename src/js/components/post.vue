export default Vue.component('rl-post', {
  props: ['post', 'domain'],
  methods: {
    makeAuthorUrl: function(author) {
      return this.domain + 'user/' + author;
    }
  },
  template: `<div class="container">
              <a :href="post.url" class="title-link" target="_blank">{{post.title}}</a>
                <div class="meta txt-muted txt-smol">
                  Submitted by <a :href="makeAuthorUrl(post.author)" class="author-link" target="_blank">{{post.author}}</a>
                  at <rl-utc-date-time :utc="post.created_utc" :cssClass="'time-stamp'"></rl-utc-date-time>
                  <a :href="post.url" class="comments-link" target="_blank">{{post.num_comments}} comments</a>
                  {{post.domain}}
                </div>
              </div>`
});

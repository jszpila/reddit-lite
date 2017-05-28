Vue.component('rl-post', {
  props: ['post', 'domain'],
  methods: {
    makeTitleUrl: function(permalink) {
      return this.domain + permalink;
    },

    makeAuthorUrl: function(author) {
      return this.domain + '/user/' + author;
    }
  },
  template: `<div class="post-container">
              <a :href="makeTitleUrl(post.permalink)" class="title-link" target="_blank">{{post.title}}</a>
                <div class="post-meta">
                  Submitted by <a :href="makeAuthorUrl(post.author)" class="author-link" target="_blank">{{post.author}}</a>
                  at <rl-date :utc="post.created_utc" :cssClass="'time-stamp'"></rl-date>
                  <a :href="post.url" class="comments-link" target="_blank">{{post.num_comments}} comments</a>
                </div>
              </div>`
});

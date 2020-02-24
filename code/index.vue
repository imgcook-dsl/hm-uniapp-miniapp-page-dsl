<template>
  <div class="hm-news-card">
    <div class="container">
      <div class="box">
        <img class="img" :src="img" /> <span class="title">{{ title }}</span>
        <div class="submain">
          <span class="author">{{ author }}</span>
          <span class="date">{{ date }}</span>
        </div>
        <span class="summary">{{ summary }}</span>
        <div class="row_2" />
        <div class="ft">
          <span class="comments">{{ comments }}</span>
          <span class="likes">{{ likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img:
        'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/47f5f060557b11eabde03dd163252f26.png',
      title: 'Quick Brown Fox Jumps Over',
      author: 'TRAVELLING',
      date: '16 MAY 2016',
      summary:
        'Synth polaroid bitters chillwave pickled. Vegandisrupt tousled, Portland keffiyeh aesthetic food',
      comments: '14 COMMENTS',
      likes: '254 LIKES'
    };
  },
  methods: {}
};
</script>
<style>
@import './index.response.css';
</style>

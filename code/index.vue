<template>
  <div class="box">
    <div class="bd">
      <img class="layer" :src="constants.image1" />
      <div class="bgWrap">
        <img class="bg" :src="constants.image2" />
        <div class="group">
          <div class="container">
            <img class="icon" :src="constants.image3" />
            <span class="sketch">Sketch</span>
            <img class="icon_2" :src="constants.image4" />
            <span class="text">9:41 AM</span>
          </div>
          <div class="block">
            <span class="percent">100%</span>
            <img class="icon_3" :src="constants.image5" />
          </div>
        </div>
        <div class="block_2">
          <img class="icon_4" :src="constants.image6" />
          <span class="dashboard">Dashboard</span>
          <div class="group_2">
            <img class="icon_5" :src="constants.image7" />
            <img class="dot" :src="constants.image8" />
          </div>
          <div class="container_2">
            <img class="icon_6" :src="constants.image9" />
            <img class="dot_2" :src="constants.image10" />
          </div>
        </div>
        <div class="group_3">
          <div class="block_3">
            <div class="outer">
              <div class="statusWrap"><span class="status">Status</span></div>
              <span class="summary">Summary</span>
            </div>
            <div class="colorDiv" />
            <span class="announcement">Announcement</span>
          </div>
        </div>
        <div class="block_4">
          <div class="group_4">
            <img class="icon_7" :src="constants.image11" />
          </div>
          <span class="bellamsystraatStreet">Bellamsystraat Street, CT</span>
        </div>
        <div class="group_5">
          <div class="container_3"><div class="color" /></div>
        </div>
        <div class="sendReportWrap">
          <span class="sendReport">Send Report</span>
        </div>
      </div>
    </div>
    <div class="block_5">
      <img class="img" :src="constants.image12" />
      <img class="image" :src="constants.image13" />
    </div>
    <div class="main">
      <div class="block_7">
        <div class="group_6"><span class="count">1.2</span></div>
        <div class="empty" />
        <div class="block_6"><span class="num">4.1</span></div>
        <div class="div" />
        <div class="group_7"><span class="count_2">7.2</span></div>
        <div class="empty_2" />
      </div>
      <div class="block_11">
        <div class="actionBgWrap">
          <img class="actionBg" :src="constants.image14" />
          <div class="block_9">
            <span class="wilhelminastraat">Wilhelminastraat</span>
            <div class="block_8">
              <img class="icon_8" :src="constants.image15" />
              <img class="icon_9" :src="constants.image16" />
            </div>
          </div>
          <span class="info">1.2 Km from your current location.</span>
          <span class="info_2">20 mins without traffic</span>
        </div>
        <div class="group_8">
          <span class="hudsontraat">Hudsontraat</span>
          <span class="info_3">4.1 Km from your current location.</span>
          <span class="info_4">53 mins without traffic</span>
        </div>
        <div class="block_10">
          <span class="overtoom">Overtoom</span>
          <span class="info_5">7.2 Km from your current location.</span>
          <span class="info_6">1 hour 15 mins without traffic</span>
        </div>
      </div>
      <div class="block_12"><div class="color_2" /></div>
    </div>
    <div class="ft">
      <div class="block_13">
        <div class="assignmentWrap">
          <span class="assignment">Assignment</span>
        </div>
        <span class="jobQueue">Job Queue</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      constants: {
        image1:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/0c60fd5046d611ea857481b7fe145c48.png',
        image2: 'https://via.placeholder.com/375x278text=375x278',
        image3:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/6b93b79046d611eaa7cc5f786a9c0dd4.png',
        image4:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/6bbebf3046d611eaa00ce1ab66a1de75.png',
        image5:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/6bf81eb046d611eab758f39ace46119b.png',
        image6:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/6a66a94046d611eaa7ebf7bd350c0c46.png',
        image7:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/6b16e67046d611ea8b386b72f515a33a.png',
        image8:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/6ab31b9046d611ea82a00d7d610ea15e.png',
        image9:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/6b3fcb3046d611eaadb621dac880eba4.png',
        image10:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/6b68aff046d611ea9f2387760fbedd51.png',
        image11: 'https://via.placeholder.com/12x14text=12x14',
        image12: 'https://via.placeholder.com/8x5text=8x5',
        image13: 'https://via.placeholder.com/8x5text=8x5',
        image14: 'https://via.placeholder.com/285x85text=285x85',
        image15: 'https://via.placeholder.com/25x25text=25x25',
        image16:
          'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/0856719046d611ea8cc4897af9967148.png'
      }
    };
  },
  methods: {}
};
</script>
<style>
@import './index.response.css';
</style>

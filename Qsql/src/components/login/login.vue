<template>
  <div class="md-layout">
    <div class="md-layout-item"></div>
    <div class="md-layout-item">
      <router-view></router-view>
    </div>
    <div class="md-layout-item">
      <div id="containexxr" style="width:800px;height:600px;border:1px solid #ccc"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    initialize() {
      monacoxx.create(document.getElementById("containexxr"), {
        value: ["select *"].join("\n"),
        language: "sql"
      });
    }
  }
};
</script>

<template>
  <div class="time-capsule">
    <div class="title">
      <hourglass-full theme="two-tone" size="24" :fill="['#efefef', '#00000020']" />
      <span>时光胶囊</span>
    </div>
    <div v-if="timeData" class="all-capsule">
      <div v-for="(item, tag) in timeData" :key="tag" class="capsule-item">
        <div class="item-title">
          <span class="percentage">
            {{ item.name }}已度过
            <strong>{{ item.passed }}</strong>
            {{ tag === "day" ? "小时" : "天" }}
          </span>
          <span class="remaining">
            剩余&nbsp;{{ item.remaining }}&nbsp;{{ tag === "day" ? "小时" : "天" }}
          </span>
        </div>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="parseFloat(item.percentage)" />
      </div>
      <div v-if="store.siteStartShow" class="capsule-item start">
        <div class="item-title">{{ startDateText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HourglassFull } from "@icon-park/vue-next";
import { getTimeCapsule, siteDateStatistics } from "@/utils/getTime.js";
import { mainStore } from "@/store";
const store = mainStore();

const timeData = ref(getTimeCapsule());
const startDate = ref(import.meta.env.VITE_SITE_START);
const startDateText = ref(null);
const timerSec = ref(null);
const timerSlow = ref(null);

const update = () => { timeData.value = getTimeCapsule(); };
const updateSlow = () => {
  const full = getTimeCapsule();
  timeData.value = { ...timeData.value, week: full.week, month: full.month, year: full.year };
  if (startDate.value) startDateText.value = siteDateStatistics(new Date(startDate.value));
};

onMounted(() => {
  timerSec.value = setInterval(update, 1000);
  timerSlow.value = setInterval(updateSlow, 60000);
  updateSlow();
});

onBeforeUnmount(() => {
  clearInterval(timerSec.value);
  clearInterval(timerSlow.value);
});
</script>

<style lang="scss" scoped>
.time-capsule {
  width: 100%;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.2rem 0 1.5rem;
    font-size: 1.1rem;
    .i-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
    }
  }
  .all-capsule {
    .capsule-item {
      margin-bottom: 1rem;
      .item-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 1rem 0rem 0.5rem 0rem;
        font-size: 0.95rem;
        .remaining {
          opacity: 0.6;
          font-size: 0.85rem;
          font-style: oblique;
        }
      }
      &:last-child { margin-bottom: 0; }
      &.start .item-title {
        justify-content: center;
        opacity: 0.8;
        font-size: 0.85rem;
      }
    }
  }
}
</style>

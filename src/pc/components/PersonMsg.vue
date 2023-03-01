<script setup lang="ts">
const props = defineProps<{
  message: Array
}>()
import {
      imgUrl
} from "../js/common.ts"
</script>

<template>
    
    <div v-for="(item,index) in props.message"  >
      <div>
        <span>
          <img class="msg_head" v-bind:src="imgUrl+item.imgurl">
          <span class="mname">{{item.name}}</span>
          <span class="mtime">{{item.create_time}}</span>
        </span>
      </div>
      <div class="msg_message">{{item.message}}</div>
    </div>
</template>

<style scoped>
.msg_head
{
  width: 20px;
  height: 11px;
  border: 1px solid greenyellow;
  margin-right: 10px;
}
.mname{
  margin-right: 10px;
}
.msg_message{
  margin-left: 20px;
}
</style>

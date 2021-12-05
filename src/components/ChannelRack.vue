<template>
    <div class="channelrack-container">
        <h5>ChannelRack</h5>
    </div>
</template>

<script>
import {SOT} from "@/SOT";

export default {
    name: "ChannelRack",
    data() {
        return SOT
    }
}
</script>

<style scoped lang="scss">
    .channelrack-container {
        background-color: #2b2b2b;
        display: flex;
        padding: 0;
        flex-basis: 15rem;

        h5 {
            padding: 0;
            margin: 0;
        }
    }
</style>

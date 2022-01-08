<template>
    <div class="container">
        <ToolBar/>
        <MainBody/>
        <ChannelRack v-if="viewsOpen.channelRack"/>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ToolBar from './components/ToolBar.vue'
import ChannelRack from './components/ChannelRack.vue'
import MainBody from './components/MainComp.vue'
import {SOT} from './SOT'

export default defineComponent({
    name: 'App',
    components: {
        ToolBar,
        ChannelRack,
        MainBody
    },
    data() {
        return SOT
    },
    computed: {},
    methods: {
        mounted() {
            document.addEventListener("keydown", (e) => {

            })
        }
    },
})
</script>

<style lang="scss">
body {
    margin: 0;
    background-color: #1b1b1b;
    overflow: hidden;
    padding: 0;
    height: 100vh;
    width: 100vw;
}

#app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #DDDDDD;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
}



button {
    color: #DDDDDD;
    padding: 0.5rem;
    cursor: pointer;
    width: 14rem;
    background-color: rgba(0, 0, 0, 0);
    border: solid #DDDDDD 1px;
    border-radius: 0.5rem;
}

</style>

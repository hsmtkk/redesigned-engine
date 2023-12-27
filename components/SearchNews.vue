<template>
    <v-app>
        <v-app-bar>
            <v-app-bar-title>Search News</v-app-bar-title>
        </v-app-bar>
        <v-container class="mx-auto">
            <v-main>
                <v-text-field label="Input" v-model="inputText"></v-text-field>
                <v-btn v-on:click="submitClicked">Submit</v-btn>
                <v-list v-if="news">
                    <v-list-item v-for="(item, index) in news" v-bind:key="index" v-bind:href="item.url"
                        v-bind:title="item.text" target="_blank"></v-list-item>
                </v-list>
            </v-main>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
useHead({
    title: "Search News",
})

const inputText = ref("")
const news = ref([])

const { data, status, execute } = useLazyFetch("/api/search-news", {
    immediate: false,
    query: { text: inputText.value },
})

const submitClicked = async () => {
    const { data } = await useFetch("/api/search-news", {
        method: "GET",
        query: { text: inputText.value },
    })
    news.value = data.value
}

</script>
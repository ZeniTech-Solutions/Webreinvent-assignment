<template>
    Hey my first page
</template>

<script setup lang="ts">
import usePostStore from '~/stores/posts';

    onMounted(() => {
        usePostStore().fetchPosts();
    })
</script>
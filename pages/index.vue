<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
    <div class="max-w-3xl w-full bg-white rounded-xl shadow-xl p-8 text-center">
      <h1 class="gradient-text mb-6">Welcome to My Blog</h1>
      
      <p class="text-lg text-gray-700 mb-8">
        Explore a collection of interesting articles and thoughts on various topics.
        From technology to lifestyle, there's something for everyone.
      </p>
      
      <div class="flex justify-center">
        <button 
          @click="navigateTo('/posts')"
          class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg
                 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-md"
        >
          Browse All Posts
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>